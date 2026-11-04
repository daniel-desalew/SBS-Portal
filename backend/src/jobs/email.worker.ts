import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { env } from '../config/env';
import { sendTransactionalEmail } from '../services/email.service';

interface EmailJob {
  to: string;
  subject: string;
  html: string;
}

export const createEmailWorker = () =>
  new Worker<EmailJob>(
    'email',
    async (job) => {
      await sendTransactionalEmail(job.data.to, job.data.subject, job.data.html);
    },
    { connection: new Redis(env.REDIS_URL, { maxRetriesPerRequest: null }) },
  );