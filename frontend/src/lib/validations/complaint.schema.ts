import { z } from 'zod';

export const complaintSchema = z.object({
  referenceNumber: z.string().trim().min(4).max(40),
  email: z.string().email(),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(1).max(5000),
});