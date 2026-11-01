import type { CaseStudy, Project } from '../types/project';

export const PROJECTS: Project[] = [
  {
    slug: 'uds-pos',
    title: 'UDS POS: Multi-Tenant SaaS Point of Sale & Inventory Platform',
    description:
      'Multi-tenant, multi-branch POS and inventory system for retail and spare-parts businesses, covering the super admin dashboard, POS till, and a 13-screen shop owner dashboard. Includes tenant- and branch-level data isolation, batch tracking, stock transfers, and audit logging, backed by 630 unit and integration tests.',
    image: '/assets/udspos.jpg',
    tags: ['Java 17', 'Spring Boot', 'PostgreSQL 16', 'Next.js', 'React 19', 'Spring Security', 'Flyway', 'TypeScript', 'CI/CD', 'JUnit 5', 'Mockito'],
    category: 'professional',
    type: 'full-stack',
    status: 'in-development',
    featured: true,
    caseStudyAvailable: true,
    links: [],
  },
  {
    slug: 'uds-lms',
    title: 'UDS LMS: Learning Management & E-Learning Platform',
    description:
      'Learning management and e-learning platform with Student, Tutor, and Admin roles covering courses, quizzes, progress tracking, certification, and payments. Includes PayHere enrolment payments, QR-verifiable PDF certificates, and JWT authentication with email OTP verification and Google OAuth 2.0 sign-in.',
    image: '/assets/udslms.jpg',
    tags: ['Java 17', 'Spring Boot', 'MySQL', 'React 19', 'PayHere', 'Spring Security', 'Vite', 'Tailwind CSS'],
    category: 'professional',
    type: 'full-stack',
    featured: true,
    caseStudyAvailable: true,
    links: [{ name: 'Live Site', url: 'https://lms.uds.lk/' }],
  },
  {
    slug: 'smartbiz',
    title: 'SmartBiz: AI-Powered Business Management Suite for SMEs',
    description:
      'Unified ERP-lite covering sales, inventory, supplier management, customer records, and expense tracking — built to replace fragmented spreadsheet workflows for small businesses. Deployed on AWS with a React web app and React Native mobile companion.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop',
    tags: ['Spring Boot', 'React', 'React Native', 'MySQL', 'AWS EC2', 'REST API'],
    category: 'personal',
    type: 'full-stack',
    caseStudyAvailable: true,
    links: [
      { name: 'Backend', url: 'https://github.com/geethanga12/SmartBiz-backend' },
      { name: 'Web Frontend', url: 'https://github.com/geethanga12/SmartBiz-frontend-web' },
      { name: 'Mobile App', url: 'https://github.com/geethanga12/SmartBiz-frontend-mobile' },
    ],
  },
  {
    slug: 'iclazz-education',
    title: 'iClazz Education: Tuition Class Management Platform',
    description:
      'Production tuition platform serving 700+ tutors and 1,000+ students across four role-based dashboards (Student, Tutor, Coordinator, Director). Covers the full class lifecycle — requests, tutor assignment, scheduling, attendance, and monthly billing — with OnePay subscription billing. Delivered during internship.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
    tags: ['React 18', 'Spring Boot', 'MySQL', 'OnePay', 'Tailwind CSS', 'Spring Security', 'JWT', 'Google OAuth 2.0', 'Hostinger VPS', 'Cloudflare'],
    category: 'internship',
    type: 'full-stack',
    featured: true,
    caseStudyAvailable: true,
    links: [{ name: 'Live Site', url: 'https://iclazzeducation.com/' }],
  },
  {
    slug: 'royal-weddings',
    title: 'Royal Weddings: Multi-Vendor Wedding Services Marketplace',
    description:
      'Multi-vendor wedding services marketplace onboarding 50+ real vendors across four access levels. Next.js API routes with search, filtering, and pagination over an 18-table Prisma schema, plus PayHere vendor subscriptions with webhook validation. Shipped to live production during internship.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop',
    tags: ['Next.js 16 (App Router)', 'React 19', 'Prisma ORM', 'MySQL 8', 'PayHere', 'TypeScript', 'NextAuth.js', 'Tailwind CSS', 'Zustand'],
    category: 'internship',
    type: 'full-stack',
    featured: true,
    caseStudyAvailable: true,
    links: [{ name: 'Live Site', url: 'https://royalweddings.lk/' }],
  },
  {
    slug: 'pathwise',
    title: 'Pathwise: AI-Assisted Career Guidance Platform',
    description:
      'Dual-module platform connecting student career growth profiles with employer hiring pathways. Implements recommendation-ready data structures, structured profile dashboards, and AI-assisted matching logic to improve candidate-employer alignment beyond basic skill filters.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
    tags: ['React', 'Spring Boot', 'AI Integration', 'MySQL', 'Analytics', 'Vite'],
    category: 'internship',
    type: 'full-stack',
    caseStudyAvailable: true,
    links: [],
  },
  {
    slug: 'dictionary-web-app',
    title: 'Free Dictionary Web App',
    description:
      'Clean responsive dictionary application that queries the Free Dictionary API for word definitions, pronunciation audio, and usage examples. Features a polished search experience with Material UI components.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop',
    tags: ['React', 'Material UI', 'Axios', 'REST API'],
    category: 'personal',
    type: 'frontend',
    links: [{ name: 'Repository', url: 'https://github.com/geethanga12/dictionary-webapp.git' }],
  },
  {
    slug: 'nic-checker',
    title: 'Sri Lankan NIC Detail Application',
    description:
      'Real-time utility that decodes Sri Lankan National Identity Card numbers — extracting birth date, age, gender, and serial data — with a clean, fully responsive interface.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
    tags: ['React', 'Tailwind CSS', 'React Router'],
    category: 'personal',
    type: 'frontend',
    links: [{ name: 'Repository', url: 'https://github.com/geethanga12/Sri-Lankan-NIC-Checker.git' }],
  },
  {
    slug: 'cafeteria-automation',
    title: 'Cafeteria Automation System',
    description:
      'Academic full-stack cafeteria management system with role-based access for staff and customers, secure authentication, menu configuration, and order processing workflows.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    category: 'academic',
    type: 'full-stack',
    links: [{ name: 'Repository', url: 'https://github.com/geethanga12/cas-cinec.git' }],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'uds-pos',
    title: 'UDS POS Point of Sale & Inventory Platform',
    role: 'Lead Developer',
    timeline: 'April 2026 - Present',
    stack: ['Java 17', 'Spring Boot', 'Spring Security', 'PostgreSQL 16', 'Flyway', 'Next.js', 'React 19', 'TypeScript', 'CI/CD', 'JUnit 5', 'Mockito'],
    problem:
      'Retail and spare-parts businesses needed a single POS and inventory system across tenants and branches, with data isolated at both levels and stock and sales staying correct under concurrent updates.',
    solution: [
      'Built a multi-tenant, multi-branch platform covering the super admin dashboard, POS till, and a 13-screen shop owner dashboard.',
      'Designed a PostgreSQL schema (40 Flyway migrations) with tenant- and branch-level data isolation, batch tracking, stock transfers, and audit logging.',
      'Applied pessimistic locking to prevent race conditions on concurrent stock and sales updates.',
      'Eliminated N+1 query patterns, cutting database round trips on critical endpoints from 34 to 10 (about 70%).',
      'Built 23 REST controllers and JWT authentication with token versioning for instant session revocation.',
      'Wrote 630 unit and integration tests with JUnit 5 and Mockito, reaching 87.6% backend test coverage.',
    ],
    impactMetrics: [
      { label: 'Query Efficiency', value: '34 to 10 round trips', note: 'About 70% fewer on critical endpoints.' },
      { label: 'Test Coverage', value: '87.6% backend', note: '630 unit and integration tests.' },
      { label: 'Data Model', value: '40 Flyway migrations', note: 'Tenant- and branch-level data isolation.' },
    ],
    sanitizedNotes:
      'UDS POS is in development and not yet live. It is private company code at Ultimate Digital Solutions (Pvt) Ltd, so no live site or repository links are available.',
  },
  {
    slug: 'uds-lms',
    title: 'UDS LMS Learning Management & E-Learning Platform',
    role: 'Associate Software Engineer (built and deployed end to end)',
    timeline: 'April 2026 - Present',
    stack: ['Java 17', 'Spring Boot', 'Spring Security', 'MySQL', 'React 19', 'Vite', 'Tailwind CSS', 'PayHere'],
    problem:
      'The platform had to serve students, tutors, and admins in one system, covering courses, quizzes, progress tracking, certification, and payments.',
    solution: [
      'Built Student, Tutor, and Admin roles on a 28-entity MySQL schema.',
      'Implemented JWT authentication with email OTP verification and Google OAuth 2.0 sign-in.',
      'Integrated PayHere for live enrolment payments.',
      'Built QR-verifiable PDF certificates with Apache PDFBox and ZXing.',
      'Deployed to a Linux VPS with Nginx and systemd.',
    ],
    impactMetrics: [
      { label: 'Roles', value: '3 user roles', note: 'Student, Tutor, and Admin.' },
      { label: 'Data Model', value: '28-entity MySQL schema' },
      { label: 'Payments', value: 'PayHere integration', note: 'Live enrolment payments.' },
    ],
    sanitizedNotes:
      'Professional work at Ultimate Digital Solutions (Pvt) Ltd. Business and payment data are excluded; only public-safe implementation details are included.',
  },
  {
    slug: 'iclazz-education',
    title: 'iClazz Education: Tuition Class Management Platform',
    role: 'Software Engineer Intern',
    timeline: 'September 2025 - March 2026',
    stack: ['React 18', 'Tailwind CSS', 'Spring Boot', 'Spring Security', 'MySQL', 'JWT', 'Google OAuth 2.0', 'OnePay', 'Hostinger VPS', 'Cloudflare'],
    problem:
      'Tuition classes needed one platform for the full class lifecycle — requests, tutor assignment, scheduling, attendance, and monthly billing — across students, tutors, coordinators, and directors.',
    solution: [
      'Designed, built and deployed a production tuition platform from scratch, now serving 700+ tutors and 1,000+ students across four role-based dashboards (Student, Tutor, Coordinator, Director).',
      'Built 17 REST controllers (280+ REST endpoints) over a 31-entity MySQL schema covering the full class lifecycle.',
      'Integrated OnePay subscription billing with SHA-256 request hashing and server-side payment status verification, plus server-to-server callbacks, saved cards, and recurring payments; live payments have run in production for 8+ months.',
      'Migrated payments from PayHere to OnePay as an additive, backward-compatible change with backups and a rollback plan.',
      'Built 10 scheduled jobs, 5 of them for billing, automating billing cycles, grace-period penalties, and auto-pay retries.',
    ],
    impactMetrics: [
      { label: 'Scale', value: '700+ tutors, 1,000+ students', note: 'Across four role-based dashboards.' },
      { label: 'Backend', value: '280+ REST endpoints', note: '17 REST controllers over a 31-entity MySQL schema.' },
      { label: 'Payments', value: '8+ months of live payments', note: 'OnePay subscription billing.' },
    ],
    sanitizedNotes:
      'Detailed internal operational logic is intentionally sanitized while preserving architecture and product outcomes.',
  },
  {
    slug: 'royal-weddings',
    title: 'Royal Weddings: Multi-Vendor Wedding Services Marketplace',
    role: 'Lead Developer (Software Engineer Intern)',
    timeline: 'September 2025 - March 2026',
    stack: ['Next.js 16 (App Router)', 'React 19', 'TypeScript', 'Prisma ORM', 'MySQL 8', 'NextAuth.js', 'Tailwind CSS', 'Zustand', 'PayHere'],
    problem:
      'The business needed a multi-vendor marketplace for wedding services, with four access levels, vendor search and filtering, and paid vendor subscriptions.',
    solution: [
      'Built a multi-vendor marketplace as lead developer, onboarding 50+ real vendors across four access levels.',
      'Designed an 18-table schema with Prisma and built Next.js API routes with search, filtering, and pagination.',
      'Integrated PayHere vendor subscriptions with webhook validation.',
      'Provisioned the production VPS with Nginx and PM2.',
    ],
    impactMetrics: [
      { label: 'Vendors', value: '50+ real vendors', note: 'Across four access levels.' },
      { label: 'Data Model', value: '18-table Prisma schema' },
      { label: 'Payments', value: 'PayHere vendor subscriptions', note: 'With webhook validation.' },
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
