import 'dotenv/config';
import mongoose from 'mongoose';
import { Prisma, PrismaClient, UserRole } from '@prisma/client';
import { toJsonInput } from '../src/lib/json';

type MongoRecord = Record<string, unknown> & { _id: unknown };
type Migration = {
  collection: string;
  insert: (records: MongoRecord[]) => Promise<{ count: number }>;
  destinationCount: () => Promise<number>;
};

const prisma = new PrismaClient();
const mongoUri = process.env.MONGO_MIGRATION_URI ?? process.env.MONGODB_URI;

const requiredString = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || value.length === 0) {
    throw new TypeError(`MongoDB migration record has no valid ${field}`);
  }
  return value;
};

const optionalString = (value: unknown): string | null =>
  typeof value === 'string' ? value : null;

const mongoId = (value: unknown): string => {
  const id =
    value && typeof value === 'object' && 'toHexString' in value &&
    typeof value.toHexString === 'function'
      ? value.toHexString()
      : String(value);
  if (!/^[a-f\d]{24}$/i.test(id)) {
    throw new TypeError(`MongoDB migration encountered an unsupported id in collection: ${id}`);
  }
  return id;
};

const recordId = (record: MongoRecord): string => mongoId(record._id);
const recordDate = (value: unknown): Date =>
  value instanceof Date ? value : new Date(String(value));
const createdAt = (record: MongoRecord): Date =>
  recordDate(record.createdAt ?? new Date());
const updatedAt = (record: MongoRecord): Date =>
  recordDate(record.updatedAt ?? record.createdAt ?? new Date());
const numberArray = (value: unknown, fallback: number[] = []): number[] =>
  Array.isArray(value) ? value.map(Number) : fallback;
const userRole = (value: unknown): UserRole => {
  if (value === 'admin' || value === 'staff' || value === 'applicant') return value;
  throw new TypeError('MongoDB migration encountered an unsupported user role');
};

