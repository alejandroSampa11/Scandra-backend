import {z} from "zod";

export const createUserSchema = z.object({
    email: z.string()
    .min(1, 'Email is required')
    .email('Email invalid')
    .toLowerCase(),

    passwordHash : z.string()
    .min(6, 'Password must contain at least 6 characters'),

    fullName: z.string()
    .min(2,'Name must contain at least 2 characters')
    .max(100, 'Name too long')
    .optional()
    .nullable(),

    currency: z.string()
    .length(3, 'Currency must have 3 characters')
    .toUpperCase()
    .default('MXN')
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export type CreateUserDto = z.infer<typeof createUserSchema>;
export type LoginDto = z.infer<typeof loginSchema>;