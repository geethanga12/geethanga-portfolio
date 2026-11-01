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
    status: 'live',
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
    status: 'live',
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
    status: 'live',
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

/** Array order sets the Previous / Next order on the case study pages */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'iclazz-education',
    title: 'iClazz Education',
    subtitle: 'Tuition class management platform',
    role: 'Lead developer (Software Engineer Intern)',
    context: 'Ultimate Digital Solutions (Pvt) Ltd, internship',
    timeline: 'September 2025 - March 2026',
    metrics: [
      { value: '700+', label: 'tutors' },
      { value: '1,000+', label: 'students' },
      { value: '280+', label: 'REST endpoints' },
      { value: '8+', label: 'months of live payments' },
    ],
    overview: [
      'Tuition classes need one place for the whole class lifecycle: requests, tutor assignment, scheduling, attendance and monthly billing.',
      'iClazz Education brings that together in four role-based dashboards.',
    ],
    users: [
      { role: 'Students', description: 'Request classes and pay tutors directly.' },
      { role: 'Class coordinators', description: 'Claim requests from a shared pool and assign verified tutors.' },
      { role: 'Tutors', description: 'Run classes and pay the platform a monthly per-class subscription.' },
      { role: 'Director', description: 'Administers the platform.' },
    ],
    features: [
      {
        name: 'Classes',
        features: [
          { title: 'Class requests', description: 'Students request the classes they need.' },
          { title: 'Coordinator claiming', description: 'Coordinators claim requests and assign tutors.' },
          { title: 'Scheduling and attendance', description: 'Schedules and attendance for each class.' },
        ],
      },
      {
        name: 'Billing',
        features: [
          { title: 'Monthly tutor billing', description: 'Includes a grace period and late-payment penalties.' },
          { title: 'Automatic class locking', description: 'Classes lock automatically when bills are unpaid.' },
          { title: 'Auto-pay retries', description: 'Failed automatic payments are tried again.' },
          { title: 'Saved cards', description: 'Cards are saved through OnePay tokenisation.' },
        ],
      },
      {
        name: 'Sign-in and reporting',
        features: [
          { title: 'Google sign-in', description: 'Students can sign in with Google.' },
          { title: 'Email notifications', description: 'The platform sends updates by email.' },
          { title: 'Reports', description: 'Reports export as PDF and Excel files.' },
        ],
      },
    ],
    contributions: [
      'Led development of the platform.',
      'Designed, built and deployed the platform from scratch.',
      'Built 17 REST controllers over a 31-entity MySQL schema.',
      'Integrated OnePay subscription billing with SHA-256 request hashing and server-side payment status verification, plus server-to-server callbacks, saved cards and recurring payments.',
      'Built 10 scheduled jobs, 5 of them for billing.',
    ],
    highlights: [
      {
        title: 'Recording payment status correctly',
        challenge:
          'Some OnePay payment returns had no status code. They were treated as cancelled and the order reference was cleared, so some paid bills stayed unpaid.',
        approach:
          "Treat a missing status as pending, always verify the payment server-side with OnePay's status API, never clear the order reference, and process payment notifications idempotently.",
        result: 'Paid bills are recorded correctly.',
      },
      {
        title: 'Making billing reliable',
        challenge: 'Billing ran on two fixed-date jobs.',
        approach:
          'Replaced them with a daily auto-pay sweep with retries, and fixed the application timezone to Asia/Colombo.',
        result: 'Billing dates are consistent.',
      },
      {
        title: 'Migrating payment providers',
        approach:
          'Moved from PayHere to OnePay as an additive, backward-compatible change with backups and a rollback plan.',
      },
    ],
    architecture: {
      flow: [
        { label: 'React SPA' },
        { label: 'Spring Boot REST API', detail: 'JWT' },
        { label: 'MySQL' },
      ],
      connectionsLabel: 'The API also talks to',
      connections: [{ label: 'OnePay' }, { label: 'Google Sign-In' }, { label: 'Gmail SMTP' }],
      hosting: 'a Hostinger VPS with Nginx and systemd, behind Cloudflare',
    },
    stack: [
      { layer: 'Frontend', items: ['React 18', 'Vite', 'Tailwind CSS', 'MUI (in places)', 'Axios', 'React Router 6'] },
      { layer: 'Backend', items: ['Java 17', 'Spring Boot 3.5', 'Spring Security', 'Spring Data JPA / Hibernate', 'JWT'] },
      { layer: 'Database', items: ['MySQL'] },
      { layer: 'Integrations', items: ['OnePay', 'Google Sign-In (OAuth 2.0)', 'Gmail SMTP', 'OpenPDF', 'Apache POI'] },
      { layer: 'Infrastructure', items: ['Hostinger VPS', 'Nginx', 'systemd', 'Cloudflare'] },
    ],
    disclosure:
      'Detailed internal operational logic is intentionally sanitized while preserving architecture and product outcomes.',
  },
  {
    slug: 'royal-weddings',
    title: 'Royal Weddings',
    subtitle: 'Multi-vendor wedding services marketplace',
    role: 'Lead developer (Software Engineer Intern)',
    context: 'Ultimate Digital Solutions (Pvt) Ltd, internship',
    timeline: 'September 2025 - March 2026',
    metrics: [
      { value: '50+', label: 'real vendors onboarded' },
      { value: '18', label: 'tables in the Prisma schema' },
      { value: '4', label: 'access levels' },
    ],
    overview: [
      'A multi-vendor marketplace for wedding services.',
      'Vendors register, verify their email and wait for admin approval. Their listings can then be searched and filtered.',
    ],
    features: [
      {
        features: [
          { title: 'Vendor registration', description: 'Includes email verification and admin approval.' },
          { title: 'Vendor listings', description: 'Includes search, filtering and pagination.' },
          { title: 'Location selection', description: 'Location can be selected on the marketplace.' },
          { title: 'Vendor subscriptions', description: 'Paid through PayHere, with webhook validation.' },
        ],
      },
    ],
    contributions: [
      'Built the marketplace as lead developer.',
      'Designed the schema with Prisma.',
      'Built Next.js API routes for search, filtering and pagination.',
      'Integrated PayHere vendor subscriptions with webhook validation.',
      'Provisioned the production VPS with Nginx and PM2.',
    ],
    architecture: {
      flow: [
        { label: 'Next.js app', detail: 'Pages, API routes, NextAuth' },
        { label: 'Prisma' },
        { label: 'MySQL 8' },
      ],
      connectionsLabel: 'Into the API routes',
      connections: [{ label: 'PayHere', detail: 'Webhooks' }],
      hosting: 'a VPS with Nginx and PM2',
    },
    stack: [
      { layer: 'Frontend', items: ['Next.js 16 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Zustand'] },
      { layer: 'Backend', items: ['Next.js API routes', 'NextAuth.js'] },
      { layer: 'Database', items: ['Prisma ORM', 'MySQL 8'] },
      { layer: 'Integrations', items: ['PayHere'] },
      { layer: 'Infrastructure', items: ['VPS', 'Nginx', 'PM2'] },
    ],
    disclosure:
      'Sensitive business and private analytics data are excluded; only public-safe implementation details are included.',
  },
  {
    slug: 'uds-pos',
    title: 'UDS POS',
    subtitle: 'Multi-tenant SaaS point of sale and inventory platform',
    role: 'Lead developer',
    context: 'Ultimate Digital Solutions (Pvt) Ltd',
    timeline: 'April 2026 - Present',
    metrics: [
      { value: '34 → 10', label: 'database round trips on critical endpoints, about 70% fewer' },
      { value: '630', label: 'unit and integration tests' },
      { value: '87.6%', label: 'backend test coverage' },
      { value: '40', label: 'Flyway migrations' },
    ],
    overview: [
      'A multi-tenant, multi-branch POS and inventory platform for retail and spare-parts businesses.',
      "It's designed to work on phones, tablets, laptops and desktops.",
    ],
    features: [
      {
        name: 'Selling and management',
        features: [
          { title: 'Super admin dashboard', description: 'Manages tenants from one dashboard.' },
          { title: 'POS till', description: 'The till used for sales.' },
          { title: 'Shop owner dashboard', description: 'Thirteen screens for shop owners.' },
          { title: 'Multi-branch support', description: 'One business can run several branches.' },
        ],
      },
      {
        name: 'Inventory and records',
        features: [
          { title: 'Batch tracking', description: 'Tracks stock by batch.' },
          { title: 'Stock transfers', description: 'Records transfers of stock.' },
          { title: 'Audit logging', description: 'Keeps a log of actions for review.' },
        ],
      },
    ],
    contributions: [
      'Led development of the platform.',
      'Designed the PostgreSQL schema.',
      'Built 23 REST controllers and JWT authentication.',
      'Wrote the test suite with JUnit 5 and Mockito.',
    ],
    highlights: [
      {
        title: 'Keeping tenant data separate',
        approach: 'Isolated data at both the tenant and branch level in the PostgreSQL schema.',
      },
      {
        title: 'Protecting stock during concurrent sales',
        challenge: 'Concurrent stock and sales updates can cause race conditions.',
        approach: 'Applied pessimistic locking to these updates.',
        result: "Concurrent sales can't corrupt stock.",
      },
      {
        title: 'Removing N+1 queries',
        challenge: 'N+1 query patterns added database round trips on critical endpoints.',
        approach: 'Removed the N+1 queries.',
        result: 'Critical endpoints make far fewer database calls.',
      },
      {
        title: 'Revoking sessions instantly',
        approach: 'Added token versioning to JWT authentication.',
        result: 'Sessions can be revoked instantly.',
      },
    ],
    architecture: {
      flow: [
        { label: 'Next.js frontend' },
        { label: 'Spring Boot REST API', detail: 'JWT with token versioning' },
        { label: 'PostgreSQL 16', detail: 'Flyway migrations' },
      ],
      note: 'Separate backend and frontend repositories with CI/CD',
    },
    stack: [
      { layer: 'Frontend', items: ['Next.js', 'React 19', 'TypeScript'] },
      { layer: 'Backend', items: ['Java 17', 'Spring Boot', 'Spring Security', 'JWT'] },
      { layer: 'Database', items: ['PostgreSQL 16', 'Flyway'] },
      { layer: 'Infrastructure', items: ['CI/CD with GitHub Actions'] },
      { layer: 'Testing', items: ['JUnit 5', 'Mockito'] },
    ],
    disclosure:
      'UDS POS is in development and not yet live. It is private company code at Ultimate Digital Solutions (Pvt) Ltd, so no live site or repository links are available.',
  },
  {
    slug: 'uds-lms',
    title: 'UDS LMS',
    subtitle: 'Learning management and e-learning platform',
    role: 'Built and deployed end to end',
    context: 'Ultimate Digital Solutions (Pvt) Ltd',
    timeline: 'April 2026 - Present',
    metrics: [
      { value: '28', label: 'entities in the MySQL schema' },
      { value: '3', label: 'user roles' },
    ],
    overview: [
      'A learning management and e-learning platform covering courses, quizzes, progress tracking, certification and payments.',
    ],
    users: [{ role: 'Students' }, { role: 'Tutors' }, { role: 'Admins' }],
    features: [
      {
        features: [
          { title: 'Courses and quizzes', description: 'Courses and quizzes on one platform.' },
          { title: 'Progress tracking', description: 'Tracks progress through the platform.' },
          { title: 'Verifiable certificates', description: 'PDF certificates that can be verified by QR code.' },
          { title: 'Enrolment payments', description: 'Paid through PayHere.' },
          { title: 'Secure sign-in', description: 'Email OTP verification and Google sign-in.' },
        ],
      },
    ],
    contributions: [
      'Built and deployed the platform end to end.',
      'Designed the MySQL schema.',
      'Built JWT authentication with email OTP verification and Google OAuth 2.0 sign-in.',
      'Integrated PayHere for live enrolment payments.',
      'Built the certificates with Apache PDFBox and ZXing.',
      'Deployed to a Linux VPS with Nginx and systemd.',
    ],
    architecture: {
      flow: [
        { label: 'React (Vite) SPA' },
        { label: 'Spring Boot REST API', detail: 'JWT, email OTP, Google OAuth' },
        { label: 'MySQL' },
      ],
      connectionsLabel: 'The API also uses',
      connections: [
        { label: 'PayHere', detail: 'Payments' },
        { label: 'PDFBox and ZXing', detail: 'Certificates' },
      ],
      hosting: 'a Linux VPS with Nginx and systemd',
    },
    stack: [
      { layer: 'Frontend', items: ['React 19', 'Vite', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Java 17', 'Spring Boot', 'Spring Security', 'JWT', 'Google OAuth 2.0'] },
      { layer: 'Database', items: ['MySQL'] },
      { layer: 'Integrations', items: ['PayHere', 'Apache PDFBox', 'ZXing'] },
      { layer: 'Infrastructure', items: ['Linux VPS', 'Nginx', 'systemd'] },
    ],
    disclosure:
      'Professional work at Ultimate Digital Solutions (Pvt) Ltd. Business and payment data are excluded; only public-safe implementation details are included.',
  },
  {
    slug: 'smartbiz',
    title: 'SmartBiz',
    subtitle: 'AI-powered business management suite for SMEs',
    role: 'Founder / Full-Stack Developer',
    context: 'Personal project',
    timeline: '2025 - Present',
    overview: [
      'SMEs often manage operations using fragmented spreadsheets, leading to poor visibility and delayed decisions.',
      'SmartBiz is a unified ERP-lite built to replace those spreadsheet workflows.',
    ],
    features: [
      {
        features: [
          { title: 'Operations modules', description: 'Sales, inventory, supplier management, customer records and expense tracking.' },
          { title: 'Web and mobile', description: 'A React web app and a React Native mobile companion.' },
          { title: 'AI analytics', description: 'Analytics through the Gemini API.' },
        ],
      },
    ],
    contributions: [
      'Built a unified operations suite for sales, inventory, suppliers and expenses.',
      'Built a reporting-friendly data structure.',
      'Deployed cloud-ready backend and frontend pipelines for iterative releases.',
      'Deployed the full stack on AWS EC2 with Cloudflare.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'React Native'] },
      { layer: 'Backend', items: ['Spring Boot', 'REST API'] },
      { layer: 'Database', items: ['MySQL'] },
      { layer: 'Integrations', items: ['Gemini API'] },
      { layer: 'Infrastructure', items: ['AWS EC2', 'Cloudflare'] },
    ],
    disclosure: 'Any private customer-specific data and commercial terms are intentionally omitted.',
  },
  {
    slug: 'pathwise',
    title: 'Pathwise',
    subtitle: 'AI-assisted career guidance platform',
    role: 'Full-Stack Developer',
    context: 'Ultimate Digital Solutions (Pvt) Ltd, internship',
    timeline: '2025 - 2026',
    overview: [
      'Students needed personalized career pathways while employers needed better candidate-fit prediction beyond basic skill matching.',
      'Pathwise is a dual-module platform connecting student career growth profiles with employer hiring pathways.',
    ],
    users: [{ role: 'Students' }, { role: 'Employers' }],
    features: [
      {
        features: [
          { title: 'Career growth profiles', description: 'Structured profile dashboards for students.' },
          { title: 'Hiring pathways', description: 'A separate module for employer alignment.' },
          { title: 'AI-assisted matching', description: 'Matching logic that goes beyond basic skill filters.' },
          { title: 'Recommendation-ready data', description: 'Data structures built for recommendations.' },
        ],
      },
    ],
    contributions: [
      'Implemented dual-module architecture for student planning and employer alignment.',
      'Built structured data flow for recommendation-ready profiles and role data.',
      'Added dashboard components to present progression and matching context.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'Vite'] },
      { layer: 'Backend', items: ['Spring Boot'] },
      { layer: 'Database', items: ['MySQL'] },
      { layer: 'Integrations', items: ['AI-assisted matching', 'Analytics'] },
    ],
    disclosure: 'Model internals and proprietary ranking logic are omitted by design.',
  },
];
