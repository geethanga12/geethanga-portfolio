import type { Metadata } from 'next';
import { SITE_URL } from '../../data/site';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Full-stack, frontend, and production-style web projects by Geethanga Dissanayake — Spring Boot, React, Next.js, MySQL, AWS and more.',
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
