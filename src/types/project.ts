export type ProjectCategory = 'internship' | 'personal' | 'academic';

export interface ProjectLink {
  name: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: ProjectLink[];
  category: ProjectCategory;
  featured?: boolean;
  caseStudyAvailable?: boolean;
}

export interface ImpactMetric {
  label: string;
  value: string;
  note?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  stack: string[];
  problem: string;
  solution: string[];
  impactMetrics: ImpactMetric[];
  sanitizedNotes: string;
}
