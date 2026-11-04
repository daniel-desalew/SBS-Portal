import { connectDatabase, disconnectDatabase } from '../config/db';
import logger from '../utils/logger';
import { seedAdmin } from './admin.seed';
import { seedFaqs } from './faq.seed';
import { seedRegions } from './regions.seed';
import { seedSchools } from './schools.seed';

const seed = async (): Promise<void> => {
  await connectDatabase();
  try {
    await seedAdmin();
    await seedRegions();
    await seedSchools();
    await seedFaqs();
    logger.info('Seed data created or already present');
  } finally {
    await disconnectDatabase();
  }
};

void seed().catch((error: unknown) => {
  logger.error('Seeding failed', { error });
  process.exitCode = 1;
});