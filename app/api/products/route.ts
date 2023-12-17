import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {ProductSchema} from "@/services/schema";


export const GET = async (request: NextRequest) => {
    const {searchParams} = new URL(request.url)
    const q = searchParams.get("q")?.toLowerCase();
    const categoryId = searchParams.get("categoryId");

    let filterProductsByCategory;

    console.log("categoryId: ", categoryId);

    const filteredProducts = await prisma.product.findMany({where: {...((q) && {name: {contains: q}})}});

    if (categoryId !== null)
        filterProductsByCategory = await prisma.product.findMany({where: {categoryId: {equals: parseInt(categoryId)}}})


    return NextResponse.json(filteredProducts);
}

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const {name, description, brand, rating, stock, thumbnail, categoryId, price} = body;

    const validation = ProductSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const product = await prisma.product.create({
        data: {
            name, description, rating, brand, stock, thumbnail, categoryId, price
        }
    })

    return NextResponse.json(product, {status: 201})

}