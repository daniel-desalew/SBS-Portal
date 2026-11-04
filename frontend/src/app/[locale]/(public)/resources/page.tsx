import { PublicListingPage } from '../../../../components/shared/PublicListingPage';

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PublicListingPage locale={locale} endpoint="resources" noun="resources" title="Learning resources" description="Find useful information, downloads, and support." />;
}