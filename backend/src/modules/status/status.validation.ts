import { z } from 'zod';

export const lookupStatusSchema = z.object({
  query: z.object({
    referenceNumber: z.string().trim().min(4).max(40),
    email: z.string().email().max(254),
  }),
});