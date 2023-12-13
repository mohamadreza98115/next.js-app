import {z} from 'zod'

const ProductSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(30),
    price: z.number().nonnegative(),
    brand: z.string().optional(),
    rating: z.number().default(3.2),
    stock: z.number().default(1),
    thumbnail: z.string().url(),
    categoryId: z.number().nonnegative()
});

export default ProductSchema;