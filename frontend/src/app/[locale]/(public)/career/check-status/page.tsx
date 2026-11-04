import { Breadcrumb } from '../../../../../components/layout/Breadcrumb';
import { CareerStatusLookup } from '../../../../../components/career/CareerStatusLookup';
import type { Locale } from '../../../../../lib/constants';
import { localePath } from '../../../../../lib/utils';

export default async function CareerStatusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  return (
    <section className="status-page">
      <header className="status-page-banner">
        <div className="container">
          <h1>Check Teacher Application Status</h1>
          <Breadcrumb
            items={[
              { label: 'Home', href: localePath(currentLocale) },
              { label: 'Career', href: localePath(currentLocale, '/career') },
              { label: 'Check Status' },
            ]}
          />
        </div>
      </header>
      <div className="container status-page-content">
        <div className="status-grid career-status-grid">
          <CareerStatusLookup />
        </div>
      </div>
    </section>
  );
}
