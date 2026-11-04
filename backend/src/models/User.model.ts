import { Schema } from 'mongoose';
import { USER_ROLES, type UserRole } from '../utils/constants';
import { getModel } from './model.util';

export interface UserDocument {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    firstName: { type: String, required: true, trim: true, maxlength: 80 },
    lastName: { type: String, required: true, trim: true, maxlength: 80 },
    role: { type: String, enum: USER_ROLES, default: 'applicant', required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const User = getModel<UserDocument>('User', userSchema);