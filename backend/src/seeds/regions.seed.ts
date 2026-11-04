import { Setting } from '../models/Setting.model';

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
  await Setting.updateOne(
    { key: 'regions' },
    { $setOnInsert: { value: regions } },
    { upsert: true },
  );
};