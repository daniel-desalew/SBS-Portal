'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SUPPORTED_LOCALES } from '../../lib/constants';

const labels = { en: 'English', am: 'አማርኛ', om: 'Afaan Oromoo' } as const;

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (nextLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/') || `/${nextLocale}`);
  };

  return (
    <label className="language-switcher">
      <span className="sr-only">Language</span>
      <select value={locale} onChange={(event) => changeLocale(event.target.value)} aria-label="Language">
        {SUPPORTED_LOCALES.map((code) => (
          <option value={code} key={code}>{labels[code]}</option>
        ))}
      </select>
    </label>
  );
}