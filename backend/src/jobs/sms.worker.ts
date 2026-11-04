import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { env } from '../config/env';
import { sendSms } from '../services/sms.service';

interface SmsJob {
  to: string;
  message: string;
}

export const createSmsWorker = () =>
  new Worker<SmsJob>(
    'sms',
    async (job) => {
      await sendSms(job.data.to, job.data.message);
    },
    { connection: new Redis(env.REDIS_URL, { maxRetriesPerRequest: null }) },
  );