import prisma from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {z} from 'zod';

const schema = z.object({
    name: z.string().min(3),
    brand: z.string().min(3),
    stock: z.number().default(1),
    price: z.number().nonnegative(),
    description: z.string().min(30),
})

export const GET = async (request: NextRequest, {params}: { params: { id: number } }) => {

    const id = params.id;

    const product = await prisma.product.findUnique({where: {id: parseInt(String(id))}})

    if (!product) {
        return NextResponse.json(`product not exist with ID: ${id}`)
    }

    return NextResponse.json(product)
}

export const DELETE = async (request: NextRequest, {params}: { params: { id: number } }) => {

    const id = params?.id;

    const deletedUser = await prisma.product.delete({where: {id: parseInt(String(id))}})

    return NextResponse.json(deletedUser)

}


export const PUT = async (request: NextRequest, {params}: { params: { id: number } }) => {

    const body = await request.json()

    const id = params.id;

    const {name, brand, stock, description, thumbnail, price} = body;

    const validation = schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const updatedProduct = await prisma.product.update({where: {id: parseInt(String(id))}, data: {name, brand, stock, description, price, thumbnail}})

    return NextResponse.json(updatedProduct, {status: 201});

}