import type { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { getRouteParam } from '../../utils/helpers';
import * as service from './complaints.service';

export const create = asyncHandler(async (request: Request, response: Response) => {
  response.status(201).json(
    new ApiResponse(await service.createComplaint(request.body), 'Complaint submitted'),
  );
});

export const list = asyncHandler(async (request: Request, response: Response) => {
  response.json(new ApiResponse(await service.listComplaints(request), 'Complaints retrieved'));
});

export const getById = asyncHandler(async (request: Request, response: Response) => {
  response.json(
    new ApiResponse(await service.getComplaint(getRouteParam(request, 'id')), 'Complaint retrieved'),
  );
});

export const update = asyncHandler(async (request: Request, response: Response) => {
  response.json(
    new ApiResponse(
      await service.updateComplaint(getRouteParam(request, 'id'), request.body),
      'Complaint updated',
    ),
  );
});