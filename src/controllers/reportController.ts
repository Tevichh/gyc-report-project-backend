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

export const createReport = async (req: Request, res: Response): Promise<void> => {
    const { reportParams, equiposIntervenidos, anexosFotograficos } = req.body;

    const Reporte: Reporte = reportParams;
    const EquiposIntervenidos: EquiposIntervenidos[] = equiposIntervenidos;
    const AnexosFotograficosUrl: AnexosFotograficos[] = anexosFotograficos;

    try {
        //VALIDATE INPUTS
        if (!reportParams || !equiposIntervenidos || !anexosFotograficos) {
            res.status(400).json({ message: "Todos los campos son obligatorios" });
            return;
        }


        //CREATE REPORT
        const report = await prisma.reportes.create({
            data: {
                ...Reporte,
                equiposIntervenidos: {
                    create: EquiposIntervenidos,
                },
                anexoFotograficoUrls: {
                    create: AnexosFotograficosUrl
                }

            },
            include: {
                equiposIntervenidos: true,
                tecnicoResponsable: true,
                anexoFotograficoUrls: true,
            },
        });

        res.status(201).json(report);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
    }
}

export const updateReport = async (req: Request, res: Response): Promise<void> => {
    const reportId = parseInt(req.params.id);
    const { reportParams, equiposIntervenidos, anexosFotograficos } = req.body;

    const Reporte: Reporte = reportParams;
    const EquiposIntervenidos: EquiposIntervenidos[] = equiposIntervenidos;
    const AnexosFotograficosUrl: AnexosFotograficos[] = anexosFotograficos;

    try {
        //VALIDATE INPUTS
        if (!reportParams || !equiposIntervenidos || !anexosFotograficos) {
            res.status(400).json({ message: "Todos los campos son obligatorios" });
            return;
        }
        //UPDATE REPORT

        const report = await prisma.reportes.update({
            where: {
                idReporte: reportId,
            },
            data: {
                ...Reporte,
                equiposIntervenidos: {
                    create: EquiposIntervenidos,
                },
                anexoFotograficoUrls: {
                    create: AnexosFotograficosUrl
                }
            },
            include: {
                equiposIntervenidos: true,
                tecnicoResponsable: true,
                anexoFotograficoUrls: true,
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
}

export const deleteReport = async (req: Request, res: Response): Promise<void> => {
    const reportId = parseInt(req.params.id);
    try {
        const report = await prisma.reportes.delete({
            where: {
                idReporte: reportId,
            },
        });
        if (!report) {
            res.status(404).json({ error: "El reporte no fue encontrado" });
            return;
        }
        res.status(200).json({ message: "Reporte eliminado correctamente" });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
    }
}