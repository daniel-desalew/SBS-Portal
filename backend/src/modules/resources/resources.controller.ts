import { createContentController } from '../content.controller';
import { resourcesService } from './resources.service';

export const resourcesController = createContentController(resourcesService);