"use server"

import {z} from "zod";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import {revalidatePath} from "next/cache";
import {LoginUserSchema, ProductSchema, UserSchema} from "@/services/schema";


type userData = z.infer<typeof UserSchema>
export const saveUser = async (data: userData) => {

    const result = UserSchema.safeParse(data);

    const {name, email, password, image} = data;

    if (!result.success) {
        return {success: false, error: result.error.format()}
    }

    const checkName = await prisma.user.findUnique({where: {name: data.name}})
    const checkEmail = await prisma.user.findUnique({where: {email: data.email}})

    if (checkName) {
        return {success: false, nameExist: "Name already exist"}
    }
    if (checkEmail) {
        return {success: false, emailExist: "Email already exist"}
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (result.success) {
        await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
                image,
            }
        });
        revalidatePath("/admin/users")
    }
    return {success: true, data: result.data};
}

type productData = z.infer<typeof ProductSchema>
export const saveProduct = async (data: productData) => {

    const {name, description, brand, rating, stock, thumbnail, categoryId, price} = data;

    const validation = ProductSchema.safeParse(data)

    if (!validation.success) {
        return {success: false, error: validation.error.format()};
    }

    await prisma.product.create({
        data: {
            name, description, rating, brand, stock, thumbnail, categoryId, price
        }
    })
    revalidatePath("/admin/products");
    return {success: true, message: "Product added successfully!"};
}

export const updateProduct = async (id: number, data: productData) => {

    const validation = ProductSchema.safeParse(data);

    if (!validation.success) {
        return {success: false, error: validation.error.format()};
    }

    if (validation.success) {
        await prisma.product.update({where: {id}, data})
        revalidatePath("/admin/products")
    }
    return {success: true, message: "product successfully updated"}
}

export const deleteProduct = async (id: number) => {

    await prisma.product.delete({where: {id}})

    revalidatePath("/admin/products")
    return {success: true, message: "Product successfully deleted"}

}