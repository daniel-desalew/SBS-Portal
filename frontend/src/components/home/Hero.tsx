import { getTranslations } from 'next-intl/server';
import type { Locale } from '../../lib/constants';
import { localePath } from '../../lib/utils';
import { HeroCarousel } from './HeroCarousel';

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations('Home');

  return (
    <HeroCarousel
      applyHref={localePath(locale, '/admissions/apply')}
      applyLabel={t('apply')}
      slides={[
        {
          title: t('slideOneTitle'),
          description: t('slideOneDescription'),
          scene: 'classroom',
          align: 'left',
        },
        {
          title: t('slideTwoTitle'),
          description: t('slideTwoDescription'),
          scene: 'community',
          align: 'right',
        },
        {
          title: t('slideThreeTitle'),
          description: t('slideThreeDescription'),
          scene: 'future',
          align: 'right',
        },
      ]}
    />
  );
}
