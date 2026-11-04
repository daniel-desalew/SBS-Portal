import { createContentController } from '../content.controller';
import { schoolsService } from './schools.service';

export const schoolsController = createContentController(schoolsService);