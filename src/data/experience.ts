import { ExperienceEntry } from '../types/experience';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: 'Associate Software Engineer',
    organization: 'Ultimate Digital Solutions (Pvt) Ltd',
    period: 'April 2026 — Present',
    location: 'Panadura, Sri Lanka',
    type: 'Full-Time',
    current: true,
    summary:
      'Progressed from intern to full-time engineer, working across education platforms, a wedding marketplace, and a retail POS platform in development.',
    highlights: [
      'UDS POS: Lead developer of a multi-tenant SaaS point of sale and inventory platform, currently in development.',
      'UDS LMS: Built and deployed end to end a learning management platform with PayHere payments and QR-verifiable certificates.',
      'Took ownership of feature delivery across multiple live client products.',
      'Led UI/UX improvements and API integrations for role-based dashboards.',
      'Contributed to architecture decisions and code reviews within the team.',
    ],
    tags: ['React', 'Spring Boot', 'Next.js', 'MySQL', 'PostgreSQL', 'TypeScript'],
  },
  {
    title: 'Software Engineer Intern',
    organization: 'Ultimate Digital Solutions (Pvt) Ltd',
    period: 'September 2025 — March 2026',
    location: 'Panadura, Sri Lanka',
    type: 'Internship',
    current: false,
    summary:
      'Worked on production platforms for tuition class management and a multi-vendor wedding marketplace, plus career guidance work on Pathwise, with full-stack delivery responsibilities.',
    highlights: [
      'iClazz Education: Designed, built and deployed a production tuition platform from scratch, now serving 700+ tutors and 1,000+ students across four role-based dashboards.',
      'Royal Weddings: Built a multi-vendor marketplace as lead developer, onboarding 50+ real vendors across four access levels.',
      'Delivered feature work on Pathwise.',
      'Implemented role-based panel workflows, API integrations, and responsive UI patterns.',
      'Collaborated on deployment and production hardening on VPS-hosted environments.',
    ],
    tags: ['React', 'Spring Boot', 'Next.js', 'MySQL', 'TypeScript'],
  },
  {
    title: 'Freelance & Personal Project Developer',
    organization: 'Self-Employed',
    period: '2024 — Present',
    location: 'Remote',
    type: 'Freelance',
    current: true,
    summary:
      'Built personal projects including a business management suite, a dictionary web app, and a Sri Lankan NIC utility.',
    highlights: [
      'Designed and built full-stack web apps from scratch — frontend, backend, and deployment.',
      'Created SmartBiz and other portfolio-grade products.',
      'Handled project architecture, responsive UI, database design, and cloud deployment.',
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MySQL'],
  },
];

