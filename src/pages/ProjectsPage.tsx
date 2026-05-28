import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../data/site';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  FiExternalLink,
  FiGithub,
  FiFileText,
  FiLayers,
  FiBox,
} from 'react-icons/fi';
import SEO from '../components/SEO';
import { PROJECTS } from '../data/projects';
import type { Project, ProjectLink, ProjectType } from '../types/project';

/* ─── Filter config ─────────────────────────────────────────────────────── */

type FilterKey = 'all' | 'featured' | 'full-stack' | 'frontend' | 'backend' | 'internship';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',        label: 'All' },
  { key: 'featured',   label: 'Featured' },
  { key: 'full-stack', label: 'Full Stack' },
  { key: 'frontend',   label: 'Frontend' },
  { key: 'backend',    label: 'Backend' },
  { key: 'internship', label: 'Internship' },
];

function applyFilter(projects: Project[], filter: FilterKey): Project[] {
  switch (filter) {
    case 'featured':   return projects.filter((p) => p.featured);
    case 'full-stack': return projects.filter((p) => p.type === 'full-stack');
    case 'frontend':   return projects.filter((p) => p.type === 'frontend');
    case 'backend':    return projects.filter((p) => p.type === 'backend');
    case 'internship': return projects.filter((p) => p.category === 'internship');
    default:           return projects;
  }
}

/* ─── Stats ─────────────────────────────────────────────────────────────── */

const STATS = [
  { label: 'Total Projects',   value: PROJECTS.length },
  { label: 'Featured',         value: PROJECTS.filter((p) => p.featured).length },
  { label: 'Full-Stack Builds', value: PROJECTS.filter((p) => p.type === 'full-stack').length },
];

/* ─── Visual helpers ────────────────────────────────────────────────────── */

const AVATAR_PALETTE = [
  'bg-[var(--accent-subtle)] text-[var(--accent)]',
  'bg-[var(--green-subtle)] text-[var(--green-text)]',
  'bg-[var(--amber-subtle)] text-[var(--amber-text)]',
  'bg-[var(--blue-subtle)] text-[var(--blue-text)]',
];

function avatarColor(slug: string): string {
  const sum = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}

const TYPE_BADGE: Record<ProjectType, string> = {
  'full-stack': 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent)]/20',
  'frontend':   'bg-[var(--blue-subtle)] text-[var(--blue-text)] border-[var(--blue-text)]/20',
  'backend':    'bg-[var(--amber-subtle)] text-[var(--amber-text)] border-[var(--amber-text)]/20',
};

const TYPE_LABEL: Record<ProjectType, string> = {
  'full-stack': 'Full Stack',
  'frontend':   'Frontend',
  'backend':    'Backend',
};

const CAT_BADGE: Record<string, string> = {
  internship: 'bg-[var(--green-subtle)] text-[var(--green-text)] border-[var(--green-text)]/20',
  personal:   'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)]',
  academic:   'bg-[var(--amber-subtle)] text-[var(--amber-text)] border-[var(--amber-text)]/20',
};

const CAT_LABEL: Record<string, string> = {
  internship: 'Internship',
  personal:   'Personal',
  academic:   'Academic',
};

/* ─── Link classifier ───────────────────────────────────────────────────── */

function classifyLink(link: ProjectLink): 'live' | 'github' | 'other' {
  const l = link.name.toLowerCase();
  if (l.includes('live') || l.includes('site') || l.includes('demo')) return 'live';
  if (
    l.includes('github') || l.includes('repo') ||
    l.includes('backend') || l.includes('frontend') ||
    l.includes('mobile') || l.includes('source') || l.includes('repository')
  ) return 'github';
  return 'other';
}

