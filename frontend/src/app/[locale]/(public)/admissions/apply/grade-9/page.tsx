import { PageHeader } from '../../../../../../components/layout/PageHeader';
import { ApplicationForm } from '../../../../../../components/application/ApplicationForm';

export default async function GradeNinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <section className="container"><PageHeader eyebrow="ADMISSIONS" title="Grade 9 application" description="Complete the form below. Your application is not sent until you submit it." /><ApplicationForm grade={9} locale={locale} /></section>;
}