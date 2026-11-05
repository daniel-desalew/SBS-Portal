import { prisma } from '../../lib/prisma';

export const hasDuplicateApplication = async (
  email: string,
  grade: number,
): Promise<boolean> =>
  Boolean(
    await prisma.application.findFirst({
      where: {
        applicantEmail: email.trim().toLowerCase(),
        grade,
        status: { not: 'rejected' },
      },
      select: { id: true },
    }),
  );