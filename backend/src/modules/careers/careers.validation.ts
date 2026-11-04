import { z } from 'zod';

export const careerSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().min(1).max(30000),
  location: z.string().trim().min(1).max(160),
  deadline: z.coerce.date(),
  published: z.boolean().optional(),
});