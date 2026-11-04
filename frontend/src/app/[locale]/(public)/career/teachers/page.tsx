import Link from 'next/link';
import { Breadcrumb } from '../../../../../components/layout/Breadcrumb';
import type { Locale } from '../../../../../lib/constants';
import { localePath } from '../../../../../lib/utils';

const teacherSections: Array<{
  title: string;
  titleAm: string;
  icon: 'info' | 'calendar';
  items: string[];
  itemsAm: string[];
  subheading?: string;
  subheadingAm?: string;
  additionalItems?: string[];
  additionalItemsAm?: string[];
}> = [
  {
    title: 'Qualifications and Responsibilities',
    titleAm: 'አጠቃላይ ብቃት / የተጠየቁ ነጥቦች',
    icon: 'info',
    items: [
      'Review the published vacancy announcement for the required education, subject specialization, and experience.',
      'Prepare to support students’ academic progress and contribute to a positive learning environment.',
      'Share relevant teaching experience, professional training, and qualifications in your application.',
      'Provide accurate information and ensure all submitted documents are current and complete.',
    ],
    itemsAm: [
      'በታተመው የሥራ ማስታወቂያ ውስጥ የተጠየቁትን የትምህርት ደረጃ፣ የትምህርት ዘርፍ እና የሥራ ልምድ መስፈርቶች ይመልከቱ።',
      'የተማሪዎችን የትምህርት እድገት ለማገዝ እና ጥሩ የመማር አካባቢ ለመፍጠር ዝግጁ ይሁኑ።',
      'ተዛማጅ የማስተማር ልምድዎን፣ ሙያዊ ስልጠናዎን እና ብቃቶችዎን በማመልከቻዎ ውስጥ ያካትቱ።',
      'ትክክለኛ መረጃ ያቅርቡ፤ የሚያስገቡት ሰነዶች ወቅታዊና የተሟሉ መሆናቸውን ያረጋግጡ።',
    ],
  },
  {
    title: 'Application Details',
    titleAm: 'የማመልከቻ ቀን የሚመለከቱ መረጃዎች',
    icon: 'calendar',
    items: [
      'Check the vacancy announcement for the application opening and closing dates.',
      'Follow the instructions in the announcement to submit your application.',
    ],
    itemsAm: [
      'የማመልከቻ መጀመሪያና ማብቂያ ቀናትን በሥራ ማስታወቂያው ውስጥ ይመልከቱ።',
      'ማመልከቻዎን ለማስገባት በማስታወቂያው የተሰጡትን መመሪያዎች ይከተሉ።',
    ],
    subheading: 'What to prepare',
    subheadingAm: 'የሚፈለጉ ሰነዶች',
    additionalItems: [
      'An up-to-date CV and contact information.',
      'Copies of relevant educational certificates and supporting documents.',
      'Details of professional references, if requested in the announcement.',
    ],
    additionalItemsAm: [
      'የቅርብ ጊዜ የሥራ ልምድ ዝርዝር (CV) እና የመገኛ አድራሻ።',
      'ተዛማጅ የትምህርት ማስረጃዎችና ደጋፊ ሰነዶች ቅጂዎች።',
      'በማስታወቂያው ከተጠየቀ የሙያ ማጣቀሻ መረጃ።',
    ],
  },
];

