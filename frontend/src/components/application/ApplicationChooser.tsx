import Link from 'next/link';
import { Card } from '../ui/card';
import type { Locale } from '../../lib/constants';
import { localePath } from '../../lib/utils';

export function ApplicationChooser({ locale }: { locale: Locale }) {
  return (
    <div className="card-grid two">
      {[9, 10].map((grade) => (
        <Card key={grade} className="choice-card apply-choice-card">
          <span className="apply-choice-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="m2 9 10-5 10 5-10 5L2 9Z" />
              <path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6" />
            </svg>
          </span>
          <h2>Grade {grade} Application</h2>
          <p>
            Start a new application for Grade {grade}. You can review your details
            before submitting.
          </p>
          <Link className="button button-primary apply-choice-button" href={localePath(locale, `/admissions/apply/grade-${grade}`)}>
            Apply for Grade {grade}
          </Link>
        </Card>
      ))}
    </div>
  );
}