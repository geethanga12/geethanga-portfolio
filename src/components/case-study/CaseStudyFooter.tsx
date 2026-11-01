import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiDownload, FiLayers } from 'react-icons/fi';
import type { CaseStudy } from '../../types/project';
import { PRIMARY_BUTTON, SECONDARY_BUTTON, TEXT_LINK } from './styles';

const NEIGHBOUR_LINK =
  'focus-ring flex min-h-11 items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 transition-colors duration-150 hover:border-[var(--border-strong)] motion-reduce:transition-none';

export default function CaseStudyFooter({ previous, next }: { previous?: CaseStudy; next?: CaseStudy }) {
  return (
    <footer className="mt-16 space-y-10 border-t border-[var(--border)] pt-10">
      <nav aria-label="Other case studies">
        <div className="grid gap-3 sm:grid-cols-2">
          {previous && (
            <Link href={`/projects/${previous.slug}`} className={NEIGHBOUR_LINK}>
              <FiArrowLeft size={18} aria-hidden className="flex-shrink-0 text-[var(--text-secondary)]" />
              <span className="min-w-0">
                <span className="block text-[13px] text-[var(--text-secondary)]">Previous case study</span>
                <span className="block font-semibold text-[var(--text)]">{previous.title}</span>
              </span>
            </Link>
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className={`${NEIGHBOUR_LINK} justify-between text-right sm:col-start-2`}>
              <span className="min-w-0">
                <span className="block text-[13px] text-[var(--text-secondary)]">Next case study</span>
                <span className="block font-semibold text-[var(--text)]">{next.title}</span>
              </span>
              <FiArrowRight size={18} aria-hidden className="flex-shrink-0 text-[var(--text-secondary)]" />
            </Link>
          )}
        </div>
        <Link href="/projects" className={`${TEXT_LINK} mt-3`}>
          <FiLayers size={15} aria-hidden />
          All projects
        </Link>
      </nav>

      <section
        aria-labelledby="cta-heading"
        className="flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <h2 id="cta-heading" className="text-2xl font-bold tracking-tight text-[var(--text)]">
          Interested in working together?
        </h2>
        <div className="flex flex-shrink-0 flex-wrap gap-3">
          <Link href="/contact" className={PRIMARY_BUTTON}>
            Get in touch
          </Link>
          <a href="/assets/Geethanga_Dissanayake_CV.pdf" download className={SECONDARY_BUTTON}>
            <FiDownload size={15} aria-hidden />
            Download CV
          </a>
        </div>
      </section>
    </footer>
  );
}
