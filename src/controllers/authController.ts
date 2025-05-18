import { Request, Response } from 'express';
import prisma from '../models/user';
import { comparePasswords, hashPassword } from '../services/password.service';
import { generateToken } from '../services/auth.service';

export const register = async (req: Request, res: Response): Promise<void> => {

    const { email, password, nombres, apellidos, cedula, direccion, telefono, cargo, rol, urlFoto, Foto } = req.body;

    try {
        //VALIDATE INPUTS
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        //CHECK IF USER EXISTS
        const userExist = await prisma.cuenta.findUnique({
            where: { email }
        });

        if (userExist) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }

        //VALIDATE USER
        if (!nombres || !apellidos || !cedula || !direccion || !telefono || !cargo || !rol || !urlFoto || !Foto) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        //CREATE USER
        const passwordHashed = await hashPassword(password)

        const user = await prisma.usuario.create({
            data: {
                nombres: nombres,
                apellidos: apellidos,
                cedula: cedula,
                direccion: direccion,
                telefono: telefono,
                cargo: cargo,
                rol: rol,
                cuenta: {
                    create: {
                        email,
                        password: passwordHashed,
                    }
                },
                urlFoto: urlFoto
            }
        })

        /* const userAccount = {
            id: user.id,
            email,
            password: passwordHashed,
        }

        //GENERATE TOKEN
        const token = generateToken(userAccount);

        if (!token) {
            res.status(500).json({ message: 'Error generating token' });
            return;
        } */

        res.status(201).json({ message: 'User created successfully' });

    } catch (error: any) {
        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(400).json({ message: 'Existed mail' })
        }
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const login = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body

    try {
        //VALIDATE INPUTS
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        //FIND USER
        const user = await prisma.cuenta.findUnique({ where: { email } })
        if (!user) {
            res.status(404).json({ error: 'Usuario not found' })
            return
        }

        //CHECK PASSWORD
        const passwordMatch = await comparePasswords(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Incorrect username or password' });
            return
        }

        //GENERATE TOKEN
        const token = generateToken(user)

        if (!token) {
            res.status(500).json({ message: 'Error generating token' });
            return;
        }

        res.status(200).json({ token, userId: user.usuarioId })


    } catch (error: any) {
        console.log('Error: ', error)
    }

}