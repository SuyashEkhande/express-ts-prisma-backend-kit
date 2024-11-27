"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "Username must be atleast 3 characters long"),
    email: zod_1.z.string().email("Invalid Email Address"),
    password: zod_1.z.string().min(6, "Password must be atleast 6 characters long"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid Email Address"),
    password: zod_1.z.string().min(6, "Password must be atleast 6 characters long"),
});
