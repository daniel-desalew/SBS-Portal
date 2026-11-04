'use client';

import Link from 'next/link';
import Image from 'next/image';
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
} from '../../lib/constants';
import { localePath } from '../../lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

export function Navbar({ locale }: { locale: 'en' | 'am' | 'om' }) {
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
    <header className="site-header">
      <div className="container nav-row">
        <Link className="brand" href={localePath(locale)} aria-label="SBS Portal home">
          <Image className="brand-mark" src="/ministry-logo.png" alt="" width={86} height={80} priority />
          <span className="brand-copy">
            <span className="brand-ministry">FDRE Ministry of Education</span>
            <span className="brand-light">Special Boarding Schools Portal</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {PUBLIC_NAVIGATION.map((item) => item.label === 'Programs' ? (
            <div className="nav-dropdown" key={item.href}>
              <Link
                aria-haspopup="true"
                className="nav-dropdown-trigger"
                href={localePath(locale, item.href)}
              >
                {t('programs')}
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </Link>
              <div className="nav-dropdown-menu">
                {PROGRAM_NAVIGATION.map((program) => (
                  <Link href={localePath(locale, item.href)} key={program.key}>
                    {t(program.key)}
                  </Link>
                ))}
              </div>
            </div>
          ) : item.label === 'Career' ? (
            <div className="nav-dropdown" key={item.href}>
              <Link
                aria-haspopup="true"
                className="nav-dropdown-trigger"
                href={localePath(locale, item.href)}
              >
                {t('career')}
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </Link>
              <div className="nav-dropdown-menu">
                {CAREER_NAVIGATION.map((career) => (
                  <Link href={localePath(locale, career.href)} key={career.label}>
                    {career.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : item.label === 'Admissions' ? (
            <div className="nav-dropdown" key={item.href}>
              <Link
                aria-haspopup="true"
                className="nav-dropdown-trigger"
                href={localePath(locale, item.href)}
              >
                {t('admissions')}
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </Link>
              <div className="nav-dropdown-menu">
                {ADMISSION_NAVIGATION.map((admission) => (
                  <Link href={localePath(locale, admission.href)} key={admission.key}>
                    {t(admission.key)}
                  </Link>
                ))}
              </div>
            </div>
          ) : item.label === 'Resources' ? (
            <div className="nav-dropdown" key={item.href}>
              <Link
                aria-haspopup="true"
                className="nav-dropdown-trigger"
                href={localePath(locale, item.href)}
              >
                {t('resources')}
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </Link>
              <div className="nav-dropdown-menu nav-dropdown-menu-wide">
                {RESOURCE_NAVIGATION.map((resource) => (
                  <Link href={localePath(locale, resource.href)} key={resource.key}>
                    {t(resource.key)}
                  </Link>
                ))}
              </div>
            </div>
          ) : item.label === 'News' ? (
            <div className="nav-dropdown" key={item.href}>
              <Link
                aria-haspopup="true"
                className="nav-dropdown-trigger"
                href={localePath(locale, item.href)}
              >
                {t('news')}
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </Link>
              <div className="nav-dropdown-menu">
                {NEWS_NAVIGATION.map((newsItem) => (
                  <Link href={localePath(locale, newsItem.href)} key={newsItem.label}>
                    {newsItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : item.label === 'Gallery' ? (
            <div className="nav-dropdown" key={item.href}>
              <Link
                aria-haspopup="true"
                className="nav-dropdown-trigger"
                href={localePath(locale, item.href)}
              >
                {t('gallery')}
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </Link>
              <div className="nav-dropdown-menu">
                {GALLERY_NAVIGATION.map((galleryItem) => (
                  <Link href={localePath(locale, galleryItem.href)} key={galleryItem.label}>
                    {galleryItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : item.label === 'About Us' ? (
            <div className="nav-dropdown" key={item.href}>
              <Link
                aria-haspopup="true"
                className="nav-dropdown-trigger"
                href={localePath(locale, item.href)}
              >
                {t('aboutUs')}
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </Link>
              <div className="nav-dropdown-menu nav-dropdown-menu-wide">
                {ABOUT_NAVIGATION.map((aboutItem) => (
                  <Link href={localePath(locale, aboutItem.href)} key={aboutItem.label}>
                    {aboutItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link href={localePath(locale, item.href)} key={item.href}>
              {t(keyByLabel[item.label])}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher locale={locale} />
          <Link className="button button-primary button-small" href={localePath(locale, '/admissions/apply')}>
            {t('apply')}
          </Link>
        </div>
      </div>
      <MobileMenu locale={locale} />
    </header>
  );
}