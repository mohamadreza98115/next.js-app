import {z} from 'zod';

const schema = z.object({
    name: z.string().min(3),
    image: z.string()
})


export default schema;