import { PageHeader } from '../../../../../../components/layout/PageHeader';
import { ApplicationSlip } from '../../../../../../components/application/ApplicationSlip';

export default async function ApplicationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference } = await searchParams;
  return (
    <section className="container">
      <PageHeader eyebrow="ADMISSIONS" title="Submission complete" description="Your application has been sent to the admissions team." />
      {reference ? <ApplicationSlip referenceNumber={reference} /> : <p className="form-error">No application reference was provided.</p>}
    </section>
  );
}