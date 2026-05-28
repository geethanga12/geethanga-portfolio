export type EducationType = 'degree' | 'diploma' | 'certification';

export interface EducationEntry {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  current?: boolean;
  type: EducationType;
  description: string;
  highlights?: string[];
}
