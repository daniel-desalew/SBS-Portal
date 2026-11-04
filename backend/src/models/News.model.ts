import { Schema, Types } from 'mongoose';
import { getModel } from './model.util';

interface NewsDocument {
  title: string;
  slug: string;
  summary: string;
  body: string;
  publishedAt?: Date;
  published: boolean;
  author?: Types.ObjectId;
}

const newsSchema = new Schema<NewsDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true, maxlength: 500 },
    body: { type: String, required: true, maxlength: 50000 },
    publishedAt: { type: Date },
    published: { type: Boolean, default: false, index: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export const News = getModel<NewsDocument>('News', newsSchema);