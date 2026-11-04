import { z } from 'zod';

export const userUpdateSchema = z.object({
  params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i) }),
  body: z.object({
    role: z.enum(['admin', 'staff', 'applicant']).optional(),
    isActive: z.boolean().optional(),
    firstName: z.string().trim().min(1).max(80).optional(),
    lastName: z.string().trim().min(1).max(80).optional(),
  }).refine((value) => Object.keys(value).length > 0),
});