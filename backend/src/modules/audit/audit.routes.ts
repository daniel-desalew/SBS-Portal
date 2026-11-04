import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/role.middleware';
import { list } from './audit.controller';

const router = Router();
router.get('/', requireAuth, requireRoles('admin'), list);

export default router;