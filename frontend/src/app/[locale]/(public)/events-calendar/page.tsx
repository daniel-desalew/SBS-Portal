import { EmptyState } from '../../../../components/shared/EmptyState';
import { PageHeader } from '../../../../components/layout/PageHeader';

export default function EventsCalendarPage() {
  return (
    <section className="container">
      <PageHeader
        title="Upcoming Events Calendar"
        description="Stay up to date with upcoming events from our schools."
      />
      <div className="section-content">
        <EmptyState
          title="No upcoming events"
          description="Upcoming events will appear here when they are published."
        />
      </div>
    </section>
  );
}
