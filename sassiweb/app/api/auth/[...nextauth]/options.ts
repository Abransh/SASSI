// app/api/auth/[...nextauth]/options.ts - Updated for better redirection support
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      return token;
    },
    // Add redirect callback to handle redirection after sign-in
    redirect: ({ url, baseUrl }) => {
      // If the URL starts with the base URL, it's a relative URL
      if (url.startsWith(baseUrl)) return url;
      
      // If the URL is relative, it should be safe to redirect
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      
      // Allow redirects to the same domain
      const urlObj = new URL(url);
      const baseUrlObj = new URL(baseUrl);
      
      if (urlObj.hostname === baseUrlObj.hostname) return url;
      
      // Default fallback to baseUrl
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};