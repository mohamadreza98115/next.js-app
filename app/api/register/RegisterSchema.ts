import {z} from 'zod'

const RegisterSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email(),
    password: z.string().min(6, "password must be at least 6 characters")
})

export default RegisterSchema;