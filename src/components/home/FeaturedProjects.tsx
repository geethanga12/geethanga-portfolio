'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  FiExternalLink,
  FiGithub,
  FiArrowRight,
  FiArrowUpRight,
  FiFileText,
} from 'react-icons/fi';
import { PROJECTS } from '../../data/projects';
import type { Project, ProjectLink } from '../../types/project';

/* ─── Data ─────────────────────────────────────────────────────────────── */

/** Short impact-focused descriptions keyed by slug */
const IMPACT: Record<string, string> = {
  smartbiz:
    'End-to-end ERP-lite for SMEs — sales, inventory, suppliers, expenses, and customer management in a unified full-stack system across web and mobile.',
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
const FEATURED_SLUGS = ['smartbiz', 'iclazz-education', 'royal-weddings', 'pathwise'];

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

/* ─── Premium project card ──────────────────────────────────────────────── */

function PremiumCard({ project, rank }: { project: Project; rank: string }) {
  const impact = IMPACT[project.slug] ?? project.description;
  const catStyle = CATEGORY_STYLE[project.category] ?? CATEGORY_STYLE.personal;
  const catLabel = CATEGORY_LABEL[project.category] ?? project.category;

  const liveLinks = project.links.filter((l) => classifyLink(l) === 'live');
  const githubLinks = project.links.filter((l) => classifyLink(l) === 'github');
  const hasCase = project.caseStudyAvailable;

  const primaryHref = hasCase
    ? `/projects/${project.slug}`
    : liveLinks[0]?.url ?? githubLinks[0]?.url ?? '/projects';

  const pillBase =
    'inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-150';

  return (
    <article className="card-premium group flex h-full flex-col">
      {/* ── Media header ─────────────────────────────────────── */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
        />
        {/* readability gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
          aria-hidden
        />

        {/* Rank chip */}
        <span
          aria-label={`Project ${rank}`}
          className="absolute left-4 top-4 inline-flex items-center justify-center rounded-full
                     bg-black/45 px-2.5 py-1 font-mono text-xs font-bold tabular-nums text-white
                     backdrop-blur-sm ring-1 ring-white/20"
        >
          #{rank}
        </span>

        {/* Category badge */}
        <span
          className={`absolute right-4 top-4 inline-flex items-center rounded-full px-2.5 py-0.5
                      text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm ${catStyle}`}
        >
          {catLabel}
        </span>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <Link
          href={primaryHref}
          target={primaryHref.startsWith('http') ? '_blank' : undefined}
          rel={primaryHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="flex items-start justify-between gap-3 focus-ring rounded-md"
        >
          <h3 className="text-base font-bold leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
            {project.title}
          </h3>
          <FiArrowUpRight
            size={18}
            aria-hidden
            className="mt-0.5 flex-shrink-0 text-[var(--text-muted)] transition-all duration-200
                       group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]"
          />
        </Link>

        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{impact}</p>

        {/* Tech tags */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1" role="list" aria-label="Technologies used">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="rounded-full border border-[var(--border)] bg-[var(--surface)]
                         px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 pt-1">
          {liveLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — live site`}
              className={`${pillBase} border-[var(--green-text)]/30 bg-[var(--green-subtle)] text-[var(--green-text)] hover:bg-[var(--green-text)]/15`}
            >
              <FiExternalLink size={11} aria-hidden />
              Live
            </a>
          ))}

          {githubLinks.length === 1 ? (
            <a
              href={githubLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — repository`}
              className={`${pillBase} border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text)]`}
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
                className={`${pillBase} border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text)]`}
              >
                <FiGithub size={11} aria-hidden />
                {link.name}
              </a>
            ))
          )}

          {hasCase && (
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`${project.title} — case study`}
              className={`${pillBase} border-[var(--accent)]/30 bg-[var(--accent-subtle)] text-[var(--accent)] hover:bg-[var(--accent)]/15`}
            >
              <FiFileText size={11} aria-hidden />
              Case Study
            </Link>
          )}
        </div>
      </div>
    </article>
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
    <section ref={ref} id="projects" aria-labelledby="projects-heading" className="section-spacing">
      <div className="container-page">
        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
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

          <Link href="/projects" className="btn btn-secondary btn-sm shrink-0 self-start sm:self-auto">
            View All Projects
            <FiArrowRight size={14} aria-hidden />
          </Link>
        </motion.div>

        {/* Premium card grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:gap-7">
          {featured.map((project, i) => (
            <motion.div key={project.slug} {...fadeUp(0.1 + i * 0.08)} className="h-full">
              <PremiumCard project={project} rank={String(i + 1).padStart(2, '0')} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div {...fadeUp(0.5)} className="mt-10 flex justify-center">
          <Link href="/projects" className="btn btn-ghost btn-sm text-[var(--text-secondary)] hover:text-[var(--text)]">
            See all {PROJECTS.length} projects
            <FiArrowRight size={14} aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
