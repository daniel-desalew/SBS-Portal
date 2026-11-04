import { RefreshToken } from '../models/RefreshToken.model';
import logger from '../utils/logger';

export const startCleanupCron = (intervalMs = 60 * 60 * 1000): NodeJS.Timeout => {
  const timer = setInterval(() => {
    void RefreshToken.deleteMany({ expiresAt: { $lte: new Date() } })
      .then(({ deletedCount }) => {
        if (deletedCount > 0) logger.info('Expired refresh tokens removed', { deletedCount });
      })
      .catch((error: unknown) => logger.error('Expired token cleanup failed', { error }));
  }, intervalMs);
  timer.unref();
  return timer;
};