import {z} from 'zod'

export const authVariables = z.object({
    username: z.string().min(4).max(30),
    password: z.string().min(8).max(20),
});
