import { randomBytes } from 'node:crypto';

export const createId = (): string => randomBytes(12).toString('hex');
