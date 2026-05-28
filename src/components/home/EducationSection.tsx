import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { MdWorkspacePremium } from 'react-icons/md';
import { HiMapPin, HiCalendar } from 'react-icons/hi2';
import { EDUCATION } from '../../data/education';
import type { EducationEntry, EducationType } from '../../types/education';

/* ─── Visual config by type ─────────────────────────────────────────────── */

const TYPE_CONFIG: Record<
  EducationType,
  { label: string; Icon: React.ElementType; cardAccent: string; badgeStyle: string }
> = {
  degree: {
    label: 'Degree',
    Icon: FaGraduationCap,
    cardAccent: 'border-l-[var(--accent)]',
    badgeStyle:
      'bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20',
  },
  diploma: {
    label: 'Diploma',
    Icon: HiAcademicCap,
    cardAccent: 'border-l-[var(--green-text)]',
    badgeStyle:
      'bg-[var(--green-subtle)] text-[var(--green-text)] border border-[var(--green-text)]/20',
  },
  certification: {
    label: 'Certification',
    Icon: MdWorkspacePremium,
    cardAccent: 'border-l-[var(--amber-text)]',
    badgeStyle:
      'bg-[var(--amber-subtle)] text-[var(--amber-text)] border border-[var(--amber-text)]/20',
  },
};

/* ─── Single card ───────────────────────────────────────────────────────── */

function EducationCard({ entry }: { entry: EducationEntry }) {
  const config = TYPE_CONFIG[entry.type];
  const { Icon } = config;

  return (
    <article
      className={`relative rounded-xl border border-[var(--border)] border-l-4 ${config.cardAccent}
                  bg-[var(--surface)] px-5 py-5
                  hover:border-r-[var(--border-strong)] hover:border-t-[var(--border-strong)]
                  hover:border-b-[var(--border-strong)] hover:bg-[var(--surface-raised)]
                  transition-colors duration-200 h-full flex flex-col gap-4`}
    >
      {/* Top row: icon + type badge + period */}
      <div className="flex items-start justify-between gap-3">
        {/* Icon badge */}
        <span
          className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--accent-subtle)]"
          aria-hidden
        >
          <Icon size={18} className="text-[var(--accent)]" />
        </span>

        {/* Right: type badge + period */}
        <div className="flex flex-wrap items-center gap-2 mt-0.5">
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badgeStyle}`}
          >
            {config.label}
          </span>
          {entry.current && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--green-subtle)] text-[var(--green-text)] border border-[var(--green-text)]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green-text)] animate-pulse" aria-hidden />
              Current
            </span>
          )}
        </div>
      </div>

      {/* Degree title */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-[var(--text)] leading-snug mb-1">
          {entry.degree}
        </h3>

        {/* Institution */}
        <p className="text-sm font-medium text-[var(--accent)] mb-1">
          {entry.institution}
        </p>

        {/* Meta row: period + location */}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mb-3">
          <span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
            <HiCalendar size={11} aria-hidden />
            {entry.period}
          </span>
          {entry.location && (
            <span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <HiMapPin size={11} aria-hidden />
              {entry.location}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {entry.description}
        </p>
      </div>

      {/* Highlights */}
      {entry.highlights && entry.highlights.length > 0 && (
        <ul className="flex flex-col gap-1.5" aria-label="Key subjects">
          {entry.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
            >
              <span
                className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[var(--accent)] opacity-60"
                aria-hidden
              />
              {h}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────── */

export default function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section
      ref={ref}
      id="education"
      aria-labelledby="education-heading"
      className="section-spacing"
    >
      <div className="container-page">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <p className="section-eyebrow mb-2">Academic Background</p>
          <h2 id="education-heading" className="section-title">
            Education
          </h2>
          <p className="section-desc mt-2 max-w-lg">
            Formal qualifications in computer science and software engineering,
            building a strong foundation for full-stack and systems work.
          </p>
        </motion.div>

        {/* Cards grid — 1 col mobile, 2 col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EDUCATION.map((entry, i) => (
            <motion.div key={`${entry.institution}-${entry.period}`} {...fadeUp(0.12 + i * 0.1)}>
              <EducationCard entry={entry} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
