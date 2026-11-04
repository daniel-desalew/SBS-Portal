import { Breadcrumb } from '../../../../../../components/layout/Breadcrumb';
import { StatusLookup } from '../../../../../../components/status/StatusLookup';
import type { Locale } from '../../../../../../lib/constants';
import { localePath } from '../../../../../../lib/utils';

export default async function StatusPage({
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
          <h1>Check Student Application Status</h1>
          <Breadcrumb
            items={[
              { label: 'Home', href: localePath(currentLocale) },
              {
                label: 'Admissions',
                href: localePath(currentLocale, '/admissions/guide'),
              },
              { label: 'Check Student Status' },
            ]}
          />
        </div>
      </header>
      <div className="container status-page-content">
        <StatusLookup />
      </div>
    </section>
  );
}
