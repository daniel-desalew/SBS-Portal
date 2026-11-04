import { z } from 'zod';

export const gallerySchema = z.object({
  title: z.string().trim().min(1).max(160),
  imageUrl: z.string().url(),
  altText: z.string().trim().min(1).max(200),
  published: z.boolean().optional(),
});