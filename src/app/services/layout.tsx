import type { Metadata } from 'next';
import { SITE_URL } from '../../data/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Full-stack web development services — custom web apps, REST APIs, LMS platforms, e-commerce systems, dashboards, and cloud deployment by Geethanga Dissanayake.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
