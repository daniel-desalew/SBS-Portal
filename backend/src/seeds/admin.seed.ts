import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { createId } from '../utils/id';

export const seedAdmin = async (): Promise<void> => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    throw new Error('Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters to seed admin');
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    if (existing.role !== 'admin') {
      throw new Error('ADMIN_EMAIL already belongs to a non-admin account');
    }
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      id: createId(),
      email,
      passwordHash,
      firstName: 'Portal',
      lastName: 'Administrator',
      role: 'admin',
    },
  });
};