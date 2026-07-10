export type EducationType = 'degree' | 'diploma' | 'certification' | 'training';

export interface EducationEntry {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  current?: boolean;
  type: EducationType;
  /** Classification / result, e.g. "Second Class Upper Division" */
  grade?: string;
  description?: string;
  /** Achievement bullet points (rendered as a list, e.g. for training programmes) */
  bullets?: string[];
  highlights?: string[];
}
