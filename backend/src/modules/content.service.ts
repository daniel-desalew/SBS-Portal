import type { Request } from 'express';
import type { ZodType } from 'zod';
import { ApiError } from '../utils/ApiError';
import { getPagination } from '../utils/pagination';

export interface ContentRepository<TData, TRecord> {
  list(where: Record<string, unknown>, skip: number, take: number): Promise<TRecord[]>;
  count(where: Record<string, unknown>): Promise<number>;
  find(where: Record<string, unknown>): Promise<TRecord | null>;
  create(data: TData): Promise<TRecord>;
  update(id: string, data: TData): Promise<TRecord | null>;
  remove(id: string): Promise<TRecord | null>;
}

export const createContentService = <TData, TRecord extends { id: string }>(
  repository: ContentRepository<TData, TRecord>,
  options: {
    schema: ZodType<TData>;
    searchableFields?: string[];
    publicFilter?: () => Record<string, unknown>;
    slugField?: string;
  },
) => ({
  async list(request: Request, includePrivate: boolean) {
    const { page, limit, skip } = getPagination(request);
    const clauses: Record<string, unknown>[] = [];
    if (!includePrivate && options.publicFilter) clauses.push(options.publicFilter());

    const query = typeof request.query.q === 'string' ? request.query.q.trim() : '';
    if (query && options.searchableFields?.length) {
      clauses.push({
        OR: options.searchableFields.map((field) => ({
          [field]: { contains: query, mode: 'insensitive' },
        })),
      });
    }

    const where = clauses.length ? { AND: clauses } : {};
    const [items, total] = await Promise.all([
      repository.list(where, skip, limit),
      repository.count(where),
    ]);
    return { items, page, limit, total, pages: Math.ceil(total / limit) };
  },

  async getById(id: string, includePrivate: boolean) {
    const identity = options.slugField && !/^[a-f\d]{24}$/i.test(id)
      ? { [options.slugField]: id }
      : { id };
    const where = !includePrivate && options.publicFilter
      ? { AND: [identity, options.publicFilter()] }
      : identity;
    const item = await repository.find(where);
    if (!item) throw new ApiError(404, 'Record not found');
    return item;
  },

  async create(body: unknown) {
    return repository.create(options.schema.parse(body));
  },

  async update(id: string, body: unknown) {
    const item = await repository.update(id, options.schema.parse(body));
    if (!item) throw new ApiError(404, 'Record not found');
    return item;
  },

  async remove(id: string) {
    const item = await repository.remove(id);
    if (!item) throw new ApiError(404, 'Record not found');
    return item;
  },
});

export type ContentService = ReturnType<typeof createContentService>;
