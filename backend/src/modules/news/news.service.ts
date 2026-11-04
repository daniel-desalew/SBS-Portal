import { News } from '../../models/News.model';
import { createContentService } from '../content.service';
import { newsSchema } from './news.validation';

export const newsService = createContentService(News, {
  schema: newsSchema,
  searchableFields: ['title', 'summary', 'body'],
  publicFilter: { published: true },
});