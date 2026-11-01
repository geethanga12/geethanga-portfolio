export type ProjectCategory = 'professional' | 'internship' | 'personal' | 'academic';
export type ProjectType = 'full-stack' | 'frontend' | 'backend';
export type ProjectStatus = 'live' | 'in-development';

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

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyUser {
  role: string;
  description?: string;
}

export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface CaseStudyFeatureGroup {
  name?: string;
  features: CaseStudyFeature[];
}

/** Challenge and result are optional: leave them out when there are no facts for them */
export interface CaseStudyHighlight {
  title: string;
  challenge?: string;
  approach: string;
  result?: string;
}

export interface ArchitectureNode {
  label: string;
  detail?: string;
}

export interface CaseStudyArchitecture {
  flow: ArchitectureNode[];
  connectionsLabel?: string;
  connections?: ArchitectureNode[];
  hosting?: string;
  note?: string;
}

export type StackLayer = 'Frontend' | 'Backend' | 'Database' | 'Integrations' | 'Infrastructure' | 'Testing';

export interface CaseStudyStackGroup {
  layer: StackLayer;
  items: string[];
}

export interface CaseStudyScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

/** Optional fields hide their section on the case study page when left out */
export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  context: string;
  timeline: string;
  team?: string;
  metrics?: CaseStudyMetric[];
  screenshots?: CaseStudyScreenshot[];
  overview: string[];
  users?: CaseStudyUser[];
  features?: CaseStudyFeatureGroup[];
  contributions?: string[];
  highlights?: CaseStudyHighlight[];
  architecture?: CaseStudyArchitecture;
  stack: CaseStudyStackGroup[];
  disclosure?: string;
}
