import type { EducationEntry } from '../types/education';

export const EDUCATION: EducationEntry[] = [
  {
    degree: 'BSc (Hons) Computer Science (Software Engineering)',
    institution: 'University of Wolverhampton',
    location: 'Wolverhampton, UK (via CINEC Campus, Sri Lanka)',
    period: '2024 – 2025',
    type: 'degree',
    grade: 'Second Class (Upper Division)',
    description:
      'Honours degree deepening expertise in advanced software engineering, distributed systems, and professional development practices.',
    highlights: [
      'Software Engineering & Architecture',
      'Scalable System Design',
      'Professional Development & Research Methods',
    ],
  },
  {
    degree: 'Pearson BTEC Level 5 HND in Computing (Software Engineering)',
    institution: 'CINEC Campus',
    location: 'Colombo, Sri Lanka',
    period: '2022 – 2024',
    type: 'diploma',
    description:
      'Comprehensive two-year programme covering full-stack development fundamentals, database engineering, and software project lifecycle management.',
    highlights: [
      'Object-Oriented Programming & Design Patterns',
      'Database Design & SQL',
      'Web & Mobile Application Development',
      'Agile Project Management',
    ],
  },
  {
    degree: 'Full-Stack Developer Trainee',
    institution: 'Academy of Computer Programming and Training (ACPT)',
    period: 'Feb 2025 – Aug 2025 · 7 mos',
    type: 'training',
    bullets: [
      'Completed an intensive Advanced Full Stack program covering React, React Native, Spring Boot, and AWS deployment, building production-deployable applications throughout.',
      'Developed SmartBiz, an AI-powered ERP-lite system for SMEs, integrating the Gemini API for analytics and deploying the full stack on AWS EC2 with Cloudflare.',
    ],
  },
];
