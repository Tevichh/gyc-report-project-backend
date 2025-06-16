import express from 'express';
import { register } from '../controllers/authController';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/adminController';
import { authenticateToken } from '../services/validateToken.service';

const router = express.Router();


router.post('/register', authenticateToken, register)
router.get('/getAllUsers', authenticateToken, getAllUsers)
router.get('/getUserById/:id', authenticateToken, getUserById)
router.put('/updateUser/:id', authenticateToken, updateUser)
router.delete('/deleteUser/:id', authenticateToken, deleteUser)


export default router;