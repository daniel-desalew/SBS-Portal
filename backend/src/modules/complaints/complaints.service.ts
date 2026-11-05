import type { Request } from 'express';
import { prisma } from '../../lib/prisma';
import { ApiError } from '../../utils/ApiError';
import { getPagination } from '../../utils/pagination';
import { createId } from '../../utils/id';

export const createComplaint = async (input: {
  referenceNumber: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const application = await prisma.application.findFirst({
    where: {
      referenceNumber: input.referenceNumber.trim().toUpperCase(),
      applicantEmail: input.email.trim().toLowerCase(),
    },
    select: { id: true },
  });
  if (!application) throw new ApiError(404, 'Application not found for the supplied details');
  return prisma.complaint.create({
    data: {
      id: createId(),
      ...input,
      referenceNumber: input.referenceNumber.trim().toUpperCase(),
      email: input.email.trim().toLowerCase(),
      application: application.id,
    },
  });
};

export const listComplaints = async (request: Request) => {
  const { page, limit, skip } = getPagination(request);
  const [items, total] = await Promise.all([
    prisma.complaint.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit }),
    prisma.complaint.count(),
  ]);
  return { items, page, limit, total, pages: Math.ceil(total / limit) };
};

export const getComplaint = async (id: string) => {
  const complaint = await prisma.complaint.findUnique({ where: { id } });
  if (!complaint) throw new ApiError(404, 'Complaint not found');
  return complaint;
};

export const updateComplaint = async (
  id: string,
  update: { status?: string; response?: string },
) => {
  const complaint = await prisma.complaint.findUnique({ where: { id } });
  if (!complaint) throw new ApiError(404, 'Complaint not found');
  return prisma.complaint.update({ where: { id }, data: update });
};