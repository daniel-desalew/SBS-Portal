import { School } from '../models/School.model';

export const seedSchools = async (): Promise<void> => {
  const count = await School.estimatedDocumentCount();
  if (count > 0) return;
  await School.insertMany([
    { name: 'Example Secondary School', region: 'Addis Ababa', isActive: true },
  ]);
};