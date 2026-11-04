import { Footer } from '../../../components/layout/Footer';
import { Navbar } from '../../../components/layout/Navbar';
import { isLocale } from '../../../i18n/routing';
import { notFound } from 'next/navigation';

export default async function PublicLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div className="public-shell">
      <Navbar locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}