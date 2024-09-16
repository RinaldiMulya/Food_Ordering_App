import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import prisma from "../../../../libs/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
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
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          username: user.username,
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl; // Will redirect to the base URL ("/")
    },
    async signIn({ user, account }) {
      if (account.provider === "google") {
        // Handle user logic for Google
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // User not found, create a new user
          await prisma.user.create({
            data: {
              email: user.email,
              username: user.name || "Google User",
              password: "", // or some default value
            },
          });
        }
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          username: user.username,
        };
      }
      return true; // Continue with the sign-in
    },
    callbacks: {
      async session({ session, token }) {
        // Check if user is authenticated via credentials or google
        const userInDb = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        // Add user information to the session object
        if (userInDb) {
          session.user.id = userInDb.id;
          session.user.username = userInDb.username || "Unknown"; // Ensure username is available
        }

        return session;
      },
    },
  },
});

export { handler as GET, handler as POST };
