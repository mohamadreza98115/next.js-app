import {z} from 'zod'

export const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    role: z.enum(["USER", 'ADMIN']).default("USER"),
    image: z.string().url().optional(),
    password: z.string()
})

export default schema;