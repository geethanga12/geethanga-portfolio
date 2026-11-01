export type ProjectCategory = 'professional' | 'internship' | 'personal' | 'academic';
export type ProjectType = 'full-stack' | 'frontend' | 'backend';
export type ProjectStatus = 'in-development';

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
  type?: ProjectType;
  status?: ProjectStatus;
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
