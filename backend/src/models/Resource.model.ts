import { Schema } from 'mongoose';
import { getModel } from './model.util';

interface ResourceDocument {
  title: string;
  description: string;
  url: string;
  category: string;
  published: boolean;
}

const resourceSchema = new Schema<ResourceDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, maxlength: 2000 },
    url: { type: String, required: true },
    category: { type: String, required: true, trim: true, maxlength: 80 },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export const Resource = getModel<ResourceDocument>('Resource', resourceSchema);