import { Schema } from 'mongoose';
import { getModel } from './model.util';

interface GalleryDocument {
  title: string;
  imageUrl: string;
  altText: string;
  published: boolean;
}

const gallerySchema = new Schema<GalleryDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    imageUrl: { type: String, required: true },
    altText: { type: String, required: true, maxlength: 200 },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export const Gallery = getModel<GalleryDocument>('Gallery', gallerySchema);