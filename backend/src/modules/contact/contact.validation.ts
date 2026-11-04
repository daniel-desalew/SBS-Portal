import { z } from 'zod';

export const createContactSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(160),
    email: z.string().email().max(254),
    subject: z.string().trim().min(1).max(200),
    message: z.string().trim().min(1).max(5000),
  }),
});

export const contactUpdateSchema = z.object({
  params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i) }),
  body: z.object({ status: z.enum(['new', 'read', 'closed']) }),
});