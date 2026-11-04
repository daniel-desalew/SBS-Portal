import type { RequestHandler } from 'express';
import { verifyAccessToken } from '../services/token.service';
import { ApiError } from '../utils/ApiError';

export const requireAuth: RequestHandler = (request, _response, next) => {
  const authorization = request.header('authorization');
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : undefined;
  if (!token) {
    next(new ApiError(401, 'Authentication required'));
    return;
  }
  try {
    const payload = verifyAccessToken(token);
    request.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired access token'));
  }
};

export const optionalAuth: RequestHandler = (request, _response, next) => {
  const authorization = request.header('authorization');
  if (!authorization) {
    next();
    return;
  }
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) {
    next(new ApiError(401, 'Invalid authorization header'));
    return;
  }
  try {
    const payload = verifyAccessToken(token);
    request.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired access token'));
  }
};