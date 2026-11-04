import { Breadcrumb } from '../../../../../components/layout/Breadcrumb';
import { ApplicationChooser } from '../../../../../components/application/ApplicationChooser';
import type { Locale } from '../../../../../lib/constants';
import { localePath } from '../../../../../lib/utils';

export default async function ApplyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <section className="apply-page">
      <header className="apply-page-banner">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', href: localePath(locale as Locale) },
              { label: 'Admissions', href: localePath(locale as Locale, '/admissions/guide') },
              { label: 'Apply Now' },
            ]}
          />
        </div>
      </header>
      <div className="container apply-content">
        <header className="apply-intro">
          <h1>Choose Your Application</h1>
          <p>
            Select the grade you are applying for. Grade 9 and Grade 10 use separate
            application forms with different academic requirements.
          </p>
        </header>
        <ApplicationChooser locale={locale as Locale} />
        <p className="apply-note">Applications are subject to the published admissions window.</p>
      </div>
    </section>
  );
}