import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { env } from '../config/env';

const connection = new Redis(env.REDIS_URL, { maxRetriesPerRequest: null });

export const emailQueue = new Queue('email', { connection });
export const smsQueue = new Queue('sms', { connection });
export const pdfQueue = new Queue('pdf', { connection });

export const closeQueues = async (): Promise<void> => {
  await Promise.all([emailQueue.close(), smsQueue.close(), pdfQueue.close()]);
  await connection.quit();
};