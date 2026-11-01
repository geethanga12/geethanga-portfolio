import type { CaseStudy, Project } from '../../types/project';
import { STATUS_LABEL } from './CaseStudyHeader';

export default function ProjectFacts({
  study,
  project,
  className = '',
}: {
  study: CaseStudy;
  project?: Project;
  className?: string;
}) {
  const facts = [
    { label: 'Role', value: study.role },
    { label: 'Context', value: study.context },
    { label: 'Timeline', value: study.timeline },
    { label: 'Team', value: study.team },
    { label: 'Status', value: project?.status && STATUS_LABEL[project.status] },
  ].filter((fact) => fact.value);

  return (
    <dl className={className}>
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="text-[13px] font-medium text-[var(--text-secondary)]">{fact.label}</dt>
          <dd className="mt-0.5 text-sm font-semibold leading-snug text-[var(--text)]">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
