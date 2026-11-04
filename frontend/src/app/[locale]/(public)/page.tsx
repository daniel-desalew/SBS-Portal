import { Hero } from '../../../components/home/Hero';
import { StatsBar } from '../../../components/home/StatsBar';
import { ApplyCTA } from '../../../components/home/ApplyCTA';
import type { Locale } from '../../../lib/constants';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="home-page">
      <Hero locale={locale as Locale} />
      <StatsBar />
      <ApplyCTA locale={locale as Locale} />
    </div>
  );
}