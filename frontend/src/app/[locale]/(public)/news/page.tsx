import { PublicListingPage } from '../../../../components/shared/PublicListingPage';

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PublicListingPage locale={locale} endpoint="news" noun="news" title="News and updates" description="The latest announcements from the SBS community." />;
}