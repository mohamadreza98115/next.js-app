import {z} from "zod";

export const UserSchema = z.object({
    name: z.string().min(3, "Name must contain at least 3 character(s)"),
    email: z.string().email(),
    password: z.string().min(6, "Password must contain at least 6 character(s)"),
    image: z.string().url().optional(),
})

export const ProductSchema = z.object({
    name: z.string().min(3, "Name must contain at least 3 character(s)"),
    description: z.string().min(30, "description must contain at least 30 character(s)"),
    price: z.number().positive(),
    brand: z.string().optional(),
    rating: z.number().default(3.2).optional(),
    stock: z.number(),
    thumbnail: z.string().url(),
    categoryId: z.number().positive()
});

export const RegisterUserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 character(s)"),
    email: z.string().email(),
    password: z.string().min(6, "password must be at least 6 character(s)")
});

export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "password must be at least 6 character(s)")
})