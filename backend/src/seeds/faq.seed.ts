import { prisma } from '../lib/prisma';
import { createId } from '../utils/id';

export const seedFaqs = async (): Promise<void> => {
  const count = await prisma.faq.count();
  if (count > 0) return;
  await prisma.faq.createMany({ data: [
    {
      id: createId(),
      question: 'How do I submit an application?',
      answer: 'Create an account, complete the application form, and submit it while admissions are open.',
      category: 'Admissions',
      order: 1,
      published: true,
    },
    {
      id: createId(),
      question: 'How can I check my application status?',
      answer: 'Use the status page with your reference number and the email address used to apply.',
      category: 'Admissions',
      order: 2,
      published: true,
    },
  ] });
};