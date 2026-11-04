import type { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import * as authService from './auth.service';

export const register = asyncHandler(async (request: Request, response: Response) => {
  const session = await authService.register(request.body);
  response.status(201).json(new ApiResponse(session, 'Account created'));
});

export const login = asyncHandler(async (request: Request, response: Response) => {
  const session = await authService.login(request.body.email, request.body.password);
  response.json(new ApiResponse(session, 'Signed in'));
});

export const refresh = asyncHandler(async (request: Request, response: Response) => {
  const session = await authService.rotateRefreshToken(request.body.refreshToken);
  response.json(new ApiResponse(session, 'Session refreshed'));
});

export const logout = asyncHandler(async (request: Request, response: Response) => {
  await authService.revokeRefreshToken(request.body.refreshToken);
  response.json(new ApiResponse(null, 'Signed out'));
});