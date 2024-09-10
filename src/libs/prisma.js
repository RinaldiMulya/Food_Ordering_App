import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient().$extends({
    // add prisma hooks
    // add bcrypt hashing middleware
    $on: {
        connect: () => {
            console.log('Database terhubung!');
        },
        disconnect: () => {
            console.log('Database tidak terhubung!');
        },
    },
    query: {
        user: {
            async create({ args, query }) {
                const hashedPassword = await bcrypt.hash(args.data.password, 10);
                args.data.password = hashedPassword;
                return query(args);
            }
        }
    }
});


export default prisma;