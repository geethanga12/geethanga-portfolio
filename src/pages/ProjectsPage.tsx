import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../data/site';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  FiExternalLink,
  FiGithub,
  FiFileText,
  FiArrowUpRight,
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
  { label: 'Total Projects',    value: PROJECTS.length },
  { label: 'Featured',          value: PROJECTS.filter((p) => p.featured).length },
  { label: 'Full-Stack Builds', value: PROJECTS.filter((p) => p.type === 'full-stack').length },
];

/* ─── Visual helpers ────────────────────────────────────────────────────── */

const TYPE_BADGE: Record<ProjectType, string> = {
  'full-stack': 'bg-[var(--accent-subtle)] text-[var(--accent)]',
  'frontend':   'bg-[var(--blue-subtle)] text-[var(--blue-text)]',
  'backend':    'bg-[var(--amber-subtle)] text-[var(--amber-text)]',
};

const TYPE_LABEL: Record<ProjectType, string> = {
  'full-stack': 'Full Stack',
  'frontend':   'Frontend',
  'backend':    'Backend',
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

  const primaryHref = project.caseStudyAvailable
    ? `/projects/${project.slug}`
    : liveLinks[0]?.url ?? githubLinks[0]?.url ?? '/projects';

  const pillBase =
    'inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-150';

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.04 + (index % 6) * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-premium group flex h-full flex-col"
    >
      {/* ── Media header ─────────────────────────────────────── */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
          aria-hidden
        />

        {/* Featured star */}
        {project.featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm ring-1 ring-white/20">
            ★ Featured
          </span>
        )}

        {/* Type badge */}
        {project.type && (
          <span
            className={`absolute right-4 top-4 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm ${TYPE_BADGE[project.type]}`}
          >
            {TYPE_LABEL[project.type]}
          </span>
        )}
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <Link
          to={primaryHref}
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

        {/* Category */}
        <span className="-mt-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {CAT_LABEL[project.category]}
        </span>

        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{project.description}</p>

        {/* Tech tags */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1" role="list" aria-label="Technologies">
          {project.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(liveLinks.length > 0 || githubLinks.length > 0 || project.caseStudyAvailable) && (
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

            {project.caseStudyAvailable && (
              <Link
                to={`/projects/${project.slug}`}
                aria-label={`${project.title} — case study`}
                className={`${pillBase} border-[var(--accent)]/30 bg-[var(--accent-subtle)] text-[var(--accent)] hover:bg-[var(--accent)]/15`}
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
        <div className="container-wide">
          <div ref={headerRef} className="max-w-3xl">
            <motion.div {...fadeUp(headerInView, 0)}>
              <p className="section-eyebrow mb-2">All Work</p>
              <h1 id="archive-heading" className="text-display font-extrabold text-[var(--text)]">
                Project Archive
              </h1>
              <p className="section-desc mt-3 max-w-2xl">
                A curated collection of full-stack, frontend, backend, and production-style
                projects — built during internships, freelance engagements, and personal
                engineering.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeUp(headerInView, 0.15)}
              className="mt-8 flex flex-wrap gap-3"
              aria-label="Project statistics"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
                >
                  <span className="text-2xl font-bold tabular-nums text-[var(--accent)]">
                    {stat.value}
                  </span>
                  <span className="max-w-[6rem] text-xs font-medium leading-tight text-[var(--text-secondary)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Archive grid ────────────────────────────────────────────────── */}
      <section ref={listRef} className="section-spacing-sm pb-20" aria-label="Project list">
        <div className="container-wide">
          {/* Filter bar */}
          <motion.div
            {...fadeUp(listInView, 0)}
            className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2"
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
                  className={`relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold
                              transition-colors duration-150 focus-ring
                              ${isActive
                                ? 'text-white'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text)]'
                              }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-xl bg-[var(--accent)] shadow-sm"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  {label}
                  <span className={`tabular-nums ${isActive ? 'opacity-80' : 'opacity-50'}`}>{count}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Results count */}
          <p className="mb-6 text-xs tabular-nums text-[var(--text-secondary)]" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            {activeFilter !== 'all' && (
              <> matching <span className="font-medium text-[var(--text)]">"{FILTERS.find((f) => f.key === activeFilter)?.label}"</span></>
            )}
          </p>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
              className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-8 py-16 text-center"
              role="status"
              aria-label="No projects found"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)]" aria-hidden>
                <FiBox size={22} />
              </span>
              <div>
                <p className="mb-1 text-sm font-semibold text-[var(--text)]">No projects found</p>
                <p className="text-sm text-[var(--text-secondary)]">No projects match the selected filter.</p>
              </div>
              <button onClick={() => setActiveFilter('all')} className="btn btn-secondary btn-sm">
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
