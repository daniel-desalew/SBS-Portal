import { prisma } from '../../lib/prisma';
import { ApiError } from '../../utils/ApiError';
import { getPagination } from '../../utils/pagination';
import type { Request } from 'express';
import { hasDuplicateApplication } from './duplicateCheck.util';
import { generateReferenceNumber } from './referenceNumber.util';
import { createId } from '../../utils/id';
import { toJsonInput } from '../../lib/json';

export const createApplication = async (body: {
  grade: 9 | 10;
  applicant: { email: string; [key: string]: unknown };
  [key: string]: unknown;
}) => {
  if (await hasDuplicateApplication(body.applicant.email, body.grade)) {
    throw new ApiError(409, 'An application for this grade already exists for this email');
  }
  const applicant = { ...body.applicant, email: body.applicant.email.trim().toLowerCase() };
  const document = await prisma.application.create({
    data: {
      id: createId(),
      grade: body.grade,
      applicant: toJsonInput(applicant),
      applicantEmail: applicant.email,
      academic: toJsonInput(body.academic ?? {}),
      guardian: toJsonInput(body.guardian ?? {}),
      documents: toJsonInput(body.documents ?? []),
      referenceNumber: generateReferenceNumber(),
      submittedBy: typeof body.submittedBy === 'string' ? body.submittedBy : undefined,
    },
  });
  return document;
};

export const listApplications = async (request: Request) => {
  const { page, limit, skip } = getPagination(request);
  const [items, total] = await Promise.all([
    prisma.application.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit }),
    prisma.application.count(),
  ]);
  return { items, page, limit, total, pages: Math.ceil(total / limit) };
};

export const getApplicationById = async (id: string) => {
  const application = await prisma.application.findUnique({ where: { id } });
  if (!application) throw new ApiError(404, 'Application not found');
  return application;
};

export const updateApplicationStatus = async (id: string, status: string) => {
  const application = await prisma.application.findUnique({ where: { id } });
  if (!application) throw new ApiError(404, 'Application not found');
  return prisma.application.update({ where: { id }, data: { status } });
};

export const findApplicationStatus = async (referenceNumber: string, email: string) => {
  const application = await prisma.application.findFirst({ where: {
    referenceNumber: referenceNumber.trim().toUpperCase(),
    applicantEmail: email.trim().toLowerCase(),
  } });
  if (!application) throw new ApiError(404, 'No application matches those details');
  return {
    referenceNumber: application.referenceNumber,
    grade: application.grade,
    status: application.status,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
  };
};