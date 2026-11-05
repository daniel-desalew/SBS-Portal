import type { Prisma } from '@prisma/client';

export const toJsonInput = (value: unknown): Prisma.InputJsonValue => {
  const serialized = JSON.stringify(value);
  if (serialized === undefined) {
    throw new TypeError('Value cannot be represented as JSON');
  }
  return JSON.parse(serialized) as Prisma.InputJsonValue;
};
