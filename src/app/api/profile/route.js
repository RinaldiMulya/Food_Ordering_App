import prisma from "../../../libs/prisma"
import { getServerSession } from "next-auth/next";

export async function GET(request) {
    const session = await getServerSession(request);
    if (!session) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return new Response("Email is required", { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        let profile = await prisma.profile.findUnique({
            where: { userId: user.id },
        });

        if (!profile) {
            // Optionally create a default profile if it doesn't exist
            profile = await prisma.profile.create({
                data: {
                    userId: user.id,
                    phoneNumber: '',
                    address: '',
                    city: '',
                    country: '',
                    postCode: ''
                }
            });
        }

        user.profile = profile;
        user.phoneNumber = profile.phoneNumber;
        user.address = profile.address;
        user.city = profile.city;
        user.country = profile.country;
        user.postCode = profile.postCode;

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

// Update profile

export async function PUT(request) {
    const session = await getServerSession();
    if (!session) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    try {
        const { username, email, phoneNumber, address, city, country, postCode } = await request.json();

        if (!email || !username) {
            return new Response("Email and Username are required", { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        let profile = await prisma.profile.findUnique({
            where: { userId: user.id },
        });

        if (!profile) {
            // Create a new Profile entry if it doesn't exist
            profile = await prisma.profile.create({
                data: {
                    userId: user.id,
                    phoneNumber,
                    address,
                    city,
                    country,
                    postCode,
                },
            });
        } else {
            // Update the existing Profile entry
            profile = await prisma.profile.update({
                where: { userId: user.id },
                data: {
                    phoneNumber,
                    address,
                    city,
                    country,
                    postCode,
                },
            });
        }

        const updatedUser = await prisma.user.update({
            where: { email },
            data: { username },
        });

        return new Response(JSON.stringify(updatedUser), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


