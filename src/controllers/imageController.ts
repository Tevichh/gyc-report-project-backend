import { Request, Response } from 'express';
import { saveBase64Images, getImagesByReport, deleteImagesByReportId } from '../services/imagesService';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reportId, images } = req.body; // reportId: string, images: string[] base64
        if (!reportId || !Array.isArray(images)) {
            res.status(400).json({ message: 'reportId and images (array) are required' });
            return;
        }

        const savedFiles = await saveBase64Images(images, reportId);
        res.status(201).json({ message: 'Images saved', files: savedFiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving images' });
    }
};

export const getImagesByReportId = async (req: Request, res: Response): Promise<void> => {
    try {
        const reportId = req.params.id;
        if (!reportId) {
            res.status(400).json({ message: 'reportId is required' });
            return;
        }

        const files = getImagesByReport(reportId);
        res.status(200).json({ images: files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving images' });
    }
};

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const reportId = req.params.id;
        if (!reportId) {
            res.status(400).json({ message: 'reportId is required' });
            return;
        }

        deleteImagesByReportId(reportId);
        res.status(200).json({ message: 'All images deleted for reportId ' + reportId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting images' });
    }
};

