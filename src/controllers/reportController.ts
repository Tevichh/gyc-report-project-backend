import { Request, Response } from "express";
import prisma from "../models/user";
import { AnexosFotograficos, Reporte } from "../models/reportes.interface";
import { EquiposIntervenidos } from "../models/equiposIntervenidos.interface";


export const getAllReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const reports = await prisma.reportes.findMany({
            include: {
                equiposIntervenidos: true,
                tecnicoResponsable: true,
            },
        });
        res.status(200).json(reports);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
    }
}

export const getReportById = async (req: Request, res: Response): Promise<void> => {
    const reportId = parseInt(req.params.id);
    try {
        const report = await prisma.reportes.findUnique({
            where: {
                idReporte: reportId,
            },
            include: {
                equiposIntervenidos: true,
                tecnicoResponsable: true,
            },
        });
        if (!report) {
            res.status(404).json({ error: "El reporte no fue encontrado" });
            return;
        }
        res.status(200).json(report);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
    }
};

export const getReportsByTechnicianId = async (req: Request, res: Response): Promise<void> => {
    const technicianId = parseInt(req.params.id);
    try {
        const reports = await prisma.reportes.findMany({
            where: {
                idTecnicoResponsable: technicianId,
            },
            include: {
                equiposIntervenidos: true,
                tecnicoResponsable: true,
            },
        });
        if (reports.length === 0) {
            res.status(404).json({ message: "No se encontraron reportes para este técnico" });
            return;
        }
        res.status(200).json(reports);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
    }
}


export const createReport = async (req: Request, res: Response): Promise<void> => {
    const { reportParams, equiposIntervenidos, anexosFotograficos } = req.body;

    // Validación básica
    if (!reportParams || !reportParams.idTecnicoResponsable || !reportParams.estado) {
        res.status(400).json({ message: "Faltan campos obligatorios en el reporte" });
        return;
    }

    if (!Array.isArray(equiposIntervenidos) || equiposIntervenidos.length === 0) {
        res.status(400).json({ message: "Debe incluir al menos un equipo intervenido" });
        return;
    }

    if (!Array.isArray(anexosFotograficos) || anexosFotograficos.length === 0) {
        res.status(400).json({ message: "Debe incluir al menos un anexo fotográfico" });
        return;
    }

    try {
        const report = await prisma.reportes.create({
            data: {
                ...reportParams,
                equiposIntervenidos: {
                    create: equiposIntervenidos.map((e: any) => ({
                        equipo: e.equipo,
                        serial: e.serial,
                        estado: e.estado,
                        serialAnterior: e.serialAnterior
                    }))
                },
                anexoFotograficoUrls: {
                    create: anexosFotograficos.map((a: any) => ({
                        url: a.url
                    }))
                }
            },
            include: {
                equiposIntervenidos: true,
                anexoFotograficoUrls: true,
                tecnicoResponsable: true
            }
        });

        res.status(201).json(report);

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al crear el reporte. Intente más tarde." });
    }
};


export const updateReport = async (req: Request, res: Response): Promise<void> => {
    const reportId = parseInt(req.params.id);
    const { reportParams, equiposIntervenidos, anexosFotograficos } = req.body;

    if (!reportParams || !reportParams.idTecnicoResponsable || !reportParams.estado) {
        res.status(400).json({ message: "Faltan campos obligatorios en el reporte" });
        return;
    }

    if (!Array.isArray(equiposIntervenidos) || equiposIntervenidos.length === 0) {
        res.status(400).json({ message: "Debe incluir al menos un equipo intervenido" });
        return;
    }

    if (!Array.isArray(anexosFotograficos) || anexosFotograficos.length === 0) {
        res.status(400).json({ message: "Debe incluir al menos un anexo fotográfico" });
        return;
    }

    try {
        // Verifica si existe el reporte
        const existingReport = await prisma.reportes.findUnique({
            where: { idReporte: reportId }
        });

        if (!existingReport) {
            res.status(404).json({ message: "El reporte no fue encontrado" });
            return;
        }

        // Elimina relaciones actuales
        await prisma.equipos_Intervenidos.deleteMany({
            where: { reportId: reportId }
        });

        await prisma.anexo_Fotografico.deleteMany({
            where: { reportId: reportId }
        });

        // Actualiza el reporte y crea nuevas relaciones
        const updatedReport = await prisma.reportes.update({
            where: { idReporte: reportId },
            data: {
                ...reportParams,
                equiposIntervenidos: {
                    create: equiposIntervenidos.map((e: any) => ({
                        equipo: e.equipo,
                        serial: e.serial,
                        estado: e.estado,
                        serialAnterior: e.serialAnterior
                    }))
                },
                anexoFotograficoUrls: {
                    create: anexosFotograficos.map((a: any) => ({
                        url: a.url
                    }))
                }
            },
            include: {
                equiposIntervenidos: true,
                anexoFotograficoUrls: true,
                tecnicoResponsable: true
            }
        });

        res.status(200).json(updatedReport);

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al actualizar el reporte. Intente más tarde." });
    }
};

export const deleteReport = async (req: Request, res: Response): Promise<void> => {
    const reportId = parseInt(req.params.id);

    if (isNaN(reportId)) {
        res.status(400).json({ message: "El ID del reporte no es válido" });
        return;
    }

    try {
        // Verifica si existe el reporte
        const existingReport = await prisma.reportes.findUnique({
            where: { idReporte: reportId }
        });

        if (!existingReport) {
            res.status(404).json({ message: "El reporte no fue encontrado" });
            return;
        }

        // Borra las relaciones hijas primero (si tu base no tiene ON DELETE CASCADE)
        await prisma.equipos_Intervenidos.deleteMany({
            where: { reportId: reportId }
        });

        await prisma.anexo_Fotografico.deleteMany({
            where: { reportId: reportId }
        });

        // Borra el reporte
        await prisma.reportes.delete({
            where: { idReporte: reportId }
        });

        res.status(200).json({ message: "Reporte eliminado correctamente" });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al eliminar el reporte. Intente más tarde." });
    }
};