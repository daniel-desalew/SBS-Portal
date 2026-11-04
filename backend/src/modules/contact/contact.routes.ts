import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { verifyCaptcha } from '../../middlewares/captcha.middleware';
import * as controller from './contact.controller';
import { contactUpdateSchema, createContactSchema } from './contact.validation';

const router = Router();
router.post('/', verifyCaptcha, validate(createContactSchema), controller.create);
router.get('/', requireAuth, requireRoles('admin', 'staff'), controller.list);
router.patch(
  '/:id',
  requireAuth,
  requireRoles('admin', 'staff'),
  validate(contactUpdateSchema),
  controller.update,
);

export default router;