const migrations: Migration[] = [
  {
    collection: 'users',
    destinationCount: () => prisma.user.count(),
    insert: (records) => prisma.user.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        email: requiredString(record.email, 'user.email'),
        passwordHash: requiredString(record.passwordHash, 'user.passwordHash'),
        firstName: requiredString(record.firstName, 'user.firstName'),
        lastName: requiredString(record.lastName, 'user.lastName'),
        role: userRole(record.role),
        isActive: record.isActive !== false,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'applications',
    destinationCount: () => prisma.application.count(),
    insert: (records) => prisma.application.createMany({
      data: records.map((record) => {
        const applicant = record.applicant as Record<string, unknown> | undefined;
        if (!applicant) throw new TypeError('Application is missing applicant data');
        return {
          id: recordId(record),
          referenceNumber: requiredString(record.referenceNumber, 'application.referenceNumber'),
          grade: Number(record.grade),
          applicant: toJsonInput(applicant),
          applicantEmail: requiredString(applicant.email, 'application.applicant.email').toLowerCase(),
          academic: toJsonInput(record.academic ?? {}),
          guardian: toJsonInput(record.guardian ?? {}),
          documents: toJsonInput(record.documents ?? []),
          status: typeof record.status === 'string' ? record.status : 'submitted',
          submittedBy: record.submittedBy ? mongoId(record.submittedBy) : null,
          createdAt: createdAt(record),
          updatedAt: updatedAt(record),
        };
      }),
    }),
  },
  {
    collection: 'auditlogs',
    destinationCount: () => prisma.auditLog.count(),
    insert: (records) => prisma.auditLog.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        actor: record.actor ? mongoId(record.actor) : null,
        action: requiredString(record.action, 'audit.action'),
        resource: requiredString(record.resource, 'audit.resource'),
        resourceId: optionalString(record.resourceId),
        ip: optionalString(record.ip),
        metadata: record.metadata == null ? Prisma.DbNull : toJsonInput(record.metadata),
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'complaints',
    destinationCount: () => prisma.complaint.count(),
    insert: (records) => prisma.complaint.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        referenceNumber: requiredString(record.referenceNumber, 'complaint.referenceNumber'),
        email: requiredString(record.email, 'complaint.email'),
        subject: requiredString(record.subject, 'complaint.subject'),
        message: requiredString(record.message, 'complaint.message'),
        status: typeof record.status === 'string' ? record.status : 'open',
        response: optionalString(record.response),
        application: record.application ? mongoId(record.application) : null,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'contacts',
    destinationCount: () => prisma.contact.count(),
    insert: (records) => prisma.contact.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        name: requiredString(record.name, 'contact.name'),
        email: requiredString(record.email, 'contact.email'),
        subject: requiredString(record.subject, 'contact.subject'),
        message: requiredString(record.message, 'contact.message'),
        status: typeof record.status === 'string' ? record.status : 'new',
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'faqs',
    destinationCount: () => prisma.faq.count(),
    insert: (records) => prisma.faq.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        question: requiredString(record.question, 'faq.question'),
        answer: requiredString(record.answer, 'faq.answer'),
        category: typeof record.category === 'string' ? record.category : 'General',
        order: Number(record.order ?? 0),
        published: record.published !== false,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'galleries',
    destinationCount: () => prisma.gallery.count(),
    insert: (records) => prisma.gallery.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        title: requiredString(record.title, 'gallery.title'),
        imageUrl: requiredString(record.imageUrl, 'gallery.imageUrl'),
        altText: requiredString(record.altText, 'gallery.altText'),
        published: record.published === true,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'jobs',
    destinationCount: () => prisma.job.count(),
    insert: (records) => prisma.job.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        title: requiredString(record.title, 'job.title'),
        description: requiredString(record.description, 'job.description'),
        location: requiredString(record.location, 'job.location'),
        deadline: recordDate(record.deadline),
        published: record.published === true,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'jobapplications',
    destinationCount: () => prisma.jobApplication.count(),
    insert: (records) => prisma.jobApplication.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        job: mongoId(record.job),
        name: requiredString(record.name, 'job application.name'),
        email: requiredString(record.email, 'job application.email'),
        phone: requiredString(record.phone, 'job application.phone'),
        resumeUrl: requiredString(record.resumeUrl, 'job application.resumeUrl'),
        status: typeof record.status === 'string' ? record.status : 'received',
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'news',
    destinationCount: () => prisma.news.count(),
    insert: (records) => prisma.news.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        title: requiredString(record.title, 'news.title'),
        slug: requiredString(record.slug, 'news.slug'),
        summary: requiredString(record.summary, 'news.summary'),
        body: requiredString(record.body, 'news.body'),
        publishedAt: record.publishedAt ? recordDate(record.publishedAt) : null,
        published: record.published === true,
        author: record.author ? mongoId(record.author) : null,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'notifications',
    destinationCount: () => prisma.notification.count(),
    insert: (records) => prisma.notification.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        user: mongoId(record.user),
        title: requiredString(record.title, 'notification.title'),
        message: requiredString(record.message, 'notification.message'),
        readAt: record.readAt ? recordDate(record.readAt) : null,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'programs',
    destinationCount: () => prisma.program.count(),
    insert: (records) => prisma.program.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        title: requiredString(record.title, 'program.title'),
        description: requiredString(record.description, 'program.description'),
        grade: numberArray(record.grade, [9, 10]),
        isActive: record.isActive !== false,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'refreshtokens',
    destinationCount: () => prisma.refreshToken.count(),
    insert: (records) => prisma.refreshToken.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        userId: mongoId(record.userId),
        tokenHash: requiredString(record.tokenHash, 'refresh token.tokenHash'),
        expiresAt: recordDate(record.expiresAt),
        revokedAt: record.revokedAt ? recordDate(record.revokedAt) : null,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'resources',
    destinationCount: () => prisma.resource.count(),
    insert: (records) => prisma.resource.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        title: requiredString(record.title, 'resource.title'),
        description: requiredString(record.description, 'resource.description'),
        url: requiredString(record.url, 'resource.url'),
        category: requiredString(record.category, 'resource.category'),
        published: record.published === true,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'schools',
    destinationCount: () => prisma.school.count(),
    insert: (records) => prisma.school.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        name: requiredString(record.name, 'school.name'),
        region: requiredString(record.region, 'school.region'),
        address: optionalString(record.address),
        phone: optionalString(record.phone),
        email: optionalString(record.email),
        isActive: record.isActive !== false,
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
  {
    collection: 'settings',
    destinationCount: () => prisma.setting.count(),
    insert: (records) => prisma.setting.createMany({
      data: records.map((record) => ({
        id: recordId(record),
        key: requiredString(record.key, 'setting.key'),
        value: toJsonInput(record.value),
        createdAt: createdAt(record),
        updatedAt: updatedAt(record),
      })),
    }),
  },
];

const migrate = async (): Promise<void> => {
  if (!mongoUri) {
    throw new Error('Set MONGO_MIGRATION_URI to the current local MongoDB connection');
  }
  if (!process.env.DATABASE_URL) {
    throw new Error('Set DATABASE_URL to the rotated Neon PostgreSQL connection');
  }

  await mongoose.connect(mongoUri);
  const source = mongoose.connection.db;
  if (!source) throw new Error('Could not access the configured MongoDB database');
  await prisma.$connect();

  try {
    const populatedTables = (await Promise.all(
      migrations.map(async ({ collection, destinationCount }) => ({
        collection,
        count: await destinationCount(),
      })),
    )).filter(({ count }) => count > 0);
    if (populatedTables.length) {
      throw new Error(
        `Neon destination tables must be empty before migration; found existing records in: ${populatedTables
          .map(({ collection, count }) => `${collection} (${count})`)
          .join(', ')}`,
      );
    }

    for (const migration of migrations) {
      const sourceRecords = (await source
        .collection(migration.collection)
        .find({})
        .toArray()) as MongoRecord[];

      for (let index = 0; index < sourceRecords.length; index += 500) {
        await migration.insert(sourceRecords.slice(index, index + 500));
      }

      const destinationCount = await migration.destinationCount();
      if (destinationCount !== sourceRecords.length) {
        throw new Error(
          `Migration verification failed for ${migration.collection}: source ${sourceRecords.length}, destination ${destinationCount}`,
        );
      }
      console.log(`${migration.collection}: verified ${destinationCount} records`);
    }
    console.log('MongoDB to Neon migration completed and verified.');
  } finally {
    await prisma.$disconnect();
    await mongoose.disconnect();
  }
};

void migrate().catch((error: unknown) => {
  console.error('MongoDB to Neon migration failed:', error);
  process.exitCode = 1;
});
