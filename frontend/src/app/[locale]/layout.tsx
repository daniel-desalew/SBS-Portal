import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Providers } from '../../components/providers';
import ErrorBoundary from '../../components/shared/ErrorBoundary';
import { isLocale, routing } from '../../i18n/routing';

export const metadata: Metadata = {
  title: 'SBS Portal',
  description: 'SBS education, programs, and admissions portal.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <Providers><ErrorBoundary>{children}</ErrorBoundary></Providers>
    </NextIntlClientProvider>
  );
}