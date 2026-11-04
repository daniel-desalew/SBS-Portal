import { PublicListingPage } from '../../../../components/shared/PublicListingPage';

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PublicListingPage locale={locale} endpoint="programs" noun="programs" title="Our programs" description="Explore learning pathways and opportunities." />;
}