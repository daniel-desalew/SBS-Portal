import { Faq } from '../../models/Faq.model';
import { createContentService } from '../content.service';
import { faqSchema } from './faq.validation';

export const faqService = createContentService(Faq, {
  schema: faqSchema,
  searchableFields: ['question', 'answer', 'category'],
  publicFilter: { published: true },
});