import express from 'express';
import { createReport, deleteReport, getAllReports, getReportById, getReportsByTechnicianId, updateReport } from '../controllers/reportController';
import { authenticateToken } from '../services/validateToken.service';

const router = express.Router();

router.get('/getReportes', authenticateToken, getAllReports);
router.get('/getReportesById/:id', authenticateToken, getReportById);
router.get('/getReportesByTecnico/:id', authenticateToken, getReportsByTechnicianId);
router.post('/createReport', authenticateToken, createReport);
router.put('/updateReport/:id', authenticateToken, updateReport);
router.delete('/deleteReport/:id', authenticateToken, deleteReport);

export default router;