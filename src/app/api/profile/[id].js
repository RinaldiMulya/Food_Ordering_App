import prisma from "../../../libs/prisma";
import { getSession } from "next-auth/next";

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userData = session.userData;

    // Use the userData object to fetch user data from the database
    const { id } = req.query;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}