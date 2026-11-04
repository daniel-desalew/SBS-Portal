import { Schema } from 'mongoose';
import { getModel } from './model.util';

interface JobDocument {
  title: string;
  description: string;
  location: string;
  deadline: Date;
  published: boolean;
}

const jobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, maxlength: 30000 },
    location: { type: String, required: true, trim: true, maxlength: 160 },
    deadline: { type: Date, required: true },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export const Job = getModel<JobDocument>('Job', jobSchema);