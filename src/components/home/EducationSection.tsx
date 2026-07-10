import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { MdWorkspacePremium } from 'react-icons/md';
import { HiMapPin } from 'react-icons/hi2';
import { FiAward } from 'react-icons/fi';
import { EDUCATION } from '../../data/education';
import type { EducationEntry, EducationType } from '../../types/education';

/* ─── Visual config by type ─────────────────────────────────────────────── */

const TYPE_CONFIG: Record<
  EducationType,
  { label: string; Icon: React.ElementType; badgeStyle: string }
> = {
  degree: {
    label: 'Degree',
    Icon: FaGraduationCap,
    badgeStyle: 'bg-[var(--accent-subtle)] text-[var(--accent)]',
  },
  diploma: {
    label: 'Higher National Diploma',
    Icon: HiAcademicCap,
    badgeStyle: 'bg-[var(--blue-subtle)] text-[var(--blue-text)]',
  },
  certification: {
    label: 'Certification',
    Icon: MdWorkspacePremium,
    badgeStyle: 'bg-[var(--amber-subtle)] text-[var(--amber-text)]',
  },
  training: {
    label: 'Training',
    Icon: FaLaptopCode,
    badgeStyle: 'bg-[var(--green-subtle)] text-[var(--green-text)]',
  },
};

/* ─── Section ───────────────────────────────────────────────────────────── */

export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section id="education" aria-labelledby="education-heading" className="section-spacing">
      <div ref={ref} className="container-page">
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

        {/* Timeline — mirrors the Experience section layout */}
        <div className="relative">
          {/* Vertical line — hidden on mobile, visible from md */}
          <div
            className="absolute left-[1.625rem] top-3 bottom-3 hidden w-px bg-[var(--border)] md:block"
            aria-hidden="true"
          />

          <ol className="space-y-5" aria-label="Education timeline">
            {EDUCATION.map((entry: EducationEntry, i: number) => {
              const config = TYPE_CONFIG[entry.type];
              const { Icon } = config;

              return (
                <motion.li key={`${entry.institution}-${entry.period}`} {...fadeUp(0.08 + i * 0.1)}>
                  <div className="relative md:pl-16">
                    {/* Timeline node */}
                    <div
                      className="absolute left-0 top-4 hidden w-[3.25rem] justify-center md:flex"
                      aria-hidden="true"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--surface)] shadow-sm">
                        <Icon size={13} className="text-[var(--accent)]" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="card-surface p-5 sm:p-6">
                      {/* Top row */}
                      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold leading-snug text-[var(--text)]">
                              {entry.degree}
                            </h3>
                            {entry.current && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--green-subtle)] px-2 py-0.5 text-[10px] font-semibold text-[var(--green-text)]">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--green-text)]" aria-hidden />
                                Current
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-sm font-semibold text-[var(--accent)]">
                            {entry.institution}
                          </p>
                          {entry.grade && (
                            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)] ring-1 ring-[var(--accent)]/20">
                              <FiAward size={12} aria-hidden className="flex-shrink-0" />
                              Grade: {entry.grade}
                            </span>
                          )}
                        </div>

                        {/* Meta: type + period + location */}
                        <div className="flex flex-shrink-0 flex-col items-start gap-1 text-xs sm:items-end">
                          <span className={`rounded-full px-2 py-0.5 font-semibold ${config.badgeStyle}`}>
                            {config.label}
                          </span>
                          <span className="text-[var(--text-muted)]">{entry.period}</span>
                          {entry.location && (
                            <span className="flex items-center gap-1 text-right text-[var(--text-muted)]">
                              <HiMapPin size={11} aria-hidden className="flex-shrink-0" />
                              {entry.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {entry.description && (
                        <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {entry.description}
                        </p>
                      )}

                      {/* Achievement bullets */}
                      {entry.bullets && entry.bullets.length > 0 && (
                        <ul className="mb-4 space-y-1.5" aria-label={`Highlights for ${entry.degree}`}>
                          {entry.bullets.map((b) => (
                            <li key={b} className="flex gap-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                              <span className="mt-[0.45rem] h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Key subjects */}
                      {entry.highlights && entry.highlights.length > 0 && (
                        <div>
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                            Key Focus Areas
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {entry.highlights.map((h) => (
                              <span
                                key={h}
                                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
