import type { Request } from 'express';
import { Application } from '../../models/Application.model';
import { Complaint } from '../../models/Complaint.model';
import { ApiError } from '../../utils/ApiError';
import { getPagination } from '../../utils/pagination';

export const createComplaint = async (input: {
  referenceNumber: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const application = await Application.exists({
    referenceNumber: input.referenceNumber.trim().toUpperCase(),
    'applicant.email': input.email.trim().toLowerCase(),
  });
  if (!application) throw new ApiError(404, 'Application not found for the supplied details');
  return Complaint.create({
    ...input,
    referenceNumber: input.referenceNumber.trim().toUpperCase(),
    email: input.email.trim().toLowerCase(),
  });
};

export const listComplaints = async (request: Request) => {
  const { page, limit, skip } = getPagination(request);
  const [items, total] = await Promise.all([
    Complaint.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Complaint.countDocuments(),
  ]);
  return { items, page, limit, total, pages: Math.ceil(total / limit) };
};

export const getComplaint = async (id: string) => {
  const complaint = await Complaint.findById(id).lean();
  if (!complaint) throw new ApiError(404, 'Complaint not found');
  return complaint;
};

export const updateComplaint = async (
  id: string,
  update: { status?: string; response?: string },
) => {
  const complaint = await Complaint.findByIdAndUpdate(
    id,
    { $set: update },
    { new: true, runValidators: true },
  ).lean();
  if (!complaint) throw new ApiError(404, 'Complaint not found');
  return complaint;
};