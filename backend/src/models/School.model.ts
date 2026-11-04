import { Schema } from 'mongoose';
import { getModel } from './model.util';

interface SchoolDocument {
  name: string;
  region: string;
  address?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
}

const schoolSchema = new Schema<SchoolDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true, maxlength: 160 },
    region: { type: String, required: true, trim: true, index: true },
    address: { type: String, trim: true, maxlength: 500 },
    phone: { type: String, trim: true, maxlength: 30 },
    email: { type: String, lowercase: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const School = getModel<SchoolDocument>('School', schoolSchema);