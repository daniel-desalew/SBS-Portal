'use client';

export function ApplicationSlip({
  referenceNumber,
  applicantName,
  grade,
}: {
  referenceNumber: string;
  applicantName?: string;
  grade?: string;
}) {
  return (
    <section className="panel application-slip">
      <p className="eyebrow">SUBMISSION RECEIPT</p>
      <h2>Application received</h2>
      {applicantName && <p>Applicant: {applicantName}</p>}
      {grade && <p>Grade: {grade}</p>}
      <p>Reference number</p>
      <strong className="reference-number">{referenceNumber}</strong>
      <p className="muted">Keep this number to check your application status.</p>
      <button className="button button-secondary" onClick={() => window.print()}>Print receipt</button>
    </section>
  );
}