function SectionIcon({ type }: { type: 'info' | 'calendar' }) {
  return type === 'info' ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function TeacherPositionApplications({ locale }: { locale: Locale }) {
  const isAmharic = locale === 'am';

  return (
    <article className="panel teacher-application-panel">
      <header className="teacher-application-heading">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="m2 9 10-5 10 5-10 5L2 9Z" />
          <path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6" />
        </svg>
        <h2>Teacher Position Applications</h2>
      </header>
      <div className="teacher-application-columns">
        {teacherSections.map((section) => (
          <section className="teacher-application-section" key={section.title}>
            <h3>
              <SectionIcon type={section.icon} />
              {isAmharic ? section.titleAm : section.title}
            </h3>
            <ul>
              {section.items.map((item, index) => (
                <li key={item}>
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.25" />
                    <path d="m5 8 2 2 4-4" />
                  </svg>
                  {isAmharic ? section.itemsAm[index] : item}
                </li>
              ))}
            </ul>
            {section.subheading && (
              <div className="teacher-application-subsection">
                <h4>{isAmharic ? section.subheadingAm : section.subheading}</h4>
                <ul>
                  {section.additionalItems?.map((item, index) => (
                    <li key={item}>
                      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.25" />
                        <path d="m5 8 2 2 4-4" />
                      </svg>
                      {isAmharic ? section.additionalItemsAm?.[index] : item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

export default async function TeachersCareerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  return (
    <section className="teacher-careers">
      <header className="teacher-careers-banner">
        <div className="container">
          <h1>Teacher Applications</h1>
          <Breadcrumb
            items={[
              { label: 'Home', href: localePath(currentLocale) },
              { label: 'Teachers' },
            ]}
          />
        </div>
      </header>
      <div className="container teacher-careers-content">
        <TeacherPositionApplications locale={currentLocale} />
        <p className="teacher-applications-closed" role="status">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M12 3 2.8 19a1.3 1.3 0 0 0 1.1 2h16.2a1.3 1.3 0 0 0 1.1-2L12 3Z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
          <span>
            <strong>Applications are currently closed.</strong> The deadline has passed and we
            are no longer accepting new applications.
          </span>
        </p>
        <div className="teacher-action-cards">
          <article className="panel teacher-action-card">
            <span className="teacher-action-icon teacher-action-icon--apply" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                <path d="M14 3v5h5M8 13h8M8 17h6M8 9h1" />
              </svg>
            </span>
            <h2>Apply for Teacher Position</h2>
            <p>Submit your application to become a teacher at one of our special boarding schools.</p>
            <button className="button button-primary teacher-apply-closed" disabled>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                <path d="M14 3v5h5M8 13h8M8 17h5" />
              </svg>
              Applications Closed
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M14 5h5v5M19 5l-8 8" />
                <path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
              </svg>
            </button>
            <p className="teacher-action-note">Applications are no longer being accepted.</p>
          </article>
          <article className="panel teacher-action-card">
            <span className="teacher-action-icon teacher-action-icon--status" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 2.5 2.5L17 8" />
              </svg>
            </span>
            <h2>Check Application Status</h2>
            <p>Track the progress of your submitted application and view updates.</p>
            <Link
              className="button teacher-status-button"
              href={localePath(currentLocale, '/career/check-status')}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 2.5 2.5L17 8" />
              </svg>
              Check Status
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M14 5h5v5M19 5l-8 8" />
                <path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
              </svg>
            </Link>
          </article>
        </div>
        <section className="panel teacher-important-information">
          <h2>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5M12 8h.01" />
            </svg>
            Important Information
          </h2>
          <ul>
            <li>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>
                <strong>Deadline Notice:</strong> Applications must be submitted before the
                deadline. Late submissions will not be considered.
              </span>
            </li>
            <li>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                <path d="M14 3v5h5M8 13h8M8 17h8" />
              </svg>
              <span>
                <strong>Document Requirements:</strong> Please ensure all required documents
                are uploaded in the correct format (PDF, JPG, or PNG) and are clearly readable.
              </span>
            </li>
            <li>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 2.5 2.5L17 8" />
              </svg>
              <span>
                <strong>Application Review:</strong> All applications will be reviewed by our
                selection committee. Shortlisted candidates will be contacted for assessments
                and interviews.
              </span>
            </li>
          </ul>
        </section>
        <section className="panel teacher-help-panel">
          <h2>Need Help?</h2>
          <div className="teacher-help-content">
            <div>
              <p>Support Available</p>
              <span>Contact us for assistance with your teacher application.</span>
            </div>
            <Link
              className="button button-primary teacher-help-button"
              href={localePath(currentLocale, '/contact')}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M4 5h16v12H9l-5 4V5Z" />
                <path d="M8 9h8M8 13h5" />
              </svg>
              Contact Support
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
