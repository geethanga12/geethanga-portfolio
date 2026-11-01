import type { CaseStudy, Project } from '../../types/project';
import ProjectFacts from './ProjectFacts';
import ProjectLinks from './ProjectLinks';

export interface PageSection {
  id: string;
  title: string;
}

export default function CaseStudySidebar({
  study,
  project,
  sections,
}: {
  study: CaseStudy;
  project?: Project;
  sections: PageSection[];
}) {
  return (
    <aside
      aria-label="Project summary"
      className="sticky top-24 hidden max-h-[calc(100vh-7rem)] space-y-6 self-start overflow-y-auto border-l border-[var(--border)] pl-6 lg:block"
    >
      <ProjectFacts study={study} project={project} className="space-y-3" />

      {project && project.links.length > 0 && <ProjectLinks links={project.links} stacked />}

      <nav aria-label="On this page" className="border-t border-[var(--border)] pt-4">
        <p className="mb-1 text-[13px] font-medium text-[var(--text-secondary)]">On this page</p>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="focus-ring flex min-h-11 items-center rounded-md text-sm text-[var(--text)] transition-colors duration-150 hover:text-[var(--accent-text)] motion-reduce:transition-none"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
