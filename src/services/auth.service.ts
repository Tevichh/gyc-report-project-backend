import { User } from "../models/user.interface"
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = (user: User): string | undefined => {
    if (!JWT_SECRET) {
        return
    }
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '8h' })
}