import { createContentController } from '../content.controller';
import { galleryService } from './gallery.service';

export const galleryController = createContentController(galleryService);