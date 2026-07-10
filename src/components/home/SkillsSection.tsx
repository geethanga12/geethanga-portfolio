import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaGithub,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiSpring,
  SiSpringsecurity,
  SiTailwindcss,
  SiFlutter,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiHibernate,
  SiPrisma,
  SiGithubcopilot,
  SiHostinger,
} from 'react-icons/si';
import { FiCode, FiLayers, FiDatabase, FiCloud, FiRefreshCw } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

/* Official full-colour marks for tools react-icons lacks (served from /public) */
const claudeLogo = '/assets/logos/claude.svg';
const antigravityLogo = '/assets/logos/antigravity.ico';
const vscodeLogo = '/assets/logos/vscode.svg';
const intellijLogo = '/assets/logos/intellij.svg';

/* ─── Data ──────────────────────────────────────────────────────────────── */

interface Skill {
  name: string;
  /** react-icons component (official brand icons), used when `img` is absent */
  Icon?: React.ElementType;
  /** path to an official logo image for tools react-icons lacks */
  img?: string;
  color?: string;
}

interface SkillGroup {
  label: string;
  Icon: React.ElementType;
  /** Tailwind grid-span classes for the bento layout */
  span?: string;
  skills: Skill[];
}

const TEXT = 'var(--text)';
const ACCENT = 'var(--accent)';

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Languages',
    Icon: FiCode,
    skills: [
      { name: 'Java',       Icon: FaJava,       color: '#f89820' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
      { name: 'Python',     Icon: FaPython,     color: '#3776ab' },
      { name: 'HTML5',      Icon: FaHtml5,      color: '#e34f26' },
      { name: 'CSS3',       Icon: FaCss3Alt,    color: '#1572b6' },
    ],
  },
  {
    label: 'Database & ORM',
    Icon: FiDatabase,
    skills: [
      { name: 'MySQL',      Icon: SiMysql,      color: '#4479a1' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
      { name: 'Hibernate',  Icon: SiHibernate,  color: '#59666c' },
      { name: 'Prisma',     Icon: SiPrisma,     color: TEXT },
    ],
  },
  {
    label: 'Frameworks & Libraries',
    Icon: FiLayers,
    span: 'lg:col-span-2',
    skills: [
      { name: 'React',           Icon: FaReact,          color: '#61dafb' },
      { name: 'Next.js',         Icon: SiNextdotjs,      color: TEXT },
      { name: 'Spring Boot',     Icon: SiSpring,         color: '#6db33f' },
      { name: 'Spring Security', Icon: SiSpringsecurity, color: '#6db33f' },
      { name: 'Node.js',         Icon: FaNodeJs,         color: '#68a063' },
      { name: 'Express.js',      Icon: SiExpress,        color: TEXT },
      { name: 'Tailwind CSS',    Icon: SiTailwindcss,    color: '#38bdf8' },
      { name: 'React Native',    Icon: FaReact,          color: '#61dafb' },
      { name: 'Flutter',         Icon: SiFlutter,        color: '#02569b' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    Icon: FiCloud,
    skills: [
      { name: 'Docker',       Icon: FaDocker,    color: '#2496ed' },
      { name: 'AWS',          Icon: FaAws,       color: '#ff9900' },
      { name: 'CI/CD',        Icon: FiRefreshCw, color: ACCENT },
      { name: 'Hostinger',    Icon: SiHostinger, color: '#673de6' },
      { name: 'Git & GitHub', Icon: FaGithub,    color: TEXT },
    ],
  },
  {
    label: 'AI & Tools',
    Icon: HiSparkles,
    skills: [
      { name: 'Claude Code',    img: claudeLogo },
      { name: 'GitHub Copilot', Icon: SiGithubcopilot, color: TEXT },
      { name: 'Antigravity',    img: antigravityLogo },
      { name: 'VS Code',        img: vscodeLogo },
      { name: 'IntelliJ IDEA',  img: intellijLogo },
    ],
  },
];

/* ─── Skill chip ────────────────────────────────────────────────────────── */

function SkillChip({ skill }: { skill: Skill }) {
  const { Icon } = skill;
  return (
    <span
      className="group/chip inline-flex items-center gap-2 rounded-lg border border-[var(--border)]
                 bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text)]
                 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)]
                 hover:bg-[var(--surface-raised)] hover:shadow-sm"
    >
      {skill.img ? (
        <img
          src={skill.img}
          alt=""
          width={16}
          height={16}
          loading="lazy"
          decoding="async"
          className="h-4 w-4 flex-shrink-0 object-contain transition-transform duration-200 group-hover/chip:scale-110"
          aria-hidden
        />
      ) : Icon ? (
        <Icon
          size={16}
          style={{ color: skill.color }}
          className="flex-shrink-0 transition-transform duration-200 group-hover/chip:scale-110"
          aria-hidden
        />
      ) : null}
      {skill.name}
    </span>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section ref={ref} id="skills" aria-labelledby="skills-heading" className="section-spacing">
      <div className="container-page">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <p className="section-eyebrow mb-2">Technical Toolkit</p>
          <h2 id="skills-heading" className="section-title">
            Skills &amp; Technologies
          </h2>
          <p className="section-desc mt-2 max-w-lg">
            The languages, frameworks, and platforms I use to design, build, and ship
            full-stack products — from database schema to cloud deployment.
          </p>
        </motion.div>

        {/* Bento grid of skill groups */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {SKILL_GROUPS.map((group, i) => {
            const { Icon } = group;
            return (
              <motion.div key={group.label} {...fadeUp(0.08 + i * 0.08)} className={group.span}>
                <div className="card-surface flex h-full flex-col p-5 sm:p-6">
                  {/* Group header */}
                  <div className="mb-4 flex items-center gap-3 border-b border-[var(--border)] pb-4">
                    <span
                      className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl
                                 bg-[var(--accent-subtle)] text-[var(--accent)]"
                      aria-hidden
                    >
                      <Icon size={18} />
                    </span>
                    <h3 className="text-base font-bold text-[var(--text)]">{group.label}</h3>
                  </div>

                  {/* Skill chips */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <SkillChip key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
