import prisma from "../../../libs/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return new Response(JSON.stringify({ message: "Email atau password salah" }), { status: 401 });
        }

        // Verifikasi password
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return new Response(JSON.stringify({ message: "Email atau password salah" }), { status: 401 });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' } // Token berlaku 1 jam
        );

        // Simpan token di cookie
        const cookie = new Response(JSON.stringify({ token }), { status: 200 });
        cookie.headers.append('Set-Cookie', `token=${token}; Max-Age=3600; HttpOnly; Secure; SameSite=Strict`);
        return cookie;
    } catch (error) {
        console.error("Error logging in user:", error);  // Log error
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}