import crypto from 'node:crypto';
import type { Request } from 'express';
import { ApiError } from './ApiError';

export const createPublicId = (prefix: string): string =>
  `${prefix}-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;

export const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const omitSensitiveFields = <T extends Record<string, unknown>>(
  value: T,
): Omit<T, 'passwordHash'> => {
  const safeValue: Partial<T> = { ...value };
  delete safeValue.passwordHash;
  return safeValue as Omit<T, 'passwordHash'>;
};

export const getRouteParam = (request: Request, name: string): string => {
  const value = request.params[name];
  if (typeof value !== 'string') throw new ApiError(400, `Invalid ${name} parameter`);
  return value;
};