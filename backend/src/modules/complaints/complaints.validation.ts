import { z } from 'zod';

export const createComplaintSchema = z.object({
  body: z.object({
    referenceNumber: z.string().trim().min(4).max(40),
    email: z.string().email().max(254),
    subject: z.string().trim().min(1).max(160),
    message: z.string().trim().min(1).max(5000),
  }),
});

export const complaintIdSchema = z.object({
  params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i) }),
});

export const updateComplaintSchema = z.object({
  params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i) }),
  body: z.object({
    status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
    response: z.string().trim().max(5000).optional(),
  }).refine((value) => Object.keys(value).length > 0),
});