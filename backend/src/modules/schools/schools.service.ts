import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { createContentService } from '../content.service';
import { schoolSchema } from './schools.validation';
import { createId } from '../../utils/id';

export const schoolsService = createContentService({
  list: (where, skip, take) =>
    prisma.school.findMany({ where: where as Prisma.SchoolWhereInput, orderBy: { createdAt: 'desc' }, skip, take }),
  count: (where) => prisma.school.count({ where: where as Prisma.SchoolWhereInput }),
  find: (where) => prisma.school.findFirst({ where: where as Prisma.SchoolWhereInput }),
  create: (data) => prisma.school.create({ data: { id: createId(), ...data } }),
  update: async (id, data) =>
    (await prisma.school.findUnique({ where: { id } }))
      ? prisma.school.update({ where: { id }, data })
      : null,
  remove: async (id) =>
    (await prisma.school.findUnique({ where: { id } }))
      ? prisma.school.delete({ where: { id } })
      : null,
}, {
  schema: schoolSchema,
  searchableFields: ['name', 'region', 'address'],
  publicFilter: () => ({ isActive: true }),
});