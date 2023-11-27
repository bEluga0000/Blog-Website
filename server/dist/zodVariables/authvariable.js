"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVariables = void 0;
const zod_1 = require("zod");
exports.authVariables = zod_1.z.object({
    username: zod_1.z.string().min(4).max(30),
    password: zod_1.z.string().min(8).max(20),
});
