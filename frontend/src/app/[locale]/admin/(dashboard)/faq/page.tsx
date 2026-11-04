import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default function FaqAdminPage() {
  return <AdminResourcePage title="Frequently asked questions" endpoint="faq" locale="en" columns={['question', 'category', 'published']} />;
}