export interface ExperienceEntry {
  title: string;
  organization: string;
  period: string;
  location?: string;
  type?: string;      // 'Full-Time' | 'Internship' | 'Freelance'
  current?: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
}
