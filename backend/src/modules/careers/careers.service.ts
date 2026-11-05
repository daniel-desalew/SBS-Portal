import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { createContentService } from '../content.service';
import { careerSchema } from './careers.validation';
import { createId } from '../../utils/id';

export const careersService = createContentService({
  list: (where, skip, take) =>
    prisma.job.findMany({ where: where as Prisma.JobWhereInput, orderBy: { createdAt: 'desc' }, skip, take }),
  count: (where) => prisma.job.count({ where: where as Prisma.JobWhereInput }),
  find: (where) => prisma.job.findFirst({ where: where as Prisma.JobWhereInput }),
  create: (data) => prisma.job.create({ data: { id: createId(), ...data } }),
  update: async (id, data) =>
    (await prisma.job.findUnique({ where: { id } }))
      ? prisma.job.update({ where: { id }, data })
      : null,
  remove: async (id) =>
    (await prisma.job.findUnique({ where: { id } }))
      ? prisma.job.delete({ where: { id } })
      : null,
}, {
  schema: careerSchema,
  searchableFields: ['title', 'description', 'location'],
  publicFilter: () => ({ published: true, deadline: { gte: new Date() } }),
});