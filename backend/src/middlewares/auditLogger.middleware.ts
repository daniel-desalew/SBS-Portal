import type { RequestHandler } from 'express';
import { prisma } from '../lib/prisma';
import logger from '../utils/logger';
import { createId } from '../utils/id';

export const auditLogger: RequestHandler = (request, response, next) => {
  response.on('finish', () => {
    if (response.statusCode < 400 && request.user && !['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
      void prisma.auditLog.create({
        data: {
          id: createId(),
          actor: request.user.id,
          action: request.method,
          resource: request.baseUrl + request.path,
          ip: request.ip,
        },
      }).catch((error: unknown) => logger.error('Failed to write audit log', { error }));
    }
  });
  next();
};