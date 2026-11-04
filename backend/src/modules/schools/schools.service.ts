import { School } from '../../models/School.model';
import { createContentService } from '../content.service';
import { schoolSchema } from './schools.validation';

export const schoolsService = createContentService(School, {
  schema: schoolSchema,
  searchableFields: ['name', 'region', 'address'],
  publicFilter: { isActive: true },
});