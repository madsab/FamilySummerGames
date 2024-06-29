import NextAuth from 'next-auth/next'
import { AuthOptions, Awaitable, NextAuthOptions, Session, SessionStrategy } from 'next-auth'
import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },

    providers: [
        CredentialsProvider({
        name: 'Credentials',
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
            email: { label: "Email", type: "email" },
        },
        async authorize(credentials): Promise<User | null> {
            // Check if name is valid
            if (!credentials?.email) {
                return null;
            }

            // Check if user exists
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email,
                }
            });

            if (!user) {
                return null;
            }

            return user as User | null;

        }
    })
    ],
    callbacks: {
        session: ({session, token}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    familyName: token.familyName,
                    money: token.money,
                }
            }
        },
        jwt: ({token, user}) => {
            if (user) {
                const u = user as User;
                return {
                    ...token,
                    id: user.id,
                    familyName: u.familyName,
                    money: u.money,
                }

            }
            return token;
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}