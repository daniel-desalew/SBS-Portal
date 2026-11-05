import type { Request } from 'express';
import { prisma } from '../../lib/prisma';
import { ApiError } from '../../utils/ApiError';
import { getPagination } from '../../utils/pagination';
import { createId } from '../../utils/id';

export const createContactMessage = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) =>
  prisma.contact.create({
    data: {
      id: createId(),
      ...data,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      status: 'new',
    },
  });

export const listContactMessages = async (request: Request) => {
  const { page, limit, skip } = getPagination(request);
  const [items, total] = await Promise.all([
    prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit }),
    prisma.contact.count(),
  ]);
  return { items, page, limit, total, pages: Math.ceil(total / limit) };
};

export const updateContactStatus = async (id: string, status: 'new' | 'read' | 'closed') => {
  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) throw new ApiError(404, 'Contact message not found');
  return prisma.contact.update({ where: { id }, data: { status } });
};