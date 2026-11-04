import type { MetadataRoute } from 'next';
import { SUPPORTED_LOCALES } from '../lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const routes = ['', '/programs', '/admissions/guide', '/admissions/apply', '/resources', '/career', '/news', '/gallery', '/about', '/meals-nutrition', '/faq', '/contact'];
  return SUPPORTED_LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
      priority: route === '' ? 1 : 0.6,
    })),
  );
}