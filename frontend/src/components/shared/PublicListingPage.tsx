import { PageHeader } from '../layout/PageHeader';
import { ContentIndex } from './ContentIndex';

export function PublicListingPage({
  locale,
  title,
  description,
  endpoint,
  noun,
  pathPrefix,
}: {
  locale: string;
  title: string;
  description: string;
  endpoint: string;
  noun: string;
  pathPrefix?: string;
}) {
  return (
    <section className="container">
      <PageHeader title={title} description={description} />
      <div className="section-content">
        <ContentIndex endpoint={endpoint} locale={locale} noun={noun} pathPrefix={pathPrefix} />
      </div>
    </section>
  );
}
