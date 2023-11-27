import {NextRequest, NextResponse} from "next/server";
import schema from "@/app/api/register/RegisterSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();

        const {email, password, name} = body;

        const validation = schema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), {status: 400})
        }

        if (!name || !email || !password) {
            return new NextResponse('Missing Fields', {status: 400})
        }

        const exist = await prisma.user.findUnique({where: {email}})

        if (exist) {
            return NextResponse.json("User already exists", {status: 400})
        }

        const Role = body?.role;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({data: {name, email, hashedPassword, role: Role}})

        return NextResponse.json("User created with this email: " + user.email)
    } catch (e) {
        return NextResponse.json(e)
    }
}

export const GET = async () => {
    const user = await prisma.user.findUnique({where: {email: "mohamad@gmail.com"}});
    return NextResponse.json(user);
}