import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';
import logger from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  void _next;
  if (error instanceof ZodError) {
    response.status(400).json({
      success: false,
      message: 'Request validation failed',
      details: error.flatten(),
    });
    return;
  }
  if (error instanceof ApiError) {
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.details ? { details: error.details } : {}),
    });
    return;
  }
  if (error && typeof error === 'object' && 'name' in error && error.name === 'CastError') {
    response.status(400).json({ success: false, message: 'Invalid identifier' });
    return;
  }
  if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
    response.status(409).json({ success: false, message: 'A record with that value already exists' });
    return;
  }
  if (error instanceof SyntaxError && 'status' in error && error.status === 400) {
    response.status(400).json({ success: false, message: 'Malformed JSON request body' });
    return;
  }
  if (
    error &&
    typeof error === 'object' &&
    'name' in error &&
    error.name === 'MulterError'
  ) {
    const code = 'code' in error ? error.code : undefined;
    const statusCode = code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    response.status(statusCode).json({
      success: false,
      message: code === 'LIMIT_FILE_SIZE' ? 'Uploaded file is too large' : 'Invalid upload',
    });
    return;
  }
  if (error instanceof Error) {
    logger.error(error.message, { stack: error.stack });
  } else {
    logger.error('An unknown request error occurred', { error });
  }
  response.status(500).json({ success: false, message: 'Internal server error' });
};