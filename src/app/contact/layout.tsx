import type { Metadata } from 'next';
import { SITE_URL } from '../../data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Geethanga Dissanayake for freelance web development, full-stack engineering roles, or consulting inquiries.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
