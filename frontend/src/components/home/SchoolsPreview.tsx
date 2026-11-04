import Link from 'next/link';
import type { Locale } from '../../lib/constants';
import { localePath } from '../../lib/utils';
import { Card } from '../ui/card';

const regions = ['Addis Ababa', 'Amhara', 'Oromia', 'Sidama'];

export function SchoolsPreview({ locale }: { locale: Locale }) {
  return (
    <section className="section home-schools">
      <div className="container">
        <div className="section-heading home-schools-heading">
          <div>
            <p className="eyebrow">FIND YOUR NEXT STEP</p>
            <h2>Explore learning across Ethiopia</h2>
            <p className="home-schools-intro">Discover schools, programs, and admissions information in one place.</p>
          </div>
          <Link className="home-program-link" href={localePath(locale, '/programs')}>Explore programs <span aria-hidden="true">→</span></Link>
        </div>
        <div className="card-grid four">
          {regions.map((region, index) => (
            <Card key={region} className="region-card">
              <span className={`home-region-icon home-region-icon-${index + 1}`} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 10.5 12 4l9 6.5M5.5 9.5V20h13V9.5M9 20v-6h6v6" />
                </svg>
              </span>
              <span className="region-index">REGION 0{index + 1}</span>
              <h3>{region}</h3>
              <span className="home-region-arrow" aria-hidden="true">↗</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}