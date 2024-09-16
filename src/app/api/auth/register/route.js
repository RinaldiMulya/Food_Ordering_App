// api/register.js
import NextApiRequest from 'next';
import NextApiResponse from 'next';
import prisma from '../../../../libs/prisma';
import bcrypt from 'bcrypt';

export async function POST(req) {
    const { username, email, password } = await req.json();

    // Validasi data request
    if (!username || !email || !password) {
        return new Response(JSON.stringify({ error: 'Invalid request data' }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru di database
    await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    // Kembalikan response JSON
    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
}