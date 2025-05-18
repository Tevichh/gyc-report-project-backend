import express from 'express';
import { login, register } from '../controllers/authController';
import { authenticateToken } from '../services/validateToken.service';

const router = express.Router();

router.post('/register', authenticateToken, register);
router.post('/login', login);

export default router;
