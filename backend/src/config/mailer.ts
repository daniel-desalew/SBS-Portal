import nodemailer from 'nodemailer';
import { env } from './env';

export const mailer =
  env.SMTP_HOST && env.MAIL_FROM
    ? nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_PORT === 465,
        auth:
          env.SMTP_USER && env.SMTP_PASSWORD
            ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD }
            : undefined,
      })
    : null;

export const sendMail = async (
  to: string,
  subject: string,
  html: string,
): Promise<void> => {
  if (!mailer || !env.MAIL_FROM) {
    throw new Error('Email delivery is not configured');
  }
  await mailer.sendMail({ from: env.MAIL_FROM, to, subject, html });
};