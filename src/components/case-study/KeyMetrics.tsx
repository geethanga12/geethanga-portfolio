import type { CaseStudyMetric } from '../../types/project';

const COLUMNS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
};

export default function KeyMetrics({ metrics }: { metrics: CaseStudyMetric[] }) {
  return (
    <dl
      aria-label="Key metrics"
      className={`grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] ${COLUMNS[metrics.length] ?? COLUMNS[4]}`}
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col-reverse justify-end gap-1 bg-[var(--surface-raised)] p-4 sm:p-5">
          <dt className="text-sm leading-snug text-[var(--text-secondary)]">{metric.label}</dt>
          <dd className="whitespace-nowrap text-3xl font-extrabold tracking-tight text-[var(--text)]">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
