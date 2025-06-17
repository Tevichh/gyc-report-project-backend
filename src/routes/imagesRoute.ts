import express from 'express';
import { authenticateToken } from '../services/validateToken.service';
import { deleteImage, getImagesByReportId, uploadImage } from '../controllers/imageController';

const router = express.Router();

router.post('/upload', authenticateToken, uploadImage);
router.get('/getImageByReportId/:id', authenticateToken, getImagesByReportId);
router.delete('/deleteImage/:id', authenticateToken, deleteImage);

export default router;