import type { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { getRouteParam } from '../../utils/helpers';
import * as service from './applications.service';

export const create = asyncHandler(async (request: Request, response: Response) => {
  const application = await service.createApplication(request.body);
  response.status(201).json(new ApiResponse(application, 'Application received'));
});

export const list = asyncHandler(async (request: Request, response: Response) => {
  response.json(new ApiResponse(await service.listApplications(request), 'Applications retrieved'));
});

export const getById = asyncHandler(async (request: Request, response: Response) => {
  response.json(
    new ApiResponse(
      await service.getApplicationById(getRouteParam(request, 'id')),
      'Application retrieved',
    ),
  );
});

export const updateStatus = asyncHandler(async (request: Request, response: Response) => {
  response.json(
    new ApiResponse(
      await service.updateApplicationStatus(getRouteParam(request, 'id'), request.body.status),
      'Application status updated',
    ),
  );
});