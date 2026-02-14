import { CaseStudy, Project } from '../types/project';

export const PROJECTS: Project[] = [
  {
    slug: 'smartbiz',
    title: 'SmartBiz: AI-Powered Business Management Suite for SMEs',
    description:
      'Full-stack ERP-lite with sales, inventory, supplier, customer, and expense workflows. Built for practical SME operations with AI roadmap support.',
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop',
    tags: ['Spring Boot', 'React', 'React Native', 'MySQL', 'AWS'],
    category: 'personal',
    featured: true,
    caseStudyAvailable: true,
    links: [
      { name: 'Backend', url: 'https://github.com/geethanga12/SmartBiz-backend' },
      { name: 'Web Frontend', url: 'https://github.com/geethanga12/SmartBiz-frontend-web' },
      { name: 'Mobile App', url: 'https://github.com/geethanga12/SmartBiz-frontend-mobile' },
    ],
  },
  {
    slug: 'iclazz-education',
    title: 'iClazz: Education Management Platform',
    description:
      'Internship project focused on class coordination workflows across student, tutor, and coordinator panels with calendar and attendance tooling.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
    tags: ['React', 'Spring Boot', 'MySQL', 'JWT', 'Role-Based Access'],
    category: 'internship',
    featured: true,
    caseStudyAvailable: true,
    links: [{ name: 'Live Site', url: 'https://iclazzeducation.com/' }],
  },
  {
    slug: 'royal-weddings',
    title: 'RoyalWeddings.lk',
    description:
      'Production-grade wedding platform with modern UX, content workflows, and scalable architecture during internship delivery.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop',
    tags: ['Next.js', 'Prisma', 'Tailwind CSS', 'Auth', 'SEO'],
    category: 'internship',
    featured: true,
    caseStudyAvailable: true,
    links: [{ name: 'Live Site', url: 'https://royalweddings.lk/' }],
  },
  {
    slug: 'pathwise',
    title: 'Pathwise',
    description:
      'AI-assisted career guidance platform connecting student growth plans with employer-aligned hiring pathways.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
    tags: ['React', 'Spring Boot', 'AI Integration', 'MySQL', 'Analytics'],
    category: 'internship',
    featured: true,
    caseStudyAvailable: true,
    links: [],
  },
  {
    slug: 'dictionary-web-app',
    title: 'Free Dictionary Web App',
    description:
      'Responsive dictionary app integrating Free Dictionary API for definitions, pronunciation, and examples.',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop',
    tags: ['React', 'Material UI', 'Axios', 'REST API'],
    category: 'personal',
    links: [{ name: 'Repository', url: 'https://github.com/geethanga12/dictionary-webapp.git' }],
  },
  {
    slug: 'nic-checker',
    title: 'NIC Detail Application',
    description:
      'Utility app to parse Sri Lankan NIC details in real time with a clean responsive interface.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
    tags: ['React', 'Tailwind CSS', 'React Router'],
    category: 'personal',
    links: [{ name: 'Repository', url: 'https://github.com/geethanga12/Sri-Lankan-NIC-Checker.git' }],
  },
  {
    slug: 'cafeteria-automation',
    title: 'Cafeteria Automation System',
    description:
      'Full-stack cafeteria platform with role-based workflows, secure auth, and order/menu management.',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    category: 'academic',
    links: [{ name: 'Repository', url: 'https://github.com/geethanga12/cas-cinec.git' }],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'iclazz-education',
    title: 'iClazz Education Platform',
    role: 'Software Engineer Intern',
    timeline: 'September 2025 - March 2026',
    stack: ['React', 'Vite', 'Spring Boot', 'MySQL', 'JWT', 'FullCalendar'],
    problem:
      'The platform needed a role-based operational flow connecting students, tutors, coordinators, and directors while keeping UX simple for non-technical users.',
    solution: [
      'Designed panel-level workflows with clear permission boundaries.',
      'Implemented class request lifecycle from submission to tutor assignment.',
      'Improved dashboard usability for dense monthly attendance and payment views.',
    ],
    impactMetrics: [
      { label: 'Delivery', value: 'Production rollout', note: 'Core panel workflow delivered.' },
      { label: 'Scope', value: '4 role dashboards', note: 'Student, Tutor, CC, Director.' },
      { label: 'Workflow', value: 'End-to-end class assignment', note: 'Request -> coordination -> tracking.' },
    ],
    sanitizedNotes:
      'Detailed internal operational logic is intentionally sanitized while preserving architecture and product outcomes.',
  },
  {
    slug: 'royal-weddings',
    title: 'RoyalWeddings.lk',
    role: 'Software Engineer Intern',
    timeline: 'September 2025 - March 2026',
    stack: ['Next.js', 'Prisma', 'NextAuth', 'Tailwind CSS', 'Framer Motion'],
    problem:
      'The business needed a polished brand-forward web experience with reliable content updates, secure workflows, and faster page performance.',
    solution: [
      'Implemented structured, componentized UI with reusable section blocks.',
      'Worked on authentication/content update flows and deployment-safe patterns.',
      'Applied SEO-conscious structure and accessible interaction design.',
    ],
    impactMetrics: [
      { label: 'Platform', value: 'Live production website' },
      { label: 'Engineering', value: 'Modernized codebase', note: 'Improved maintainability.' },
      { label: 'UX', value: 'Responsive cross-device support' },
    ],
    sanitizedNotes:
      'Sensitive business and private analytics data are excluded; only public-safe implementation details are included.',
  },
  {
    slug: 'pathwise',
    title: 'Pathwise Career Guidance Platform',
    role: 'Full-Stack Developer',
    timeline: '2025 - 2026',
    stack: ['React', 'Vite', 'Spring Boot', 'MySQL', 'AI-assisted matching'],
    problem:
      'Students needed personalized career pathways while employers needed better candidate-fit prediction beyond basic skill matching.',
    solution: [
      'Implemented dual-module architecture for student planning and employer alignment.',
      'Built structured data flow for recommendation-ready profiles and role data.',
      'Added dashboard components to present progression and matching context.',
    ],
    impactMetrics: [
      { label: 'Architecture', value: 'Dual-module platform' },
      { label: 'Objective', value: 'Long-term compatibility matching' },
      { label: 'Data Model', value: 'Guidance + hiring alignment' },
    ],
    sanitizedNotes:
      'Model internals and proprietary ranking logic are omitted by design.',
  },
  {
    slug: 'smartbiz',
    title: 'SmartBiz',
    role: 'Founder / Full-Stack Developer',
    timeline: '2025 - Present',
    stack: ['Spring Boot', 'React', 'React Native', 'MySQL', 'AWS EC2'],
    problem:
      'SMEs often manage operations using fragmented spreadsheets, leading to poor visibility and delayed decisions.',
    solution: [
      'Built a unified operations suite for sales, inventory, suppliers, and expenses.',
      'Integrated reporting-friendly data structure to support AI insights roadmap.',
      'Deployed cloud-ready backend and frontend pipelines for iterative releases.',
    ],
    impactMetrics: [
      { label: 'Coverage', value: 'Core SME operations modules implemented' },
      { label: 'Deployment', value: 'AWS EC2 hosted environment' },
      { label: 'Roadmap', value: 'AI insight integration planned' },
    ],
    sanitizedNotes:
      'Any private customer-specific data and commercial terms are intentionally omitted.',
  },
];
