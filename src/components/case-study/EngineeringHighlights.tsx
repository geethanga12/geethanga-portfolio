import type { CaseStudyHighlight } from '../../types/project';

export default function EngineeringHighlights({ highlights }: { highlights: CaseStudyHighlight[] }) {
  return (
    <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
      {highlights.map((highlight) => {
        const steps = [
          { label: 'Challenge', text: highlight.challenge, labelClass: 'text-[var(--text-secondary)]' },
          { label: 'Approach', text: highlight.approach, labelClass: 'text-[var(--text-secondary)]' },
          { label: 'Result', text: highlight.result, labelClass: 'text-[var(--green-text)]' },
        ].filter((step) => step.text);

        return (
          <div key={highlight.title} className="py-5">
            <h3 className="mb-3 text-base font-semibold text-[var(--text)]">{highlight.title}</h3>
            <dl className="space-y-2.5">
              {steps.map((step) => (
                <div key={step.label} className="grid gap-x-4 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
                  <dt className={`text-sm font-semibold leading-relaxed ${step.labelClass}`}>{step.label}</dt>
                  <dd className="max-w-[60ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">{step.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
}
