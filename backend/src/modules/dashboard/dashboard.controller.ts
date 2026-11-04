import type { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { getDashboardSummary } from './dashboard.service';

export const summary = asyncHandler(async (_request: Request, response: Response) => {
  response.json(new ApiResponse(await getDashboardSummary(), 'Dashboard summary retrieved'));
});