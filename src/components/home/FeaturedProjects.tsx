import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  FiExternalLink,
  FiGithub,
  FiArrowRight,
  FiFileText,
} from 'react-icons/fi';
import { PROJECTS } from '../../data/projects';
import type { Project, ProjectLink } from '../../types/project';

/* ─── Data ─────────────────────────────────────────────────────────────── */

/** Short impact-focused descriptions keyed by slug */
const IMPACT: Record<string, string> = {
  smartbiz:
    'End-to-end ERP-lite for SMEs — covers sales, inventory, suppliers, expenses, and customer management in a unified full-stack system across web and mobile.',
  'iclazz-education':
    'Role-gated education platform serving students, tutors, and coordinators with class lifecycle management, attendance, and calendar tooling. Live in production.',
  'royal-weddings':
    'Production wedding brand site built with Next.js — componentized CMS flows, SEO-conscious architecture, and fully responsive UI shipped during internship.',
  pathwise:
    'AI-assisted dual-module platform matching student career growth profiles with employer-aligned hiring pathways and structured progression dashboards.',
};

const CATEGORY_STYLE: Record<string, string> = {
  personal:
    'bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20',
  internship:
    'bg-[var(--green-subtle)] text-[var(--green-text)] border border-[var(--green-text)]/20',
  academic:
    'bg-[var(--amber-subtle)] text-[var(--amber-text)] border border-[var(--amber-text)]/20',
};

const CATEGORY_LABEL: Record<string, string> = {
  personal: 'Personal',
  internship: 'Internship',
  academic: 'Academic',
};

/** Ordered slugs for the featured list */
const FEATURED_SLUGS = [
  'smartbiz',
  'iclazz-education',
  'royal-weddings',
  'pathwise',
];

const featured: Project[] = FEATURED_SLUGS
  .map((slug) => PROJECTS.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

/* ─── Link helpers ──────────────────────────────────────────────────────── */

type LinkKind = 'live' | 'github' | 'other';

function classifyLink(link: ProjectLink): LinkKind {
  const lower = link.name.toLowerCase();
  if (lower.includes('live') || lower.includes('site') || lower.includes('demo'))
    return 'live';
  if (
    lower.includes('github') ||
    lower.includes('repo') ||
    lower.includes('backend') ||
    lower.includes('frontend') ||
    lower.includes('mobile') ||
    lower.includes('source')
  )
    return 'github';
  return 'other';
}

/* ─── Sub-components ────────────────────────────────────────────────────── */

function ProjectLinks({
  project,
}: {
  project: Project;
}) {
  const liveLinks = project.links.filter((l) => classifyLink(l) === 'live');
  const githubLinks = project.links.filter((l) => classifyLink(l) === 'github');
  const hasCase = project.caseStudyAvailable;

  const btnBase =
    'inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-150';

  return (
    <div className="flex flex-wrap gap-2">
      {liveLinks.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — live site`}
          className={`${btnBase} border-[var(--green-text)]/30 text-[var(--green-text)] bg-[var(--green-subtle)] hover:bg-[var(--green-text)]/15`}
        >
          <FiExternalLink size={11} aria-hidden />
          Live
        </a>
      ))}

      {githubLinks.length > 0 && (
        githubLinks.length === 1 ? (
          <a
            href={githubLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — repository`}
            className={`${btnBase} border-[var(--border)] text-[var(--text-secondary)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:text-[var(--text)]`}
          >
            <FiGithub size={11} aria-hidden />
            GitHub
          </a>
        ) : (
          githubLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${link.name}`}
              className={`${btnBase} border-[var(--border)] text-[var(--text-secondary)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:text-[var(--text)]`}
            >
              <FiGithub size={11} aria-hidden />
              {link.name}
            </a>
          ))
        )
      )}

      {hasCase && (
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`${project.title} — case study`}
          className={`${btnBase} border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent-subtle)] hover:bg-[var(--accent)]/15`}
        >
          <FiFileText size={11} aria-hidden />
          Case Study
        </Link>
      )}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */

export default function FeaturedProjects() {
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
      id="projects"
      aria-labelledby="projects-heading"
      className="section-spacing"
    >
      <div className="container-page">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="section-eyebrow mb-2">Selected Work</p>
            <h2 id="projects-heading" className="section-title">
              Featured Projects
            </h2>
            <p className="section-desc mt-2 max-w-xl">
              A curated set of full-stack builds — spanning production SaaS, internship
              deliverables, and personal engineering.
            </p>
          </div>

          <Link
            to="/projects"
            className="btn btn-secondary btn-sm shrink-0 self-start sm:self-auto"
          >
            View All Projects
            <FiArrowRight size={14} aria-hidden />
          </Link>
        </motion.div>

        {/* Project list */}
        <ol className="space-y-4" aria-label="Featured projects">
          {featured.map((project, i) => {
            const rank = String(i + 1).padStart(2, '0');
            const impact = IMPACT[project.slug] ?? project.description;
            const catStyle =
              CATEGORY_STYLE[project.category] ??
              CATEGORY_STYLE.personal;
            const catLabel = CATEGORY_LABEL[project.category] ?? project.category;

            return (
              <motion.li
                key={project.slug}
                {...fadeUp(0.1 + i * 0.07)}
              >
                <article
                  className="group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5
                             hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]
                             transition-colors duration-200"
                >
                  {/* Top row */}
                  <div className="flex items-start gap-4">
                    {/* Rank */}
                    <span
                      aria-label={`Project ${rank}`}
                      className="shrink-0 mt-0.5 font-mono text-sm font-bold tabular-nums
                                 text-[var(--accent)] opacity-70 w-7 select-none"
                    >
                      #{rank}
                    </span>

                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      {/* Title row + badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-sm font-semibold text-[var(--text)] leading-snug">
                          {project.title}
                        </h3>
                        <span
                          className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-wider
                                       px-2 py-0.5 rounded-full ${catStyle}`}
                        >
                          {catLabel}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3 max-w-3xl">
                        {impact}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4" role="list" aria-label="Technologies used">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            role="listitem"
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full
                                       bg-[var(--bg)] border border-[var(--border)]
                                       text-[var(--text-secondary)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <ProjectLinks project={project} />
                    </div>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ol>

        {/* Bottom CTA */}
        <motion.div {...fadeUp(0.5)} className="mt-8 flex justify-center">
          <Link
            to="/projects"
            className="btn btn-ghost btn-sm text-[var(--text-secondary)] hover:text-[var(--text)]"
          >
            See all {PROJECTS.length} projects
            <FiArrowRight size={14} aria-hidden />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
