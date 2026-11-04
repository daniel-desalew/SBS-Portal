import { Schema } from 'mongoose';
import { getModel } from './model.util';

interface ProgramDocument {
  title: string;
  description: string;
  grade: number[];
  isActive: boolean;
}

const programSchema = new Schema<ProgramDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, maxlength: 5000 },
    grade: { type: [Number], default: [9, 10] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Program = getModel<ProgramDocument>('Program', programSchema);