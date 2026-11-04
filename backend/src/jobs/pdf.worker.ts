import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { env } from '../config/env';
import { createPdfBuffer } from '../services/pdf.service';

interface PdfJob {
  title: string;
  lines: string[];
}

export const createPdfWorker = () =>
  new Worker<PdfJob>(
    'pdf',
    async (job) => createPdfBuffer(job.data.title, job.data.lines),
    { connection: new Redis(env.REDIS_URL, { maxRetriesPerRequest: null }) },
  );