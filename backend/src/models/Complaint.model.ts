import { Schema, Types } from 'mongoose';
import { COMPLAINT_STATUSES } from '../utils/constants';
import { getModel } from './model.util';

interface ComplaintDocument {
  referenceNumber: string;
  email: string;
  subject: string;
  message: string;
  status: (typeof COMPLAINT_STATUSES)[number];
  response?: string;
  application?: Types.ObjectId;
}

const complaintSchema = new Schema<ComplaintDocument>(
  {
    referenceNumber: { type: String, required: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true, trim: true, maxlength: 160 },
    message: { type: String, required: true, maxlength: 5000 },
    status: { type: String, enum: COMPLAINT_STATUSES, default: 'open' },
    response: { type: String, maxlength: 5000 },
    application: { type: Schema.Types.ObjectId, ref: 'Application' },
  },
  { timestamps: true },
);

export const Complaint = getModel<ComplaintDocument>('Complaint', complaintSchema);