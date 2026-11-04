import type { Request } from 'express';

const MAX_LIMIT = 100;

export interface Pagination {
  page: number;
  limit: number;
  skip: number;
}

export const getPagination = (request: Request): Pagination => {
  const page = Math.max(1, Number.parseInt(String(request.query.page ?? '1'), 10) || 1);
  const requestedLimit = Number.parseInt(String(request.query.limit ?? '20'), 10) || 20;
  const limit = Math.min(MAX_LIMIT, Math.max(1, requestedLimit));
  return { page, limit, skip: (page - 1) * limit };
};