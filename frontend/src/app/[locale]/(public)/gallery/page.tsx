import { PublicListingPage } from '../../../../components/shared/PublicListingPage';

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PublicListingPage locale={locale} endpoint="gallery" noun="gallery items" title="Gallery" description="A glimpse into learning and life in our schools." />;
}