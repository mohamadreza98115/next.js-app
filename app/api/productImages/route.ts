import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const productImage = await prisma.productImage.create({data: body})
    return NextResponse.json(productImage, {status: 201});
}

export const GET = async (request: NextRequest) => {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id");

    let productImages;
    if (id !== null)
        productImages = await prisma.productImage.findMany({where: {productId: {equals: parseInt(id)}}});
    else
        productImages = await prisma.productImage.findMany();

    if (!productImages)
        return NextResponse.json({message: "There is no productImages"})

    return NextResponse.json(productImages, {status: 200})

}