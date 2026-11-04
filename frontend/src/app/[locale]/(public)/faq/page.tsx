import { PublicListingPage } from '../../../../components/shared/PublicListingPage';

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PublicListingPage locale={locale} endpoint="faq" noun="questions" title="Frequently asked questions" description="Quick answers to common questions about programs and admissions." />;
}