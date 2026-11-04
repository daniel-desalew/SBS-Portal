import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email().max(254),
    password: z.string().min(12).max(128),
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email().max(254),
    password: z.string().min(1).max(128),
  }),
});

export const refreshSchema = z.object({
  body: z.object({ refreshToken: z.string().min(20).max(200) }),
});