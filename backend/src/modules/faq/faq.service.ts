import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { createContentService } from '../content.service';
import { faqSchema } from './faq.validation';
import { createId } from '../../utils/id';

export const faqService = createContentService({
  list: (where, skip, take) =>
    prisma.faq.findMany({ where: where as Prisma.FaqWhereInput, orderBy: { createdAt: 'desc' }, skip, take }),
  count: (where) => prisma.faq.count({ where: where as Prisma.FaqWhereInput }),
  find: (where) => prisma.faq.findFirst({ where: where as Prisma.FaqWhereInput }),
  create: (data) => prisma.faq.create({ data: { id: createId(), ...data } }),
  update: async (id, data) =>
    (await prisma.faq.findUnique({ where: { id } }))
      ? prisma.faq.update({ where: { id }, data })
      : null,
  remove: async (id) =>
    (await prisma.faq.findUnique({ where: { id } }))
      ? prisma.faq.delete({ where: { id } })
      : null,
}, {
  schema: faqSchema,
  searchableFields: ['question', 'answer', 'category'],
  publicFilter: () => ({ published: true }),
});