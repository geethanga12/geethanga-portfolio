import { IconType } from 'react-icons';

export interface SkillItem {
  name: string;
  icon: IconType;
  colorClass: string;
}

export interface SkillCategory {
  title: string;
  emoji: string;
  titleColorClass: string;
  skills: SkillItem[];
}
