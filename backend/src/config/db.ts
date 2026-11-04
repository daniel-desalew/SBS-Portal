import mongoose from 'mongoose';
import { env } from './env';
import logger from '../utils/logger';

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(env.MONGODB_URI);
  logger.info('Connected to MongoDB');
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};