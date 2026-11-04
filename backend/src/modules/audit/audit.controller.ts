import type { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { listAuditLogs } from './audit.service';

export const list = asyncHandler(async (request: Request, response: Response) => {
  response.json(new ApiResponse(await listAuditLogs(request), 'Audit logs retrieved'));
});