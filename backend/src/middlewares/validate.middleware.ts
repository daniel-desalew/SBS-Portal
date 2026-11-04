import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { ApiError } from '../utils/ApiError';

export const validate = (schema: ZodType): RequestHandler => (request, _response, next) => {
  const result = schema.safeParse({
    body: request.body,
    params: request.params,
    query: request.query,
  });
  if (!result.success) {
    next(new ApiError(400, 'Request validation failed', result.error.flatten()));
    return;
  }
  const parsed = result.data as {
    body?: unknown;
    params?: unknown;
    query?: unknown;
  };
  if (parsed.body !== undefined) request.body = parsed.body;
  next();
};