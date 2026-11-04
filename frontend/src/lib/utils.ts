import type { Locale } from './constants';

export const localePath = (locale: Locale, path = '') =>
  `/${locale}${path.startsWith('/') || path === '' ? path : `/${path}`}`;

export const formatDate = (value: string | Date, locale = 'en') =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(value));

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Something went wrong. Please try again.';