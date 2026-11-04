import { z } from 'zod';

export const schoolSchema = z.object({
  name: z.string().trim().min(1).max(160),
  region: z.string().trim().min(1).max(120),
  address: z.string().trim().max(500).optional(),
  phone: z.string().trim().max(30).optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
});