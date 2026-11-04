import { Router } from 'express';
import { z } from 'zod';
import { optionalAuth, requireAuth } from '../middlewares/auth.middleware';
import { requireRoles } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { getRouteParam } from '../utils/helpers';
import { type ContentService } from './content.service';

const idSchema = z.object({ params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i) }) });

export const createContentController = (service: ContentService) => {
  const router = Router();
  const isAdmin = (request: Parameters<typeof service.list>[0]) =>
    request.user?.role === 'admin' || request.user?.role === 'staff';

  router.get(
    '/',
    optionalAuth,
    asyncHandler(async (request, response) => {
      response.json(
        new ApiResponse(await service.list(request, isAdmin(request)), 'Records retrieved'),
      );
    }),
  );
  router.get(
    '/:id',
    optionalAuth,
    validate(idSchema),
    asyncHandler(async (request, response) => {
      response.json(
        new ApiResponse(
          await service.getById(getRouteParam(request, 'id'), isAdmin(request)),
          'Record retrieved',
        ),
      );
    }),
  );
  router.post(
    '/',
    requireAuth,
    requireRoles('admin', 'staff'),
    asyncHandler(async (request, response) => {
      response.status(201).json(
        new ApiResponse(await service.create(request.body), 'Record created'),
      );
    }),
  );
  router.patch(
    '/:id',
    requireAuth,
    requireRoles('admin', 'staff'),
    validate(idSchema),
    asyncHandler(async (request, response) => {
      response.json(
        new ApiResponse(
          await service.update(getRouteParam(request, 'id'), request.body),
          'Record updated',
        ),
      );
    }),
  );
  router.delete(
    '/:id',
    requireAuth,
    requireRoles('admin'),
    validate(idSchema),
    asyncHandler(async (request, response) => {
      await service.remove(getRouteParam(request, 'id'));
      response.status(204).end();
    }),
  );

  return router;
};
