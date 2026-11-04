import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '../../lib/constants';
import { localePath } from '../../lib/utils';

export async function ApplyCTA({ locale }: { locale: Locale }) {
  const t = await getTranslations('Home');

  return (
    <section className="home-apply">
      <div className="cta-panel">
        <div>
          <h2>{t('applyCtaTitle')}</h2>
          <p>{t('applyCtaDescription')}</p>
        </div>
        <Link className="button button-light" href={localePath(locale, '/admissions/apply')}>
          {t('applyCtaButton')}
        </Link>
      </div>
    </section>
  );
}