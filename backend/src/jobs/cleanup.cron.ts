import { prisma } from '../lib/prisma';
import logger from '../utils/logger';

export const startCleanupCron = (intervalMs = 60 * 60 * 1000): NodeJS.Timeout => {
  const timer = setInterval(() => {
    void prisma.refreshToken.deleteMany({ where: { expiresAt: { lte: new Date() } } })
      .then(({ count }) => {
        if (count > 0) logger.info('Expired refresh tokens removed', { deletedCount: count });
      })
      .catch((error: unknown) => logger.error('Expired token cleanup failed', { error }));
  }, intervalMs);
  timer.unref();
  return timer;
};