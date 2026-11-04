import { z } from 'zod';

export const newsSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(220).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().min(1).max(500),
  body: z.string().min(1).max(50000),
  publishedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
});