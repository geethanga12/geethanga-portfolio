import { ExperienceEntry } from '../types/experience';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: 'Associate Full Stack Developer',
    organization: 'Ultimate Digital Solutions (Pvt) Ltd',
    period: 'April 2026 — Present',
    location: 'Sri Lanka',
    type: 'Full-Time',
    current: true,
    summary:
      'Progressed from intern to full-time developer, continuing to ship features across production platforms in the education and events space.',
    highlights: [
      'Took ownership of feature delivery across multiple live client products.',
      'Led UI/UX improvements and API integrations for role-based dashboards.',
      'Contributed to architecture decisions and code reviews within the team.',
    ],
    tags: ['React', 'Spring Boot', 'Next.js', 'MySQL', 'AWS', 'TypeScript'],
  },
  {
    title: 'Software Engineer Intern',
    organization: 'Ultimate Digital Solutions (Pvt) Ltd',
    period: 'September 2025 — March 2026',
    location: 'Sri Lanka',
    type: 'Internship',
    current: false,
    summary:
      'Contributed to multiple production and client projects spanning education, event, and career guidance domains with full-stack delivery responsibilities.',
    highlights: [
      'Delivered feature work across iClazz, RoyalWeddings.lk, and Pathwise.',
      'Implemented role-based panel workflows, API integrations, and responsive UI patterns.',
      'Collaborated on deployment and production hardening on cloud-hosted environments.',
    ],
    tags: ['React', 'Spring Boot', 'Next.js', 'MySQL', 'AWS'],
  },
  {
    title: 'Freelance & Personal Project Developer',
    organization: 'Self-Employed',
    period: '2024 — Present',
    location: 'Remote',
    type: 'Freelance',
    current: true,
    summary:
      'Built and shipped a range of personal and client-style projects covering business tools, e-commerce, and productivity applications.',
    highlights: [
      'Designed and built full-stack web apps from scratch — frontend, backend, and deployment.',
      'Created SmartBiz, NomadStay, LifePulse, and other portfolio-grade products.',
      'Handled project architecture, responsive UI, database design, and cloud deployment.',
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Docker'],
  },
];

