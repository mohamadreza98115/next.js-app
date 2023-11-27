import prisma from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";

export const GET = async (request: NextRequest, {params}: { params: { id: number } }) => {

    const id = params.id;

    const product = await prisma.product.findUnique({where: {id: parseInt(String(id))}})

    if (!product) {
        return NextResponse.json(`product not exist with ID: ${id}`)
    }

    return NextResponse.json(product)
}