import {NextRequest, NextResponse} from "next/server";
import schema from "@/app/api/categories/schema";
import prisma from "@/prisma/client";


export const GET = async () => {
    const categories = await prisma.category.findMany();

    if (!categories) {
        return NextResponse.json({message: 'there is no categories'}, {status: 500})
    }

    return NextResponse.json(categories, {status: 200});
}

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const category = await prisma.category.create({data: body})

    return NextResponse.json(category, {status: 201});
}