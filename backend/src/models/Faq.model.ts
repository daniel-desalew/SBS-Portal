import { Schema } from 'mongoose';
import { getModel } from './model.util';

interface FaqDocument {
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
}

const faqSchema = new Schema<FaqDocument>(
  {
    question: { type: String, required: true, trim: true, maxlength: 500 },
    answer: { type: String, required: true, maxlength: 5000 },
    category: { type: String, default: 'General', maxlength: 100 },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Faq = getModel<FaqDocument>('Faq', faqSchema);