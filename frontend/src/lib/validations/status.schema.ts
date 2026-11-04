import { z } from 'zod';

export const statusSchema = z.object({
  referenceNumber: z.string().trim().min(4).max(40),
  email: z.string().email(),
});