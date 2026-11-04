import cors from 'cors';
import { env } from './env';
import { ApiError } from '../utils/ApiError';

const allowedOrigins = new Set(
  [env.CLIENT_URL, ...(process.env.CORS_ORIGINS ?? '').split(',')]
    .map((origin) => origin.trim())
    .filter(Boolean),
);

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }
    callback(new ApiError(403, `Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
});