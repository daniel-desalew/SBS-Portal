import { createContentController } from '../content.controller';
import { programsService } from './programs.service';

export const programsController = createContentController(programsService);