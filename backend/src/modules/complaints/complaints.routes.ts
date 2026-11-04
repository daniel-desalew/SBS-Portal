import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { verifyCaptcha } from '../../middlewares/captcha.middleware';
import * as controller from './complaints.controller';
import {
  complaintIdSchema,
  createComplaintSchema,
  updateComplaintSchema,
} from './complaints.validation';

const router = Router();

router.post('/', verifyCaptcha, validate(createComplaintSchema), controller.create);
router.get('/', requireAuth, requireRoles('admin', 'staff'), controller.list);
router.patch(
  '/:id',
  requireAuth,
  requireRoles('admin', 'staff'),
  validate(updateComplaintSchema),
  controller.update,
);
router.get(
  '/:id',
  requireAuth,
  requireRoles('admin', 'staff'),
  validate(complaintIdSchema),
  controller.getById,
);

export default router;