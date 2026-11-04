import { z } from 'zod';

export const faqSchema = z.object({
  question: z.string().trim().min(1).max(500),
  answer: z.string().min(1).max(5000),
  category: z.string().trim().max(100).default('General'),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});