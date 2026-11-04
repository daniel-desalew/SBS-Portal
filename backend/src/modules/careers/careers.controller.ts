import { createContentController } from '../content.controller';
import { careersService } from './careers.service';

export const careersController = createContentController(careersService);