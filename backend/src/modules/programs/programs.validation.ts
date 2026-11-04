import { z } from 'zod';

export const programSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().min(1).max(5000),
  grade: z.array(z.union([z.literal(9), z.literal(10)])).default([9, 10]),
  isActive: z.boolean().optional(),
});