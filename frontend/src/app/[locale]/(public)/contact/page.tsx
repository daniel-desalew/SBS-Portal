import { PageHeader } from '../../../../components/layout/PageHeader';
import { ContactForm } from '../../../../components/shared/ContactForm';

export default function ContactPage() {
  return <section className="container"><PageHeader eyebrow="GET IN TOUCH" title="Contact us" description="Send a message to the SBS Portal team and we will get back to you." /><ContactForm /></section>;
}