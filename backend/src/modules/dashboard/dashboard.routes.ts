import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/role.middleware';
import { summary } from './dashboard.controller';

const router = Router();
router.get('/', requireAuth, requireRoles('admin', 'staff'), summary);

export default router;