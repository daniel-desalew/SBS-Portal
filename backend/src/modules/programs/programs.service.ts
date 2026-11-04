import { Program } from '../../models/Program.model';
import { createContentService } from '../content.service';
import { programSchema } from './programs.validation';

export const programsService = createContentService(Program, {
  schema: programSchema,
  searchableFields: ['title', 'description'],
  publicFilter: { isActive: true },
});