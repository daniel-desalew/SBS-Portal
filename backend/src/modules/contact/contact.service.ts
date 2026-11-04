import type { Request } from 'express';
import { Contact } from '../../models/Contact.model';
import { ApiError } from '../../utils/ApiError';
import { getPagination } from '../../utils/pagination';

export const createContactMessage = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) =>
  Contact.create({
    ...data,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
  });

export const listContactMessages = async (request: Request) => {
  const { page, limit, skip } = getPagination(request);
  const [items, total] = await Promise.all([
    Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Contact.countDocuments(),
  ]);
  return { items, page, limit, total, pages: Math.ceil(total / limit) };
};

export const updateContactStatus = async (id: string, status: 'new' | 'read' | 'closed') => {
  const contact = await Contact.findByIdAndUpdate(id, { $set: { status } }, { new: true }).lean();
  if (!contact) throw new ApiError(404, 'Contact message not found');
  return contact;
};