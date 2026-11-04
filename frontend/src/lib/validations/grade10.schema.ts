import { z } from 'zod';

export const grade10Schema = z.object({
  grade: z.literal(10),
  applicant: z.object({
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    dateOfBirth: z.string().min(1),
    gender: z.string().min(1).max(40),
    email: z.string().email(),
    phone: z.string().trim().min(5).max(30),
  }),
  academic: z.record(z.unknown()).default({}),
  guardian: z.record(z.unknown()).default({}),
  documents: z.array(z.object({ name: z.string(), url: z.string().url() })).default([]),
});