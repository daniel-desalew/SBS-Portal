import { prisma } from '../../lib/prisma';
import { ApiError } from '../../utils/ApiError';
import { createId } from '../../utils/id';
import { toJsonInput } from '../../lib/json';

export const getSetting = async (key: string) => {
  const setting = await prisma.setting.findUnique({ where: { key } });
  if (!setting) throw new ApiError(404, 'Setting not found');
  return setting;
};

export const listSettings = () => prisma.setting.findMany({ orderBy: { key: 'asc' } });

export const setSetting = (key: string, value: unknown) =>
  prisma.setting.upsert({
    where: { key },
    create: { id: createId(), key, value: toJsonInput(value) },
    update: { value: toJsonInput(value) },
  });