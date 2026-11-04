import type { RequestHandler } from 'express';
import { Setting } from '../models/Setting.model';
import { ApiError } from '../utils/ApiError';

export const requireOpenApplicationWindow: RequestHandler = async (_request, _response, next) => {
  try {
    const setting = await Setting.findOne({ key: 'applicationWindow' }).lean();
    if (!setting || typeof setting.value !== 'object' || setting.value === null) {
      next(new ApiError(503, 'Application window has not been configured'));
      return;
    }
    const window = setting.value as { opensAt?: string; closesAt?: string; enabled?: boolean };
    const now = Date.now();
    const opensAt = window.opensAt ? Date.parse(window.opensAt) : Number.NaN;
    const closesAt = window.closesAt ? Date.parse(window.closesAt) : Number.NaN;
    if (
      window.enabled !== true ||
      !Number.isFinite(opensAt) ||
      !Number.isFinite(closesAt) ||
      now < opensAt ||
      now > closesAt
    ) {
      next(new ApiError(403, 'Applications are currently closed'));
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};