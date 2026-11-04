import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { corsMiddleware } from './config/cors';
import { swaggerSpec } from './config/swagger';
import { apiRateLimiter } from './middlewares/rateLimiter.middleware';
import { sanitizeRequest } from './middlewares/sanitize.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { notFound } from './middlewares/notFound.middleware';
import apiRoutes from './routes';
import { API_PREFIX } from './utils/constants';
import { ApiResponse } from './utils/ApiResponse';

export const createApp = () => {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(corsMiddleware);
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));
  app.use(sanitizeRequest);
  app.get('/health', (_request, response) => {
    response.json(new ApiResponse({ status: 'ok' }, 'Service is healthy'));
  });
  app.use(`${API_PREFIX}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(API_PREFIX, apiRateLimiter, apiRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};

const app = createApp();
export default app;