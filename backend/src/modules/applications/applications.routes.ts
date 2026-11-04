import { Router } from 'express';
import { requireOpenApplicationWindow } from '../../middlewares/applicationWindow.middleware';
import { verifyCaptcha } from '../../middlewares/captcha.middleware';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validate.middleware';
import * as controller from './applications.controller';
import {
  applicationIdSchema,
  createApplicationSchema,
  updateApplicationStatusSchema,
} from './applications.validation';

const router = Router();

router.post(
  '/',
  verifyCaptcha,
  validate(createApplicationSchema),
  requireOpenApplicationWindow,
  controller.create,
);
router.get('/', requireAuth, requireRoles('admin', 'staff'), controller.list);
router.get('/:id', requireAuth, requireRoles('admin', 'staff'), validate(applicationIdSchema), controller.getById);
router.patch(
  '/:id/status',
  requireAuth,
  requireRoles('admin', 'staff'),
  validate(updateApplicationStatusSchema),
  controller.updateStatus,
);

export default router;