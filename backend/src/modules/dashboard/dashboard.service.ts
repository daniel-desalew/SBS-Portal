import { prisma } from '../../lib/prisma';

export const getDashboardSummary = async () => {
  const [applications, openApplications, complaints, users, messages] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { status: { in: ['submitted', 'under_review'] } } }),
    prisma.complaint.count({ where: { status: { in: ['open', 'in_progress'] } } }),
    prisma.user.count({ where: { isActive: true } }),
    prisma.contact.count({ where: { status: 'new' } }),
  ]);
  return { applications, openApplications, complaints, activeUsers: users, unreadMessages: messages };
};