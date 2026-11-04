import type { Request } from 'express';
import { User } from '../../models/User.model';
import { ApiError } from '../../utils/ApiError';
import { getPagination } from '../../utils/pagination';

export const listUsers = async (request: Request) => {
  const { page, limit, skip } = getPagination(request);
  const [items, total] = await Promise.all([
    User.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments(),
  ]);
  return { items, page, limit, total, pages: Math.ceil(total / limit) };
};

export const updateUser = async (
  id: string,
  update: { role?: string; isActive?: boolean; firstName?: string; lastName?: string },
  actorId: string,
) => {
  if (id === actorId && (update.role !== undefined || update.isActive === false)) {
    throw new ApiError(400, 'You cannot change your own role or deactivate your account');
  }
  const user = await User.findByIdAndUpdate(
    id,
    { $set: update },
    { new: true, runValidators: true },
  ).lean();
  if (!user) throw new ApiError(404, 'User not found');
  return {
    id: String(user._id),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    isActive: user.isActive,
  };
};