import { redis } from '../config/redis';

export const getCachedJson = async <T>(key: string): Promise<T | null> => {
  if (redis.status === 'wait') await redis.connect();
  const value = await redis.get(key);
  return value ? (JSON.parse(value) as T) : null;
};

export const setCachedJson = async (
  key: string,
  value: unknown,
  ttlSeconds = 60,
): Promise<void> => {
  if (redis.status === 'wait') await redis.connect();
  await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
};

export const deleteCached = async (key: string): Promise<void> => {
  if (redis.status === 'wait') await redis.connect();
  await redis.del(key);
};