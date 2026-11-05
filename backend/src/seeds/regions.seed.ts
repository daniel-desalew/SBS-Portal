import { prisma } from '../lib/prisma';
import { createId } from '../utils/id';

export const seedRegions = async (): Promise<void> => {
  const regions = [
    'Addis Ababa',
    'Afar',
    'Amhara',
    'Benishangul-Gumuz',
    'Central Ethiopia',
    'Dire Dawa',
    'Gambela',
    'Harari',
    'Oromia',
    'Sidama',
    'Somali',
    'South Ethiopia',
    'South West Ethiopia',
    'Tigray',
  ];
  await prisma.setting.upsert({
    where: { key: 'regions' },
    create: { id: createId(), key: 'regions', value: regions },
    update: {},
  });
};