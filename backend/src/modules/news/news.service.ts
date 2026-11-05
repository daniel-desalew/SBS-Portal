import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { createContentService } from '../content.service';
import { newsSchema } from './news.validation';
import { createId } from '../../utils/id';

export const newsService = createContentService({
  list: (where, skip, take) =>
    prisma.news.findMany({ where: where as Prisma.NewsWhereInput, orderBy: { createdAt: 'desc' }, skip, take }),
  count: (where) => prisma.news.count({ where: where as Prisma.NewsWhereInput }),
  find: (where) => prisma.news.findFirst({ where: where as Prisma.NewsWhereInput }),
  create: (data) => prisma.news.create({ data: { id: createId(), ...data } }),
  update: async (id, data) =>
    (await prisma.news.findUnique({ where: { id } }))
      ? prisma.news.update({ where: { id }, data })
      : null,
  remove: async (id) =>
    (await prisma.news.findUnique({ where: { id } }))
      ? prisma.news.delete({ where: { id } })
      : null,
}, {
  schema: newsSchema,
  searchableFields: ['title', 'summary', 'body'],
  publicFilter: () => ({ published: true }),
  slugField: 'slug',
});