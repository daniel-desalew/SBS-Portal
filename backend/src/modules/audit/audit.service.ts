import type { Request } from 'express';
import { prisma } from '../../lib/prisma';
import { getPagination } from '../../utils/pagination';

export const listAuditLogs = async (request: Request) => {
  const { page, limit, skip } = getPagination(request);
  const [items, total] = await Promise.all([
    prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.auditLog.count(),
  ]);
  const withActors = await Promise.all(items.map(async (item) => {
    const actor = item.actor
      ? await prisma.user.findUnique({
          where: { id: item.actor },
          select: { email: true, firstName: true, lastName: true },
        })
      : null;
    return { ...item, actor };
  }));
  return { items: withActors, page, limit, total, pages: Math.ceil(total / limit) };
};