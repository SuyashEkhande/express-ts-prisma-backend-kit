import {z} from 'zod';

export const todoSchema = z.object({
    title: z.string().min(3,"Title must be atleast 3 characters long"),
    description: z.string().min(3,"Description must be atleast 3 characters long"),
});

export const updateTodoSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.boolean().optional(),
});