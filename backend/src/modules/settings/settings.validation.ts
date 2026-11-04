import { z } from 'zod';

export const updateSettingSchema = z.object({
  params: z.object({ key: z.string().regex(/^[a-zA-Z][a-zA-Z0-9._-]{0,79}$/) }),
  body: z.object({ value: z.unknown() }),
});