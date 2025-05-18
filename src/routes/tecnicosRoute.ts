import express from 'express';
import { authenticateToken } from '../services/validateToken.service';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    res.send('Hello from Tecnicos route!');
});

export default router;


