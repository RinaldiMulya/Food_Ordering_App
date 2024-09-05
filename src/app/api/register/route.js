import prisma from '../../../libs/prisma';

export async function POST(req) {
    try {
        const body = await req.json();
        const createUser = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            },
        });
        return new Response(JSON.stringify(createUser), { status: 200 });
    } catch (error) {
        console.error("Error creating user:", error);  // Log error
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}