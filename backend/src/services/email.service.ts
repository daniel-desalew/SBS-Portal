import { sendMail } from '../config/mailer';

export const sendTransactionalEmail = async (
  recipient: string,
  subject: string,
  html: string,
): Promise<void> => sendMail(recipient, subject, html);