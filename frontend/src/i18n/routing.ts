import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '../lib/constants';

export const routing = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always' as const,
};

export const isLocale = (locale: string): locale is Locale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(locale);