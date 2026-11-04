import type { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { lookupStatus } from './status.service';

export const lookup = asyncHandler(async (request: Request, response: Response) => {
  const result = await lookupStatus(
    String(request.query.referenceNumber),
    String(request.query.email),
  );
  response.json(new ApiResponse(result, 'Application status retrieved'));
});