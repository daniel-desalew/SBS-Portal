import { Breadcrumb } from '../../../../../components/layout/Breadcrumb';
import type { Locale } from '../../../../../lib/constants';
import { localePath } from '../../../../../lib/utils';

export default async function MissionVisionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  return (
    <section className="mission-vision-page">
      <header className="mission-vision-banner">
        <div className="container">
          <h1>Mission &amp; Vision</h1>
          <Breadcrumb
            items={[
              { label: 'Home', href: localePath(currentLocale) },
              { label: 'About Us', href: localePath(currentLocale, '/about') },
              { label: 'Mission & Vision' },
            ]}
          />
        </div>
      </header>
      <div className="container mission-vision-content">
        <div className="card-grid two">
          <article className="panel mission-vision-card mission-card">
            <header>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1" />
              </svg>
              <h2>Our Mission</h2>
            </header>
            <p>
              Ensuring effective, quality and equitable education and training system through
              building the implementation capacity of the education sector at all levels,
              designing and regulating standards of efficiency, expanding standardized education
              throughout the country, as well as complementing and leveraging education sector
              development interventions with strategic communications and public awareness.
            </p>
          </article>
          <article className="panel mission-vision-card vision-card">
            <header>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M2.5 12s3.4-7 9.5-7 9.5 7 9.5 7-3.4 7-9.5 7-9.5-7-9.5-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <h2>Our Vision</h2>
            </header>
            <p>
              Sustainably building an education and training system that ensures quality and
              equitable education for all citizens and that continuously produces a competent
              and competitive workforce fueling the country’s economic development.
            </p>
          </article>
        </div>
        <section className="mission-values">
          <h2>Values</h2>
          <ol className="panel mission-values-list">
            <li>Effectiveness and efficiency</li>
            <li>Fairness</li>
            <li>Accountability</li>
            <li>Participatory</li>
            <li>Servanthood</li>
            <li>Excellence</li>
          </ol>
        </section>
      </div>
    </section>
  );
}
