import { prisma } from '../lib/prisma';
import logger from '../utils/logger';

export const connectDatabase = async (): Promise<void> => {
  await prisma.$connect();
  await prisma.$queryRaw`SELECT 1`;
  logger.info('Connected to PostgreSQL');
};

export const disconnectDatabase = async (): Promise<void> => {
  await prisma.$disconnect();
};