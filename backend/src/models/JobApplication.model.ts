import { Schema, Types } from 'mongoose';
import { getModel } from './model.util';

interface JobApplicationDocument {
  job: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  status: 'received' | 'reviewing' | 'accepted' | 'rejected';
}

const jobApplicationSchema = new Schema<JobApplicationDocument>(
  {
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 160 },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    resumeUrl: { type: String, required: true },
    status: { type: String, enum: ['received', 'reviewing', 'accepted', 'rejected'], default: 'received' },
  },
  { timestamps: true },
);

export const JobApplication = getModel<JobApplicationDocument>(
  'JobApplication',
  jobApplicationSchema,
);