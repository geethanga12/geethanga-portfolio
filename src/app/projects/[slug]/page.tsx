import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
import { CASE_STUDIES, PROJECTS } from '../../../data/projects';
import type { ProjectLink } from '../../../types/project';
import { SITE_URL } from '../../../data/site';

const METRIC_ICONS = [FiTarget, FiTrendingUp, FiCheckCircle] as const;

function classifyLink(link: ProjectLink): 'live' | 'github' | 'other' {
  const l = link.name.toLowerCase();
  if (l.includes('live') || l.includes('site') || l.includes('demo')) return 'live';
  if (
    l.includes('github') || l.includes('repo') || l.includes('backend') ||
    l.includes('frontend') || l.includes('mobile') || l.includes('source')
  ) return 'github';
  return 'other';
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const study = CASE_STUDIES.find((item) => item.slug === params.slug);
  if (!study) {
    return {
      title: 'Case Study Not Found',
    };
  }
  const metaDesc =
    study.problem.length > 155 ? study.problem.slice(0, 152) + '…' : study.problem;

  return {
    title: `${study.title} — Case Study`,
    description: metaDesc,
    alternates: {
      canonical: `${SITE_URL}/projects/${study.slug}`,
    },
  };
}

export default function ProjectDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = CASE_STUDIES.find((item) => item.slug === params.slug);
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!study) {
    notFound();
  }

  const liveLinks = project?.links.filter((l) => classifyLink(l) === 'live') ?? [];
  const githubLinks = project?.links.filter((l) => classifyLink(l) === 'github') ?? [];

  const pill =
    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-150';

  return (
    <article className="section-spacing-sm pb-20">
      <div className="container-page max-w-4xl">
        <div>
          <Link
            href="/projects"
            className="group mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] focus-ring rounded-md"
          >
            <FiArrowLeft size={15} aria-hidden className="transition-transform group-hover:-translate-x-0.5" />
            Back to Projects
          </Link>
        </div>

        <header className="mb-8">
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
        </header>

        {project?.image && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow-lg)]">
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
          </div>
        )}

        <section className="mb-10">
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
        </section>

        <section className="mb-10">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--amber-subtle)] text-[var(--amber-text)]" aria-hidden>
              <FiTarget size={17} />
            </span>
            <h2 className="text-lg font-bold text-[var(--text)]">The Problem</h2>
          </div>
          <p className="leading-relaxed text-[var(--text-secondary)]">{study.problem}</p>
        </section>

        <section className="mb-10">
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
        </section>

        <section className="mb-10">
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
        </section>

        <section className="mb-10 flex gap-3 rounded-xl border border-[var(--amber-text)]/25 bg-[var(--amber-subtle)] p-4 text-sm text-[var(--amber-text)]">
          <FiAlertCircle size={16} aria-hidden className="mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Disclosure: </strong>
            {study.sanitizedNotes}
          </p>
        </section>

        <footer className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-8">
          <Link href="/projects" className="btn btn-secondary btn-sm">
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
        </footer>
      </div>
    </article>
  );
}
