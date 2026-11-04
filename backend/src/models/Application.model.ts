import { Schema, Types } from 'mongoose';
import { APPLICATION_STATUSES, type ApplicationStatus } from '../utils/constants';
import { getModel } from './model.util';

export interface ApplicationDocument {
  referenceNumber: string;
  grade: 9 | 10;
  applicant: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    email: string;
    phone: string;
  };
  academic: Record<string, unknown>;
  guardian: Record<string, unknown>;
  documents: Array<{ name: string; url: string }>;
  status: ApplicationStatus;
  submittedBy?: Types.ObjectId;
}

const applicationSchema = new Schema<ApplicationDocument>(
  {
    referenceNumber: { type: String, required: true, unique: true, index: true },
    grade: { type: Number, enum: [9, 10], required: true },
    applicant: {
      firstName: { type: String, required: true, trim: true, maxlength: 80 },
      lastName: { type: String, required: true, trim: true, maxlength: 80 },
      dateOfBirth: { type: Date, required: true },
      gender: { type: String, required: true, maxlength: 40 },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true, trim: true, maxlength: 30 },
    },
    academic: { type: Schema.Types.Mixed, default: {} },
    guardian: { type: Schema.Types.Mixed, default: {} },
    documents: {
      type: [{ name: { type: String, required: true }, url: { type: String, required: true } }],
      default: [],
    },
    status: { type: String, enum: APPLICATION_STATUSES, default: 'submitted', required: true },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

applicationSchema.index({ 'applicant.email': 1, grade: 1 });
export const Application = getModel<ApplicationDocument>('Application', applicationSchema);