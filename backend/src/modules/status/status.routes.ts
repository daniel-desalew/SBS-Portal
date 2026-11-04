import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { lookup } from './status.controller';
import { lookupStatusSchema } from './status.validation';

const router = Router();
router.get('/', validate(lookupStatusSchema), lookup);

export default router;