import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { createContentService } from '../content.service';
import { gallerySchema } from './gallery.validation';
import { createId } from '../../utils/id';

export const galleryService = createContentService({
  list: (where, skip, take) =>
    prisma.gallery.findMany({ where: where as Prisma.GalleryWhereInput, orderBy: { createdAt: 'desc' }, skip, take }),
  count: (where) => prisma.gallery.count({ where: where as Prisma.GalleryWhereInput }),
  find: (where) => prisma.gallery.findFirst({ where: where as Prisma.GalleryWhereInput }),
  create: (data) => prisma.gallery.create({ data: { id: createId(), ...data } }),
  update: async (id, data) =>
    (await prisma.gallery.findUnique({ where: { id } }))
      ? prisma.gallery.update({ where: { id }, data })
      : null,
  remove: async (id) =>
    (await prisma.gallery.findUnique({ where: { id } }))
      ? prisma.gallery.delete({ where: { id } })
      : null,
}, {
  schema: gallerySchema,
  searchableFields: ['title', 'altText'],
  publicFilter: () => ({ published: true }),
});