import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import UserSchema from "@/app/api/users/UserSchema";
import bcrypt from "bcrypt";

export const GET = async () => {
    const users = await prisma.user.findMany();

    if (!users) {
        return NextResponse.json({message: "No user found!"});
    }
    return NextResponse.json(users)
}

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const {name, email, password, image} = body;

    const validation = UserSchema.safeParse({name, email, password});

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const checkName = await prisma.user.findUnique({where: {name: name}})
    const checkEmail = await prisma.user.findUnique({where: {email: email}})

    if (checkName) {
        return NextResponse.json({nameExist: "Name already exists"}, {status: 400});
    }
    if (checkEmail) {
        return NextResponse.json({emailExist: "Email already exists"}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword,
            image,
            role: !!body.role ? body.role : "USER"
        }
    })

    return NextResponse.json(user);

}