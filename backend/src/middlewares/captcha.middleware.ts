import type { RequestHandler } from 'express';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

export const verifyCaptcha: RequestHandler = async (request, _response, next) => {
  if (!env.CAPTCHA_ENABLED) {
    next();
    return;
  }

  const token = request.body?.captchaToken;
  if (typeof token !== 'string' || !token || !env.CAPTCHA_SECRET) {
    next(new ApiError(400, 'CAPTCHA verification is required'));
    return;
  }

  try {
    const form = new URLSearchParams({ secret: env.CAPTCHA_SECRET, response: token });
    const result = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
    });
    if (!result.ok) throw new Error(`CAPTCHA provider returned HTTP ${result.status}`);
    const verification = (await result.json()) as { success?: boolean };
    if (!verification.success) {
      next(new ApiError(400, 'CAPTCHA verification failed'));
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};