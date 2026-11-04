import type { Request, RequestHandler, Response, NextFunction } from 'express';

type AsyncController = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<unknown>;

export const asyncHandler = (handler: AsyncController): RequestHandler =>
  (request, response, next) => {
    void handler(request, response, next).catch(next);
  };