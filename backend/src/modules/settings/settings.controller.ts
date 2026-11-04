import type { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { getRouteParam } from '../../utils/helpers';
import * as service from './settings.service';

export const list = asyncHandler(async (_request: Request, response: Response) => {
  response.json(new ApiResponse(await service.listSettings(), 'Settings retrieved'));
});

export const getApplicationWindow = asyncHandler(async (_request: Request, response: Response) => {
  response.json(
    new ApiResponse(await service.getSetting('applicationWindow'), 'Application window retrieved'),
  );
});

export const update = asyncHandler(async (request: Request, response: Response) => {
  response.json(
    new ApiResponse(
      await service.setSetting(getRouteParam(request, 'key'), request.body.value),
      'Setting updated',
    ),
  );
});