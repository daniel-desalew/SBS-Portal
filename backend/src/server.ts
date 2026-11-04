import app from './app';
import { connectDatabase, disconnectDatabase } from './config/db';
import { env } from './config/env';
import { startCleanupCron } from './jobs/cleanup.cron';
import logger from './utils/logger';

const start = async (): Promise<void> => {
  await connectDatabase();
  const cleanupTimer = startCleanupCron();
  const server = app.listen(env.API_PORT, () => {
    logger.info(`API listening on port ${env.API_PORT}`);
  });

  const shutdown = (signal: string) => {
    logger.info(`Received ${signal}; shutting down`);
    server.close((error) => {
      if (error) {
        logger.error('Failed to close HTTP server', { error });
        process.exitCode = 1;
      }
      clearInterval(cleanupTimer);
      void disconnectDatabase().finally(() => process.exit());
    });
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
};

void start().catch((error: unknown) => {
  logger.error('API startup failed', { error });
  process.exitCode = 1;
});