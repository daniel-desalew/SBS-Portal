import { PageHeader } from '../../../../components/layout/PageHeader';
import Link from 'next/link';
import type { Locale } from '../../../../lib/constants';
import { localePath } from '../../../../lib/utils';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  return (
    <section className="container">
      <PageHeader eyebrow="ABOUT SBS" title="Learning opens doors" description="We connect learners, families, schools, and educators through accessible information and clear admissions services." />
      <div className="card-grid two section-content">
        <article className="panel"><h2>Our purpose</h2><p>Support students as they discover new opportunities and build a strong foundation for their future.</p></article>
        <article className="panel"><h2>Our community</h2><p>Bring together schools, families, and regional partners with helpful resources and transparent services.</p></article>
        <article className="panel">
          <h2>Our history</h2>
          <p>Explore the history and traditions that have shaped education in Ethiopia.</p>
          <Link className="text-link" href={localePath(currentLocale, '/about/history')}>Read our history →</Link>
        </article>
        <article className="panel">
          <h2>Mission &amp; Vision</h2>
          <p>Learn about the Ministry’s mission and vision for education and training in Ethiopia.</p>
          <Link className="text-link" href={localePath(currentLocale, '/about/mission-vision')}>Read our mission and vision →</Link>
        </article>
      </div>
    </section>
  );
}