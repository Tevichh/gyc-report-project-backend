import express from 'express';
import { register } from '../controllers/authController';
import { getAllUsers, getUserById } from '../controllers/adminController';
import { authenticateToken } from '../services/validateToken.service';

const router = express.Router();


router.post('/register', authenticateToken, register)
router.get('/getAllUsers', authenticateToken, getAllUsers)
router.get('/getUserById/:id', authenticateToken, getUserById)


export default router;