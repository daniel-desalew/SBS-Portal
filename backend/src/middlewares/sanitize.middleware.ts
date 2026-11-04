import type { RequestHandler } from 'express';

const sanitizeValue = (value: unknown): unknown => {
  if (typeof value === 'string') return value.replace(/\0/g, '').trim();
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, sanitizeValue(child)]),
    );
  }
  return value;
};

export const sanitizeRequest: RequestHandler = (request, _response, next) => {
  request.body = sanitizeValue(request.body);
  next();
};