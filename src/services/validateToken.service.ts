import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): any => {
    if (!JWT_SECRET) {
        return res.status(500).json({ error: 'Server error' });
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Authentication error: ', err);
            return res.status(403).json({ error: 'You do not have access to this resource' });
        }

        next();
    });
}
