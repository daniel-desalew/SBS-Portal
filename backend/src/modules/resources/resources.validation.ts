import { z } from 'zod';

export const resourceSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().min(1).max(2000),
  url: z.string().url(),
  category: z.string().trim().min(1).max(80),
  published: z.boolean().optional(),
});