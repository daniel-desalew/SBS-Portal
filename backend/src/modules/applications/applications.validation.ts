import { z } from 'zod';

const applicationBody = z.object({
  grade: z.union([z.literal(9), z.literal(10)]),
  applicant: z.object({
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    dateOfBirth: z.coerce.date(),
    gender: z.string().trim().min(1).max(40),
    email: z.string().email().max(254),
    phone: z.string().trim().min(5).max(30),
  }),
  academic: z.record(z.unknown()).default({}),
  guardian: z.record(z.unknown()).default({}),
  documents: z.array(z.object({ name: z.string().min(1).max(100), url: z.string().url() })).max(10).default([]),
});

export const createApplicationSchema = z.object({ body: applicationBody });
export const updateApplicationStatusSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    status: z.enum(['submitted', 'under_review', 'accepted', 'rejected', 'waitlisted']),
  }),
});
export const applicationIdSchema = z.object({ params: z.object({ id: z.string().min(1) }) });