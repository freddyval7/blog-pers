import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound) {
          throw new Error("Email not found");
        }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password as string
        );

        if (!matchPassword) {
          throw new Error("Invalid password");
        }

        return {
            id: String(userFound.id),
            name: userFound.username,
            email: userFound.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
