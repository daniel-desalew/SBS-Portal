import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validate.middleware';
import * as controller from './settings.controller';
import { updateSettingSchema } from './settings.validation';

const router = Router();
router.get('/application-window', controller.getApplicationWindow);
router.use(requireAuth, requireRoles('admin'));
router.get('/', controller.list);
router.put('/:key', validate(updateSettingSchema), controller.update);

export default router;