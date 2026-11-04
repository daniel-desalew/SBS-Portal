import type { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { getRouteParam } from '../../utils/helpers';
import * as service from './users.service';

export const list = asyncHandler(async (request: Request, response: Response) => {
  response.json(new ApiResponse(await service.listUsers(request), 'Users retrieved'));
});

export const update = asyncHandler(async (request: Request, response: Response) => {
  response.json(
    new ApiResponse(
      await service.updateUser(getRouteParam(request, 'id'), request.body, request.user!.id),
      'User updated',
    ),
  );
});