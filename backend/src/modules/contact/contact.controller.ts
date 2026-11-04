import type { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { getRouteParam } from '../../utils/helpers';
import * as service from './contact.service';

export const create = asyncHandler(async (request: Request, response: Response) => {
  response.status(201).json(
    new ApiResponse(await service.createContactMessage(request.body), 'Message sent'),
  );
});

export const list = asyncHandler(async (request: Request, response: Response) => {
  response.json(new ApiResponse(await service.listContactMessages(request), 'Messages retrieved'));
});

export const update = asyncHandler(async (request: Request, response: Response) => {
  response.json(
    new ApiResponse(
      await service.updateContactStatus(getRouteParam(request, 'id'), request.body.status),
      'Message updated',
    ),
  );
});