export interface CaseStudyApiItem {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  stack: string[];
}

export const CASE_STUDIES: CaseStudyApiItem[] = [
  {
    slug: 'iclazz-education',
    title: 'iClazz Education Platform',
    role: 'Software Engineer Intern',
    timeline: 'September 2025 - March 2026',
    stack: ['React', 'Spring Boot', 'MySQL'],
  },
  {
    slug: 'royal-weddings',
    title: 'RoyalWeddings.lk',
    role: 'Software Engineer Intern',
    timeline: 'September 2025 - March 2026',
    stack: ['Next.js', 'Prisma', 'Tailwind CSS'],
  },
  {
    slug: 'pathwise',
    title: 'Pathwise Career Guidance Platform',
    role: 'Full-Stack Developer',
    timeline: '2025 - 2026',
    stack: ['React', 'Spring Boot', 'AI Integration'],
  },
  {
    slug: 'smartbiz',
    title: 'SmartBiz',
    role: 'Founder / Full-Stack Developer',
    timeline: '2025 - Present',
    stack: ['Spring Boot', 'React', 'React Native', 'AWS EC2'],
  },
];
