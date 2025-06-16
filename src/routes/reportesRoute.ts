import express from 'express';
import { createReport, getAllReports, getReportById } from '../controllers/reportController';

const router = express.Router();

router.get('/getReportes', getAllReports);
router.get('/getReportesById/:id', getReportById);
router.post('/createReport', createReport);

export default router;