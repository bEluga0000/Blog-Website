"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInputs = void 0;
const zod_1 = require("zod");
exports.blogInputs = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    topic: zod_1.z.string().optional(),
    published: zod_1.z.boolean().optional(),
});
