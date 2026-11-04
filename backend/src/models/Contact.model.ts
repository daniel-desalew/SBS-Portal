import { Schema } from 'mongoose';
import { getModel } from './model.util';

interface ContactDocument {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'closed';
}

const contactSchema = new Schema<ContactDocument>(
  {
    name: { type: String, required: true, trim: true, maxlength: 160 },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 5000 },
    status: { type: String, enum: ['new', 'read', 'closed'], default: 'new' },
  },
  { timestamps: true },
);

export const Contact = getModel<ContactDocument>('Contact', contactSchema);