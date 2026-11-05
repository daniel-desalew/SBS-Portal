import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { createContentService } from '../content.service';
import { resourceSchema } from './resources.validation';
import { createId } from '../../utils/id';

export const resourcesService = createContentService({
  list: (where, skip, take) =>
    prisma.resource.findMany({ where: where as Prisma.ResourceWhereInput, orderBy: { createdAt: 'desc' }, skip, take }),
  count: (where) => prisma.resource.count({ where: where as Prisma.ResourceWhereInput }),
  find: (where) => prisma.resource.findFirst({ where: where as Prisma.ResourceWhereInput }),
  create: (data) => prisma.resource.create({ data: { id: createId(), ...data } }),
  update: async (id, data) =>
    (await prisma.resource.findUnique({ where: { id } }))
      ? prisma.resource.update({ where: { id }, data })
      : null,
  remove: async (id) =>
    (await prisma.resource.findUnique({ where: { id } }))
      ? prisma.resource.delete({ where: { id } })
      : null,
}, {
  schema: resourceSchema,
  searchableFields: ['title', 'description', 'category'],
  publicFilter: () => ({ published: true }),
});