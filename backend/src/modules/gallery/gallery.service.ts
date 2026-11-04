import { Gallery } from '../../models/Gallery.model';
import { createContentService } from '../content.service';
import { gallerySchema } from './gallery.validation';

export const galleryService = createContentService(Gallery, {
  schema: gallerySchema,
  searchableFields: ['title', 'altText'],
  publicFilter: { published: true },
});