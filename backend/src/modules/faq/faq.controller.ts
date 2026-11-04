import { createContentController } from '../content.controller';
import { faqService } from './faq.service';

export const faqController = createContentController(faqService);