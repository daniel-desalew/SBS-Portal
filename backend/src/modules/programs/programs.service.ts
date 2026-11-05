import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { createContentService } from '../content.service';
import { programSchema } from './programs.validation';
import { createId } from '../../utils/id';

export const programsService = createContentService({
  list: (where, skip, take) =>
    prisma.program.findMany({ where: where as Prisma.ProgramWhereInput, orderBy: { createdAt: 'desc' }, skip, take }),
  count: (where) => prisma.program.count({ where: where as Prisma.ProgramWhereInput }),
  find: (where) => prisma.program.findFirst({ where: where as Prisma.ProgramWhereInput }),
  create: (data) => prisma.program.create({ data: { id: createId(), ...data } }),
  update: async (id, data) =>
    (await prisma.program.findUnique({ where: { id } }))
      ? prisma.program.update({ where: { id }, data })
      : null,
  remove: async (id) =>
    (await prisma.program.findUnique({ where: { id } }))
      ? prisma.program.delete({ where: { id } })
      : null,
}, {
  schema: programSchema,
  searchableFields: ['title', 'description'],
  publicFilter: () => ({ isActive: true }),
});