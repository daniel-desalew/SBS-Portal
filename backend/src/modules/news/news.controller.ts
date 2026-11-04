import { createContentController } from '../content.controller';
import { newsService } from './news.service';

export const newsController = createContentController(newsService);