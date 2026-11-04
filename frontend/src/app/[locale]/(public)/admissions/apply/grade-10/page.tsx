import { PageHeader } from '../../../../../../components/layout/PageHeader';
import { ApplicationForm } from '../../../../../../components/application/ApplicationForm';

export default async function GradeTenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <section className="container"><PageHeader eyebrow="ADMISSIONS" title="Grade 10 application" description="Complete the form below. Your application is not sent until you submit it." /><ApplicationForm grade={10} locale={locale} /></section>;
}