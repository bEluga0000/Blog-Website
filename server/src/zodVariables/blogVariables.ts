import { boolean, string, z } from "zod";
export const blogInputs = z.object({
    title:z.string().optional(),
    description:z.string().optional(),
    content:z.string().optional(),
    topic:z.string().optional(),
    published:z.boolean().optional(),
})