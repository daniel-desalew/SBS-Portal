import type { RequestHandler } from 'express';
import type { UserRole } from '../utils/constants';
import { ApiError } from '../utils/ApiError';

export const requireRoles =
  (...roles: UserRole[]): RequestHandler =>
  (request, _response, next) => {
    if (!request.user || !roles.includes(request.user.role)) {
      next(new ApiError(403, 'You do not have permission to perform this action'));
      return;
    }
    next();
  };