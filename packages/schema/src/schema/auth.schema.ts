import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
    name: z.string().min(2).max(20),
    phone: z.string().regex(/^[0-9]{10}$/).optional(),
    dob: z.date().optional(),
})

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
})

export type SignupSchema = z.infer<typeof signupSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;