import type { Application } from '../../types';

export function ApplicationReview({ application }: { application: Application }) {
  return (
    <section className="panel">
      <h2>Applicant details</h2>
      <dl className="review-list">
        <div><dt>Name</dt><dd>{application.applicant.firstName} {application.applicant.lastName}</dd></div>
        <div><dt>Email</dt><dd>{application.applicant.email}</dd></div><div><dt>Phone</dt><dd>{application.applicant.phone}</dd></div>
        <div><dt>Grade</dt><dd>{application.grade}</dd></div><div><dt>Reference</dt><dd>{application.referenceNumber}</dd></div>
        <div><dt>Status</dt><dd>{application.status}</dd></div>
      </dl>
    </section>
  );
}