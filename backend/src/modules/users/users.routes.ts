import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validate.middleware';
import * as controller from './users.controller';
import { userUpdateSchema } from './users.validation';

const router = Router();
router.use(requireAuth, requireRoles('admin'));
router.get('/', controller.list);
router.patch('/:id', validate(userUpdateSchema), controller.update);

export default router;