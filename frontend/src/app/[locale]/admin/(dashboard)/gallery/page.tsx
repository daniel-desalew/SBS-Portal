import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default function GalleryAdminPage() {
  return <AdminResourcePage title="Gallery" endpoint="gallery" locale="en" columns={['title', 'imageUrl', 'published']} />;
}