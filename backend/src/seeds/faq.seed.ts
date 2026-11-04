import { Faq } from '../models/Faq.model';

export const seedFaqs = async (): Promise<void> => {
  const count = await Faq.estimatedDocumentCount();
  if (count > 0) return;
  await Faq.insertMany([
    {
      question: 'How do I submit an application?',
      answer: 'Create an account, complete the application form, and submit it while admissions are open.',
      category: 'Admissions',
      order: 1,
      published: true,
    },
    {
      question: 'How can I check my application status?',
      answer: 'Use the status page with your reference number and the email address used to apply.',
      category: 'Admissions',
      order: 2,
      published: true,
    },
  ]);
};