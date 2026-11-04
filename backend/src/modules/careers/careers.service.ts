import { Job } from '../../models/Job.model';
import { createContentService } from '../content.service';
import { careerSchema } from './careers.validation';

export const careersService = createContentService(Job, {
  schema: careerSchema,
  searchableFields: ['title', 'description', 'location'],
  publicFilter: { published: true, deadline: { $gte: new Date() } },
});