/* ─── Project card ──────────────────────────────────────────────────────── */

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const shouldReduce = useReducedMotion();
  const liveLinks   = project.links.filter((l) => classifyLink(l) === 'live');
  const githubLinks = project.links.filter((l) => classifyLink(l) === 'github');
  const initials    = project.title.slice(0, 2).toUpperCase();
  const color       = avatarColor(project.slug);

  const btnBase =
    'inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-150';

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.05 + index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]
                 px-5 py-5 hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]
                 transition-colors duration-200"
    >
      {/* Letter avatar */}
      <span
        className={`shrink-0 hidden sm:inline-flex items-center justify-center
                    w-11 h-11 rounded-xl font-bold text-sm select-none ${color}`}
        aria-hidden
      >
        {initials}
      </span>

      {/* Main content */}
      <div className="min-w-0 flex-1 flex flex-col gap-2.5">

        {/* Title + badges */}
        <div className="flex flex-wrap items-start gap-x-2 gap-y-1.5">
          {project.caseStudyAvailable ? (
            <Link
              to={`/projects/${project.slug}`}
              className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]
                         transition-colors duration-150 leading-snug"
            >
              {project.title}
            </Link>
          ) : (
            <h3 className="text-sm font-semibold text-[var(--text)] leading-snug">
              {project.title}
            </h3>
          )}

          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20">
                ★ Featured
              </span>
            )}
            {project.type && (
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${TYPE_BADGE[project.type]}`}>
                {TYPE_LABEL[project.type]}
              </span>
            )}
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${CAT_BADGE[project.category]}`}>
              {CAT_LABEL[project.category]}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
          {project.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full
                         bg-[var(--bg)] border border-[var(--border)] text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(liveLinks.length > 0 || githubLinks.length > 0 || project.caseStudyAvailable) && (
          <div className="flex flex-wrap gap-2 pt-0.5">
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

            {githubLinks.length === 1 ? (
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
            )}

            {project.caseStudyAvailable && (
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
        )}

      </div>
    </motion.article>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const filtered = applyFilter(PROJECTS, activeFilter);

  const headerRef = useRef<HTMLDivElement>(null);
  const listRef   = useRef<HTMLElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const listInView   = useInView(listRef,   { once: true, margin: '-4%' });
  const shouldReduce = useReducedMotion();

  const fadeUp = (inView: boolean, delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <>
      <SEO
        title="Projects — Geethanga Dissanayake"
        description="Full-stack, frontend, and production-style web projects by Geethanga Dissanayake — Spring Boot, React, Next.js, MySQL, AWS and more."
        canonical={`${SITE_URL}/projects`}
      />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section className="section-spacing-sm" aria-labelledby="archive-heading">
        <div className="container-page">
          <div ref={headerRef}>
            <motion.div {...fadeUp(headerInView, 0)}>
              <p className="section-eyebrow mb-2">All Work</p>
              <h1 id="archive-heading" className="section-title">
                Project Archive
              </h1>
              <p className="section-desc mt-3 max-w-xl">
                A curated collection of full-stack, frontend, backend, and
                production-style projects — built during internships, freelance
                engagements, and personal engineering.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeUp(headerInView, 0.15)}
              className="mt-8 flex flex-wrap gap-4"
              aria-label="Project statistics"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-lg border border-[var(--border)]
                             bg-[var(--surface)] px-4 py-3"
                >
                  <span className="text-2xl font-bold tabular-nums text-[var(--text)]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] font-medium leading-tight max-w-[6rem]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Archive list ────────────────────────────────────────────────── */}
      <section
        ref={listRef}
        className="section-spacing-sm pb-20"
        aria-labelledby="archive-heading"
      >
        <div className="container-page">

          {/* Filter bar */}
          <motion.div
            {...fadeUp(listInView, 0)}
            className="mb-6 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter projects"
          >
            {FILTERS.map(({ key, label }) => {
              const count = key === 'all' ? PROJECTS.length : applyFilter(PROJECTS, key).length;
              const isActive = activeFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2
                              rounded-full border transition-colors duration-150 focus-ring
                              ${isActive
                                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm'
                                : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                              }`}
                >
                  {label}
                  <span
                    className={`tabular-nums ${isActive ? 'opacity-75' : 'opacity-50'}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Results count */}
          <p className="text-xs text-[var(--text-secondary)] mb-5 tabular-nums" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            {activeFilter !== 'all' && (
              <> matching <span className="font-medium text-[var(--text)]">"{FILTERS.find(f => f.key === activeFilter)?.label}"</span></>
            )}
          </p>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={`${activeFilter}-${project.slug}`}
                  project={project}
                  index={i}
                  inView={listInView}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div
              className="flex flex-col items-center justify-center gap-4 rounded-xl
                         border border-[var(--border)] bg-[var(--surface)]
                         py-16 px-8 text-center"
              role="status"
              aria-label="No projects found"
            >
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl
                           bg-[var(--accent-subtle)] text-[var(--accent)]"
                aria-hidden
              >
                <FiBox size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--text)] mb-1">
                  No projects found
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  No projects match the selected filter.
                </p>
              </div>
              <button
                onClick={() => setActiveFilter('all')}
                className="btn btn-secondary btn-sm"
              >
                <FiLayers size={14} aria-hidden />
                Show all projects
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
