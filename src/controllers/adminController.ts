import { Request, Response } from "express";
import prisma from '../models/user'


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.usuario.findMany({
            where: {
                id: {
                    not: 1
                }
            },
            include: {
                cuenta: {
                    select: {
                        email: true
                    }
                }
            }
        })

        const usersWithEmail = users.map(user => ({
            ...user,
            email: user.cuenta?.email || null
        }));

        res.status(200).json(usersWithEmail);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id)
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                id: userId
            },
            include: {
                cuenta: {
                    select: {
                        email: true
                    }
                }
            }
        })
        if (!user) {
            res.status(404).json({ error: 'El usuario no fue encontrado' })
            return
        }

        const userWithEmail = {
            ...user,
            email: user.cuenta?.email || null
        };

        res.status(200).json(userWithEmail)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id);
    const { nombres, apellidos, direccion, telefono, cargo, rol, region } = req.body;
    try {
        //VALIDATE INPUTS
        if (!nombres || !apellidos || !direccion || !telefono || !cargo || !rol || !region) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        //UPDATE USER
        const updatedUser = await prisma.usuario.update({
            where: { id: userId },
            data: {
                nombres,
                apellidos,
                direccion,
                telefono,
                cargo,
                rol,
                region,
            }
        });

        res.status(200).json(updatedUser);
    } catch (error: any) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id);

    if (userId === 1) {
        res.status(400).json({ message: 'Cannot delete the admin user' });
        return;
    }

    try {
        // Eliminar la cuenta del usuario
        await prisma.cuenta.deleteMany({
            where: { usuarioId: userId }
        });

        // Obtener los reportes del técnico
        const reportes = await prisma.reportes.findMany({
            where: { idTecnicoResponsable: userId },
            select: { idReporte: true }
        });

        const reporteIds = reportes.map(r => r.idReporte);

        if (reporteIds.length > 0) {
            // Eliminar anexos fotográficos
            await prisma.anexo_Fotografico.deleteMany({
                where: { reportId: { in: reporteIds } }
            });

            // Eliminar equipos intervenidos
            await prisma.equipos_Intervenidos.deleteMany({
                where: { reportId: { in: reporteIds } }
            });

            // Eliminar reportes
            await prisma.reportes.deleteMany({
                where: { idReporte: { in: reporteIds } }
            });
        }

        // Finalmente eliminar el usuario
        await prisma.usuario.delete({
            where: { id: userId }
        });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
