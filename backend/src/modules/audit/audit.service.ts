import type { Request } from 'express';
import { AuditLog } from '../../models/AuditLog.model';
import { getPagination } from '../../utils/pagination';

export const listAuditLogs = async (request: Request) => {
  const { page, limit, skip } = getPagination(request);
  const [items, total] = await Promise.all([
    AuditLog.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('actor', 'email firstName lastName').lean(),
    AuditLog.countDocuments(),
  ]);
  return { items, page, limit, total, pages: Math.ceil(total / limit) };
};