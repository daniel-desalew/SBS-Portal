'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ABOUT_NAVIGATION,
  ADMISSION_NAVIGATION,
  CAREER_NAVIGATION,
  GALLERY_NAVIGATION,
  NEWS_NAVIGATION,
  PROGRAM_NAVIGATION,
  PUBLIC_NAVIGATION,
  RESOURCE_NAVIGATION,
  type Locale,
} from '../../lib/constants';
import { localePath } from '../../lib/utils';

export function MobileMenu({ locale }: { locale: Locale }) {
  const t = useTranslations('Navigation');
  const keyByLabel: Record<string, string> = {
    Home: 'home',
    Programs: 'programs',
    Admissions: 'admissions',
    Resources: 'resources',
    Career: 'career',
    News: 'news',
    Gallery: 'gallery',
    'About Us': 'aboutUs',
  };

  return (
    <details className="mobile-menu container">
      <summary>Menu</summary>
      <nav aria-label="Mobile navigation">
        {PUBLIC_NAVIGATION.map((item) => item.label === 'Programs' ? (
          <details className="mobile-submenu" key={item.href}>
            <summary>{t('programs')}</summary>
            <div>
              {PROGRAM_NAVIGATION.map((program) => (
                <Link href={localePath(locale, item.href)} key={program.key}>
                  {t(program.key)}
                </Link>
              ))}
            </div>
          </details>
        ) : item.label === 'Career' ? (
          <details className="mobile-submenu" key={item.href}>
            <summary>{t('career')}</summary>
            <div>
              {CAREER_NAVIGATION.map((career) => (
                <Link
                  href={localePath(locale, career.href)}
                  key={career.label}
                >
                  {career.label}
                </Link>
              ))}
            </div>
          </details>
        ) : item.label === 'Admissions' ? (
          <details className="mobile-submenu" key={item.href}>
            <summary>{t('admissions')}</summary>
            <div>
              {ADMISSION_NAVIGATION.map((admission) => (
                <Link
                  href={localePath(locale, admission.href)}
                  key={admission.key}
                >
                  {t(admission.key)}
                </Link>
              ))}
            </div>
          </details>
        ) : item.label === 'Resources' ? (
          <details className="mobile-submenu" key={item.href}>
            <summary>{t('resources')}</summary>
            <div>
              {RESOURCE_NAVIGATION.map((resource) => (
                <Link
                  href={localePath(locale, resource.href)}
                  key={resource.key}
                >
                  {t(resource.key)}
                </Link>
              ))}
            </div>
          </details>
        ) : item.label === 'News' ? (
          <details className="mobile-submenu" key={item.href}>
            <summary>{t('news')}</summary>
            <div>
              {NEWS_NAVIGATION.map((newsItem) => (
                <Link
                  href={localePath(locale, newsItem.href)}
                  key={newsItem.label}
                >
                  {newsItem.label}
                </Link>
              ))}
            </div>
          </details>
        ) : item.label === 'Gallery' ? (
          <details className="mobile-submenu" key={item.href}>
            <summary>{t('gallery')}</summary>
            <div>
              {GALLERY_NAVIGATION.map((galleryItem) => (
                <Link
                  href={localePath(locale, galleryItem.href)}
                  key={galleryItem.label}
                >
                  {galleryItem.label}
                </Link>
              ))}
            </div>
          </details>
        ) : item.label === 'About Us' ? (
          <details className="mobile-submenu" key={item.href}>
            <summary>{t('aboutUs')}</summary>
            <div>
              {ABOUT_NAVIGATION.map((aboutItem) => (
                <Link
                  href={localePath(locale, aboutItem.href)}
                  key={aboutItem.label}
                >
                  {aboutItem.label}
                </Link>
              ))}
            </div>
          </details>
        ) : (
          <Link key={item.href} href={localePath(locale, item.href)}>
            {t(keyByLabel[item.label])}
          </Link>
        ))}
      </nav>
    </details>
  );
}