import { Router } from 'express';
import { authRateLimiter } from '../../middlewares/rateLimiter.middleware';
import { validate } from '../../middlewares/validate.middleware';
import * as controller from './auth.controller';
import { loginSchema, refreshSchema, registerSchema } from './auth.validation';

const router = Router();

router.post('/register', authRateLimiter, validate(registerSchema), controller.register);
router.post('/login', authRateLimiter, validate(loginSchema), controller.login);
router.post('/refresh', authRateLimiter, validate(refreshSchema), controller.refresh);
router.post('/logout', validate(refreshSchema), controller.logout);

export default router;