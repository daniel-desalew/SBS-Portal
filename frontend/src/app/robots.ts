import type { MetadataRoute } from 'next';
import { SUPPORTED_LOCALES } from '../lib/constants';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: SUPPORTED_LOCALES.map((locale) => `/${locale}/admin/`) }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}