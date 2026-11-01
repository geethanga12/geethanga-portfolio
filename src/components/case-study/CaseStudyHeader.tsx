import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import type { CaseStudy, Project, ProjectCategory, ProjectStatus } from '../../types/project';
import ProjectLinks from './ProjectLinks';
import { TEXT_LINK } from './styles';

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  professional: 'Professional',
  internship: 'Internship',
  personal: 'Personal',
  academic: 'Academic',
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
};

const STATUS_STYLE: Record<ProjectStatus, string> = {
  live: 'bg-[var(--green-subtle)] text-[var(--green-text)]',
  'in-development': 'bg-[var(--amber-subtle)] text-[var(--amber-text)]',
};

export default function CaseStudyHeader({ study, project }: { study: CaseStudy; project?: Project }) {
  return (
    <header className="mb-10">
      <Link href="/projects" className={`${TEXT_LINK} mb-5`}>
        <FiArrowLeft size={15} aria-hidden />
        Back to Projects
      </Link>

      {project && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[var(--border-strong)] px-3 py-1 text-[13px] font-medium text-[var(--text-secondary)]">
            {CATEGORY_LABEL[project.category]}
          </span>
          {project.status && (
            <span className={`rounded-full px-3 py-1 text-[13px] font-semibold ${STATUS_STYLE[project.status]}`}>
              {STATUS_LABEL[project.status]}
            </span>
          )}
        </div>
      )}

      <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-5xl">{study.title}</h1>
      <p className="mt-3 max-w-[60ch] text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">{study.subtitle}</p>

      {project && project.links.length > 0 && (
        <div className="mt-6">
          <ProjectLinks links={project.links} />
        </div>
      )}
    </header>
  );
}
