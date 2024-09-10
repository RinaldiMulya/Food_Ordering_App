import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import prisma from "../../../../libs/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google"; 

const handler = NextAuth({
  secret: process.env.SECRET,
  trustHost: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        // Query your Prisma database to find a user with the given email
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          return null; // User not found
        }

        // Compare the hashed password stored in the database with the hashed password provided by the user
        const isValid = user && bcrypt.compare(password, user.password);
        if (!isValid) {
          return null; // Password is invalid
        }

        // Return the user object to authenticate
        return user
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect user to the home page after login
      return baseUrl; // Will redirect to the base URL ("/")
    },
  },
});

export { handler as GET, handler as POST };
