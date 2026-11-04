import { Resource } from '../../models/Resource.model';
import { createContentService } from '../content.service';
import { resourceSchema } from './resources.validation';

export const resourcesService = createContentService(Resource, {
  schema: resourceSchema,
  searchableFields: ['title', 'description', 'category'],
  publicFilter: { published: true },
});