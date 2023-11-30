import NextAuth, {NextAuthOptions} from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from "@/prisma/client";
import {NextResponse} from "next/server";
import {PrismaAdapter} from "@auth/prisma-adapter";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "jsmith@gmail.com"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {

                const {email, password} = credentials as { email: string; password: string; };

                // check to see if email and password is there
                if (!email || !password) {
                    return NextResponse.json({message: 'Please enter an email and password'}, {status: 400})
                }

                // check to see if user exists
                const user = await prisma.user.findUnique({where: {email}})
                console.log(user)
                // if no user was found
                if (!user || !user.hashedPassword) {
                    return NextResponse.json({message: 'No user found'}, {status: 400})
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(password, user?.hashedPassword);
                // if password does not match
                if (!passwordMatch) {
                    return NextResponse.json({message: 'Incorrect password'}, {status: 400})
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            // if (user) token.role = user.role;
            return {...token,...user};
        },
        //     If we want to use the role in client components
        async session({session, token}) {
            if (session?.user) session.user.role = token.role
            return session;
        }
    },
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}