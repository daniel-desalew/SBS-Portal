import type { Request } from 'express';
import { prisma } from '../../lib/prisma';
import { ApiError } from '../../utils/ApiError';
import { getPagination } from '../../utils/pagination';
import type { UserRole } from '../../utils/constants';

export const listUsers = async (request: Request) => {
  const { page, limit, skip } = getPagination(request);
  const [items, total] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit }),
    prisma.user.count(),
  ]);
  return { items, page, limit, total, pages: Math.ceil(total / limit) };
};

export const updateUser = async (
  id: string,
  update: { role?: UserRole; isActive?: boolean; firstName?: string; lastName?: string },
  actorId: string,
) => {
  if (id === actorId && (update.role !== undefined || update.isActive === false)) {
    throw new ApiError(400, 'You cannot change your own role or deactivate your account');
  }
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(404, 'User not found');
  const updated = await prisma.user.update({ where: { id }, data: update });
  return {
    id: updated.id,
    email: updated.email,
    firstName: updated.firstName,
    lastName: updated.lastName,
    role: updated.role,
    isActive: updated.isActive,
  };
};