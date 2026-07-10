import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiUser,
  FiExternalLink,
  FiGithub,
  FiAlertCircle,
  FiTarget,
  FiCheckCircle,
  FiTrendingUp,
} from 'react-icons/fi';
import { CASE_STUDIES, PROJECTS } from '../data/projects';
import type { ProjectLink } from '../types/project';
import SEO from '../components/SEO';
import { SITE_URL } from '../data/site';

/* ─── Link classifier (shared pattern with Projects page) ───────────────── */

function classifyLink(link: ProjectLink): 'live' | 'github' | 'other' {
  const l = link.name.toLowerCase();
  if (l.includes('live') || l.includes('site') || l.includes('demo')) return 'live';
  if (
    l.includes('github') || l.includes('repo') || l.includes('backend') ||
    l.includes('frontend') || l.includes('mobile') || l.includes('source')
  ) return 'github';
  return 'other';
}

/* ─── Not-found state ───────────────────────────────────────────────────── */

function NotFound() {
  return (
    <>
      <SEO
        title="Case Study Not Found · Geethanga Dissanayake"
        description="The requested case study is not available."
        noIndex
      />
      <section className="section-spacing">
        <div className="container-page">
          <div className="mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-8 text-center shadow-sm sm:p-10">
            <h1 className="mb-3 text-2xl font-bold text-[var(--text)]">Case Study Not Found</h1>
            <p className="mb-6 text-[var(--text-secondary)]">
              The requested case study is not available or may have moved.
            </p>
            <Link to="/projects" className="btn btn-primary btn-sm">
              <FiArrowLeft size={14} aria-hidden />
              Back to Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

const METRIC_ICONS = [FiTarget, FiTrendingUp, FiCheckCircle] as const;

const ProjectDetailsPage = () => {
  const { slug } = useParams();
  const study = CASE_STUDIES.find((item) => item.slug === slug);
  const project = PROJECTS.find((p) => p.slug === slug);
  const shouldReduce = useReducedMotion();

  if (!study) return <NotFound />;

  const metaDesc =
    study.problem.length > 155 ? study.problem.slice(0, 152) + '…' : study.problem;

  const liveLinks = project?.links.filter((l) => classifyLink(l) === 'live') ?? [];
  const githubLinks = project?.links.filter((l) => classifyLink(l) === 'github') ?? [];

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  });

  const pill =
    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-150';

  return (
    <>
      <SEO
        title={`${study.title} — Case Study · Geethanga Dissanayake`}
        description={metaDesc}
        canonical={`${SITE_URL}/projects/${study.slug}`}
      />

      <article className="section-spacing-sm pb-20">
        <div className="container-page max-w-4xl">
          {/* Back link */}
          <motion.div {...fade(0)}>
            <Link
              to="/projects"
              className="group mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] focus-ring rounded-md"
            >
              <FiArrowLeft size={15} aria-hidden className="transition-transform group-hover:-translate-x-0.5" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header {...fade(0.06)} className="mb-8">
            <p className="section-eyebrow mb-2">Case Study</p>
            <h1 className="text-display font-extrabold leading-tight text-[var(--text)]">
              {study.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--text-secondary)]">
              <span className="inline-flex items-center gap-1.5">
                <FiUser size={14} aria-hidden className="text-[var(--accent)]" />
                {study.role}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiCalendar size={14} aria-hidden className="text-[var(--accent)]" />
                {study.timeline}
              </span>
            </div>
          </motion.header>

          {/* Banner image */}
          {project?.image && (
            <motion.div
              {...fade(0.12)}
              className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow-lg)]"
            >
              <div className="relative aspect-[16/7]">
                <img
                  src={project.image}
                  alt={`${study.title} preview`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden />
              </div>
            </motion.div>
          )}

          {/* Tech stack */}
          <motion.section {...fade(0.16)} className="mb-10">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--accent)]/20 bg-[var(--accent-subtle)] px-3 py-1 text-sm font-medium text-[var(--accent)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Problem */}
          <motion.section {...fade(0.2)} className="mb-10">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--amber-subtle)] text-[var(--amber-text)]" aria-hidden>
                <FiTarget size={17} />
              </span>
              <h2 className="text-lg font-bold text-[var(--text)]">The Problem</h2>
            </div>
            <p className="leading-relaxed text-[var(--text-secondary)]">{study.problem}</p>
          </motion.section>

          {/* Solution */}
          <motion.section {...fade(0.24)} className="mb-10">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)]" aria-hidden>
                <FiCheckCircle size={17} />
              </span>
              <h2 className="text-lg font-bold text-[var(--text)]">The Solution</h2>
            </div>
            <ul className="space-y-3">
              {study.solution.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-[var(--text-secondary)]">
                  <FiArrowRight size={16} aria-hidden className="mt-1 flex-shrink-0 text-[var(--accent)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Impact */}
          <motion.section {...fade(0.28)} className="mb-10">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--green-subtle)] text-[var(--green-text)]" aria-hidden>
                <FiTrendingUp size={17} />
              </span>
              <h2 className="text-lg font-bold text-[var(--text)]">Impact</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {study.impactMetrics.map((metric, i) => {
                const Icon = METRIC_ICONS[i % METRIC_ICONS.length];
                return (
                  <div key={metric.label} className="card-surface flex flex-col gap-2 p-5">
                    <Icon size={18} className="text-[var(--accent)]" aria-hidden />
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      {metric.label}
                    </p>
                    <p className="text-base font-bold leading-snug text-[var(--text)]">{metric.value}</p>
                    {metric.note && (
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{metric.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Disclosure */}
          <motion.section
            {...fade(0.32)}
            className="mb-10 flex gap-3 rounded-xl border border-[var(--amber-text)]/25 bg-[var(--amber-subtle)] p-4 text-sm text-[var(--amber-text)]"
          >
            <FiAlertCircle size={16} aria-hidden className="mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              <strong className="font-semibold">Disclosure: </strong>
              {study.sanitizedNotes}
            </p>
          </motion.section>

          {/* Footer actions */}
          <motion.footer
            {...fade(0.36)}
            className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-8"
          >
            <Link to="/projects" className="btn btn-secondary btn-sm">
              <FiArrowLeft size={14} aria-hidden />
              All Projects
            </Link>

            {liveLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pill} border-[var(--green-text)]/30 bg-[var(--green-subtle)] text-[var(--green-text)] hover:bg-[var(--green-text)]/15`}
              >
                <FiExternalLink size={12} aria-hidden />
                Live Site
              </a>
            ))}

            {githubLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pill} border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text)]`}
              >
                <FiGithub size={12} aria-hidden />
                {link.name}
              </a>
            ))}
          </motion.footer>
        </div>
      </article>
    </>
  );
};

export default ProjectDetailsPage;
