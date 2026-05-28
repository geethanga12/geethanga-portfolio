import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import { MdCircle } from 'react-icons/md';
import { EXPERIENCE } from '../../data/experience';
import type { ExperienceEntry } from '../../types/experience';

/* ─── Badge colour map ───────────────────────────────────────────── */

const TYPE_STYLE: Record<string, string> = {
  'Full-Time':  'bg-[var(--green-subtle)]  text-[var(--green-text)]',
  'Internship': 'bg-[var(--blue-subtle)]   text-[var(--blue-text)]',
  'Freelance':  'bg-[var(--amber-subtle)]  text-[var(--amber-text)]',
};

/* ─── Component ──────────────────────────────────────────────────── */

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section id="experience" aria-label="Work experience" className="section-spacing-sm">
      <div ref={ref} className="container-page">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title mt-2">Where I&apos;ve Worked</h2>
        </motion.div>

        {/* Timeline list */}
        <div className="relative">

          {/* Vertical line — hidden on mobile, visible from md */}
          <div
            className="hidden md:block absolute left-[1.625rem] top-3 bottom-3 w-px bg-[var(--border)]"
            aria-hidden="true"
          />

          <ol className="space-y-5" aria-label="Work experience timeline">
            {EXPERIENCE.map((exp: ExperienceEntry, i: number) => (
              <motion.li
                key={`${exp.organization}-${exp.period}`}
                {...fadeUp(0.08 + i * 0.1)}
              >
                <div className="md:pl-16 relative">

                  {/* Timeline dot */}
                  <div
                    className="hidden md:flex absolute left-0 top-4 w-[3.25rem] justify-center"
                    aria-hidden="true"
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--surface)] border-2 border-[var(--border)] flex items-center justify-center shadow-sm">
                      <FaBriefcase size={12} className="text-[var(--accent)]" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="card-surface p-5 sm:p-6">

                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[var(--text)] font-bold text-base leading-snug">
                            {exp.title}
                          </h3>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--green-subtle)] text-[var(--green-text)]">
                              <MdCircle size={6} aria-hidden="true" />
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-[var(--accent)] mt-0.5">
                          {exp.organization}
                        </p>
                      </div>

                      {/* Meta: type + location + period */}
                      <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0 text-xs">
                        {exp.type && (
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${TYPE_STYLE[exp.type] ?? 'bg-[var(--surface)] text-[var(--text-muted)]'}`}>
                            {exp.type}
                          </span>
                        )}
                        <span className="text-[var(--text-muted)]">{exp.period}</span>
                        {exp.location && (
                          <span className="flex items-center gap-1 text-[var(--text-muted)]">
                            <FaMapMarkerAlt size={9} aria-hidden="true" />
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      {exp.summary}
                    </p>

                    {/* Highlights */}
                    {exp.highlights.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">
                          Core Impact
                        </p>
                        <ul className="space-y-1.5" aria-label={`Highlights for ${exp.title}`}>
                          {exp.highlights.map((h: string, j: number) => (
                            <li key={j} className="flex gap-2 text-sm text-[var(--text-secondary)]">
                              <span className="mt-[0.4rem] w-1 h-1 rounded-full bg-[var(--accent)] flex-shrink-0" aria-hidden="true" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech tags */}
                    {exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-medium
                                       bg-[var(--surface)] border border-[var(--border)]
                                       text-[var(--text-secondary)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
