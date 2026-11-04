import { PublicListingPage } from '../../../../components/shared/PublicListingPage';

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PublicListingPage locale={locale} endpoint="careers" pathPrefix="career" noun="careers" title="Careers" description="Explore current opportunities to join our community." />;
}