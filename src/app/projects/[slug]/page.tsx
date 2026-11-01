import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES, PROJECTS } from '../../../data/projects';
import { SITE_NAME, SITE_URL } from '../../../data/site';
import ArchitectureDiagram from '../../../components/case-study/ArchitectureDiagram';
import CaseStudyFooter from '../../../components/case-study/CaseStudyFooter';
import CaseStudyHeader from '../../../components/case-study/CaseStudyHeader';
import CaseStudySidebar from '../../../components/case-study/CaseStudySidebar';
import EngineeringHighlights from '../../../components/case-study/EngineeringHighlights';
import FeatureGrid from '../../../components/case-study/FeatureGrid';
import KeyMetrics from '../../../components/case-study/KeyMetrics';
import ProjectFacts from '../../../components/case-study/ProjectFacts';
import ScreenshotGallery from '../../../components/case-study/ScreenshotGallery';
import Section from '../../../components/case-study/Section';
import TechStack from '../../../components/case-study/TechStack';

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
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

  const project = PROJECTS.find((p) => p.slug === params.slug);
  const title = `${study.title} - Case Study | ${SITE_NAME}`;
  const url = `${SITE_URL}/projects/${study.slug}`;
  const images = project?.image ? [project.image] : undefined;

  return {
    // absolute: the root layout's title template would add the name a second time
    title: { absolute: title },
    description: study.subtitle,
    alternates: { canonical: url },
    openGraph: { type: 'article', siteName: SITE_NAME, title, description: study.subtitle, url, images },
    twitter: { card: 'summary_large_image', title, description: study.subtitle, images },
  };
}

export default function ProjectDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const index = CASE_STUDIES.findIndex((item) => item.slug === params.slug);
  if (index === -1) {
    notFound();
  }

  const study = CASE_STUDIES[index];
  const project = PROJECTS.find((p) => p.slug === params.slug);

  const hasScreenshots = Boolean(study.screenshots?.length);
  const hasFeatures = Boolean(study.features?.length);
  const hasContributions = Boolean(study.contributions?.length);
  const hasHighlights = Boolean(study.highlights?.length);

  const sections = [
    { id: 'screenshots', title: 'Screenshots', shown: hasScreenshots },
    { id: 'overview', title: 'Overview', shown: true },
    { id: 'features', title: 'Key features', shown: hasFeatures },
    { id: 'contributions', title: 'My role and contributions', shown: hasContributions },
    { id: 'highlights', title: 'Engineering highlights', shown: hasHighlights },
    { id: 'architecture', title: 'Architecture', shown: Boolean(study.architecture) },
    { id: 'stack', title: 'Tech stack', shown: true },
  ].filter((section) => section.shown);
  const titleOf = (id: string) => sections.find((section) => section.id === id)?.title ?? '';

  return (
    <article className="section-spacing-sm pb-20">
      <div className="container-page max-w-6xl">
        <CaseStudyHeader study={study} project={project} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
          <div className="min-w-0 space-y-12">
            <ProjectFacts
              study={study}
              project={project}
              className="grid grid-cols-2 gap-x-5 gap-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:grid-cols-3 lg:hidden"
            />

            {study.metrics && study.metrics.length > 0 && <KeyMetrics metrics={study.metrics} />}

            {project?.image && (
              <img
                src={project.image}
                alt=""
                width={1200}
                height={514}
                decoding="async"
                className="aspect-[21/9] max-h-64 w-full rounded-2xl border border-[var(--border)] object-cover"
              />
            )}

            {hasScreenshots && (
              <Section id="screenshots" title={titleOf('screenshots')}>
                <ScreenshotGallery screenshots={study.screenshots!} />
              </Section>
            )}

            <Section id="overview" title={titleOf('overview')}>
              <div className="max-w-[60ch] space-y-3 text-base leading-7 text-[var(--text-secondary)]">
                {study.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {study.users && study.users.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-base font-semibold text-[var(--text)]">Who uses it</h3>
                  {study.users.some((user) => user.description) ? (
                    <dl className="max-w-[60ch] space-y-2.5">
                      {study.users.map((user) => (
                        <div key={user.role} className="grid gap-x-4 sm:grid-cols-[9.5rem_minmax(0,1fr)]">
                          <dt className="text-[15px] font-semibold leading-relaxed text-[var(--text)]">{user.role}</dt>
                          <dd className="text-[15px] leading-relaxed text-[var(--text-secondary)]">{user.description}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
                      {study.users.map((user) => user.role).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </Section>

            {hasFeatures && (
              <Section id="features" title={titleOf('features')}>
                <FeatureGrid groups={study.features!} />
              </Section>
            )}

            {hasContributions && (
              <Section id="contributions" title={titleOf('contributions')}>
                <ul className="max-w-[60ch] list-disc space-y-2 pl-5 text-base leading-7 text-[var(--text-secondary)] marker:text-[var(--accent-text)]">
                  {study.contributions!.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Section>
            )}

            {hasHighlights && (
              <Section id="highlights" title={titleOf('highlights')}>
                <EngineeringHighlights highlights={study.highlights!} />
              </Section>
            )}

            {study.architecture && (
              <Section id="architecture" title={titleOf('architecture')}>
                <ArchitectureDiagram architecture={study.architecture} />
              </Section>
            )}

            <Section id="stack" title={titleOf('stack')}>
              <TechStack groups={study.stack} />
            </Section>

            {study.disclosure && (
              <p className="max-w-[60ch] text-[13px] leading-relaxed text-[var(--text-secondary)]">{study.disclosure}</p>
            )}
          </div>

          <CaseStudySidebar
            study={study}
            project={project}
            sections={sections.map(({ id, title }) => ({ id, title }))}
          />
        </div>

        <CaseStudyFooter previous={CASE_STUDIES[index - 1]} next={CASE_STUDIES[index + 1]} />
      </div>
    </article>
  );
}
