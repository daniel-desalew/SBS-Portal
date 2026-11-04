import { Application } from '../../models/Application.model';
import { ApiError } from '../../utils/ApiError';
import { getPagination } from '../../utils/pagination';
import type { Request } from 'express';
import { hasDuplicateApplication } from './duplicateCheck.util';
import { generateReferenceNumber } from './referenceNumber.util';

export const createApplication = async (body: {
  grade: 9 | 10;
  applicant: { email: string; [key: string]: unknown };
  [key: string]: unknown;
}) => {
  if (await hasDuplicateApplication(body.applicant.email, body.grade)) {
    throw new ApiError(409, 'An application for this grade already exists for this email');
  }
  const document = await Application.create({
    ...body,
    applicant: { ...body.applicant, email: body.applicant.email.trim().toLowerCase() },
    referenceNumber: generateReferenceNumber(),
  });
  return document;
};

export const listApplications = async (request: Request) => {
  const { page, limit, skip } = getPagination(request);
  const [items, total] = await Promise.all([
    Application.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Application.countDocuments(),
  ]);
  return { items, page, limit, total, pages: Math.ceil(total / limit) };
};

export const getApplicationById = async (id: string) => {
  const application = await Application.findById(id).lean();
  if (!application) throw new ApiError(404, 'Application not found');
  return application;
};

export const updateApplicationStatus = async (id: string, status: string) => {
  const application = await Application.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true, runValidators: true },
  ).lean();
  if (!application) throw new ApiError(404, 'Application not found');
  return application;
};

export const findApplicationStatus = async (referenceNumber: string, email: string) => {
  const application = await Application.findOne({
    referenceNumber: referenceNumber.trim().toUpperCase(),
    'applicant.email': email.trim().toLowerCase(),
  })
    .select('referenceNumber grade status createdAt updatedAt')
    .lean();
  if (!application) throw new ApiError(404, 'No application matches those details');
  return application;
};