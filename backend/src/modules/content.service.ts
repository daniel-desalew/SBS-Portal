import type { FilterQuery, Model } from 'mongoose';
import type { ZodType } from 'zod';
import { ApiError } from '../utils/ApiError';
import { getPagination } from '../utils/pagination';
import type { Request } from 'express';

export interface ContentOptions {
  schema: ZodType;
  searchableFields?: string[];
  publicFilter?: Record<string, unknown>;
}

export const createContentService = <DocumentType>(
  model: Model<DocumentType>,
  options: ContentOptions,
) => ({
  async list(request: Request, includePrivate: boolean) {
    const { page, limit, skip } = getPagination(request);
    const filter = (includePrivate ? {} : { ...options.publicFilter }) as FilterQuery<DocumentType>;
    const query = typeof request.query.q === 'string' ? request.query.q.trim() : '';
    if (query && options.searchableFields?.length) {
      const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = options.searchableFields.map((field) => ({
        [field]: { $regex: safeQuery, $options: 'i' },
      })) as FilterQuery<DocumentType>['$or'];
    }

    const [items, total] = await Promise.all([
      model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      model.countDocuments(filter),
    ]);
    return { items, page, limit, total, pages: Math.ceil(total / limit) };
  },

  async getById(id: string, includePrivate: boolean) {
    const identity =
      model.modelName === 'News' && !/^[a-f\d]{24}$/i.test(id) ? { slug: id } : { _id: id };
    const filter = (includePrivate
      ? identity
      : { ...identity, ...options.publicFilter }) as FilterQuery<DocumentType>;
    const item = await model.findOne(filter).lean();
    if (!item) throw new ApiError(404, 'Record not found');
    return item;
  },

  async create(body: unknown) {
    const data = options.schema.parse(body);
    return model.create(data as Partial<DocumentType>);
  },

  async update(id: string, body: unknown) {
    const data = options.schema.parse(body);
    const item = await model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    ).lean();
    if (!item) throw new ApiError(404, 'Record not found');
    return item;
  },

  async remove(id: string) {
    const item = await model.findByIdAndDelete(id).lean();
    if (!item) throw new ApiError(404, 'Record not found');
    return item;
  },
});

export type ContentService = ReturnType<typeof createContentService>;
