import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const email = "admin@gyc.com";
    const passwordPlano = "admin123";

    // Verifica si ya existe
    const adminExistente = await prisma.cuenta.findUnique({
        where: { email }
    });

    if (!adminExistente) {
        const hash = await bcrypt.hash(passwordPlano, 10);

        await prisma.usuario.create({
            data: {
                nombres: "Admin",
                apellidos: "Principal",
                cedula: "0000000000",
                direccion: "Oficina central",
                telefono: "3000000000",
                cargo: "Administrador General",
                rol: "administrador",
                urlFoto: "../src/assets/fotosPerfil/admin.jpg",
                cuenta: {
                    create: {
                        email,
                        password: hash,
                    }
                }

            }
        });

        console.log("✅ Usuario administrador creado.");
    } else {
        console.log("ℹ️ Usuario administrador ya existe.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
