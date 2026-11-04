import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import type { UserRole } from '../utils/constants';
import { addDays } from '../utils/dateUtils';

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export const signAccessToken = (payload: AccessTokenPayload): string =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL as jwt.SignOptions['expiresIn'] });

export const verifyAccessToken = (token: string): AccessTokenPayload =>
  jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;

export const createRefreshToken = (): string => crypto.randomBytes(48).toString('base64url');

export const hashToken = (token: string): string =>
  crypto.createHash('sha256').update(token).digest('hex');

export const refreshTokenExpiry = (): Date => addDays(new Date(), env.REFRESH_TOKEN_DAYS);