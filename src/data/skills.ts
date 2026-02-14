import {
  FaBootstrap,
  FaCss3Alt,
  FaDatabase,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJsSquare,
  FaNodeJs,
  FaReact,
  FaTools,
} from 'react-icons/fa';
import { SiMysql, SiSpringboot, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { SkillCategory } from '../types/skills';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    emoji: '💻',
    titleColorClass: 'text-indigo-600 dark:text-indigo-400',
    skills: [
      { name: 'React', icon: FaReact, colorClass: 'text-blue-500' },
      { name: 'TypeScript', icon: SiTypescript, colorClass: 'text-blue-600' },
      { name: 'JavaScript', icon: FaJsSquare, colorClass: 'text-yellow-500' },
      { name: 'HTML5', icon: FaHtml5, colorClass: 'text-orange-500' },
      { name: 'CSS3', icon: FaCss3Alt, colorClass: 'text-sky-500' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, colorClass: 'text-cyan-500' },
      { name: 'Bootstrap', icon: FaBootstrap, colorClass: 'text-purple-500' },
    ],
  },
  {
    title: 'Backend',
    emoji: '⚙️',
    titleColorClass: 'text-emerald-600 dark:text-emerald-400',
    skills: [
      { name: 'Java', icon: FaJava, colorClass: 'text-red-500' },
      { name: 'Spring Boot', icon: SiSpringboot, colorClass: 'text-green-500' },
      { name: 'Node.js', icon: FaNodeJs, colorClass: 'text-green-600' },
      { name: 'MySQL', icon: SiMysql, colorClass: 'text-blue-500' },
      { name: 'REST API', icon: FaDatabase, colorClass: 'text-slate-500' },
    ],
  },
  {
    title: 'Tooling',
    emoji: '🛠️',
    titleColorClass: 'text-violet-600 dark:text-violet-400',
    skills: [
      { name: 'Git', icon: FaGitAlt, colorClass: 'text-orange-500' },
      { name: 'GitHub', icon: FaGithub, colorClass: 'text-slate-700 dark:text-slate-300' },
      { name: 'Figma', icon: FaFigma, colorClass: 'text-purple-500' },
      { name: 'CI/CD Mindset', icon: FaTools, colorClass: 'text-indigo-500' },
    ],
  },
];
