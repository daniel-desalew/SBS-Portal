import Link from 'next/link';
import { Breadcrumb } from '../../../../../components/layout/Breadcrumb';
import type { Locale } from '../../../../../lib/constants';
import { localePath } from '../../../../../lib/utils';

const processSteps = [
  {
    title: 'Student Information',
    description: 'Complete the initial application form',
    requirementsTitle: 'What you need:',
    requirements: [
      'Personal information',
      'Date of Birth',
      'Grade Applying for',
      'Grade Report Information',
      'Personal Statement',
      'Motivation Statement',
    ],
    icon: 'check',
  },
  {
    title: 'Parent/Guardian Information',
    description: 'Complete the parent information',
    requirementsTitle: 'What you need:',
    requirements: ['Name', 'Email', 'Contacts'],
    icon: 'check',
  },
  {
    title: 'Submit Required Documents',
    description: 'Upload all necessary supporting documents',
    requirementsTitle: 'Required Documents:',
    requirements: [
      'Grade 8 report card (front and back) — all applicants',
      'Grade 6 report card (front and back) — Grade 9 applicants',
      'Grade 9 report card (front and back) — Grade 10 applicants',
      'Grade 8 regional exam average — Grade 10 applicants',
    ],
    icon: 'document',
  },
  {
    title: 'Admission Decision',
    description: 'Receive your admission results',
    requirementsTitle: 'Results Timeline:',
    requirements: [
      'Results announced:',
      'Email notification sent',
      'Results posted online',
      'Acceptance deadline:',
    ],
    icon: 'decision',
  },
];

export default async function AdmissionsGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  return (
    <section className="admissions-process">
      <header className="apply-page-banner">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', href: localePath(currentLocale) },
              {
                label: 'Admissions',
                href: localePath(currentLocale, '/admissions/guide'),
              },
              { label: 'Admission Process' },
            ]}
          />
        </div>
      </header>
      <header className="admissions-process-intro">
        <h1>Admission Process</h1>
        <p>
          Our admission process is designed to be thorough yet straightforward.
          Follow these steps to complete your application and join our Special
          Boarding Schools.
        </p>
      </header>
      <div className="admissions-process-steps">
        {processSteps.map((step, index) => (
          <article
            className={`admissions-process-step${step.icon === 'document' ? ' admissions-process-step--documents' : ''}${step.icon === 'decision' ? ' admissions-process-step--decision' : ''}`}
            key={step.title}
          >
            <div className="admissions-process-step-heading">
              <span className="admissions-process-step-number">{index + 1}</span>
              <div>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
              <span className="admissions-process-required">
                {step.icon === 'decision' ? 'Final Step' : 'Required'}
              </span>
            </div>
            <div className="admissions-process-requirements">
              <h3>{step.requirementsTitle}</h3>
              <ul>
                {step.requirements.map((item, requirementIndex) => (
                  <li
                    className={step.icon === 'decision' ? `admissions-process-timeline-item admissions-process-timeline-item--${requirementIndex}` : undefined}
                    key={item}
                  >
                    {step.icon === 'decision' ? (
                      requirementIndex === 0 ? (
                        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                          <rect x="2" y="3.5" width="12" height="10.5" rx="1" />
                          <path d="M5 2v3M11 2v3M2 6.5h12" />
                        </svg>
                      ) : requirementIndex === 3 ? (
                        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6.25" />
                          <path d="M8 4.5V8l2.5 1.5" />
                        </svg>
                      ) : (
                        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6.25" />
                          <path d="m5 8 2 2 4-4" />
                        </svg>
                      )
                    ) : step.icon === 'check' ? (
                      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.25" />
                        <path d="m5 8 2 2 4-4" />
                      </svg>
                    ) : (
                      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                        <path d="M4 1.75h5l3 3v9.5H4z" />
                        <path d="M9 1.75v3h3M6 8h4M6 10.5h4" />
                      </svg>
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <section className="admissions-process-cta">
        <h2>Ready to Begin?</h2>
        <p>Start your journey.</p>
        <Link
          className="button button-primary"
          href={localePath(currentLocale, '/admissions/apply')}
        >
          Start Application
        </Link>
      </section>
    </section>
  );
}
