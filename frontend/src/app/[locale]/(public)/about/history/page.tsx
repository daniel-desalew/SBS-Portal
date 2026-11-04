import { Breadcrumb } from '../../../../../components/layout/Breadcrumb';
import type { Locale } from '../../../../../lib/constants';
import { localePath } from '../../../../../lib/utils';

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  return (
    <section className="history-page">
      <header className="history-page-banner">
        <div className="container">
          <h1>History</h1>
          <Breadcrumb
            items={[
              { label: 'Home', href: localePath(currentLocale) },
              { label: 'About Us', href: localePath(currentLocale, '/about') },
              { label: 'History' },
            ]}
          />
        </div>
      </header>
      <div className="container history-page-content">
        <article className="panel history-article">
          <h2>Background of Ethiopian Education</h2>
          <p>
            Christian and Islamic religious institutions have served as pillars for literacy
            education for centuries and laid the foundation for modern education in Ethiopia.
          </p>
          <p>
            Ethiopia has a long and proud educational tradition. Today, boarding schools across
            the country continue to expand access to learning and educational opportunity.
          </p>
          <p>
            Modern education in Ethiopia developed over time alongside the country’s longstanding
            religious and community-based learning traditions. Menelik II School, established in
            Addis Ababa in 1908, is recognized as one of the country’s earliest modern schools.
          </p>
          <p>
            Between 1942 and 1974, approximately 2,000 schools, from primary through Grade 12,
            opened across the country. Fourteen colleges and four universities were also
            established. Following Emperor Haile Selassie’s departure and the beginning of the
            Derg period, Tadesse Terefe was appointed the first Minister of Arts and Education.
          </p>
          <p>
            In 1975, the institution’s name changed from the Ministry of Education and Arts to
            the Ministry of Education. During the Derg period, the education system grew to
            include 8,434 primary schools, 275 secondary schools, 17 technical and vocational
            institutions, two universities, and three institutes and colleges, serving about
            2.5 million students.
          </p>
          <p>
            After the Derg government fell in 1991 and a transitional government was established,
            Ibsa Gutema became Minister of Education. Genet Zewde later led the Ministry until
            2006, followed by Sintayehu Woldemichael, Demeke Mekonnen, and Shiferaw Shigute.
            Shiferaw Teklemariam took charge in October 2017.
          </p>
          <p>
            Our mission is to honor this legacy by providing a platform that showcases the history
            and achievements of Ethiopia’s boarding schools and supports access to quality
            education for every child.
          </p>
        </article>
      </div>
    </section>
  );
}
