import { prisma } from '../lib/prisma';
import { createId } from '../utils/id';

export const seedSchools = async (): Promise<void> => {
  const count = await prisma.school.count();
  if (count > 0) return;
  await prisma.school.create({
    data: { id: createId(), name: 'Example Secondary School', region: 'Addis Ababa', isActive: true },
  });
};