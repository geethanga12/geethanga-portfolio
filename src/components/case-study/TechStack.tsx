import type { CaseStudyStackGroup } from '../../types/project';

export default function TechStack({ groups }: { groups: CaseStudyStackGroup[] }) {
  return (
    <dl className="space-y-4">
      {groups.map((group) => (
        <div key={group.layer} className="grid gap-x-4 gap-y-2 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
          <dt className="pt-1 text-sm font-semibold text-[var(--text)]">{group.layer}</dt>
          <dd className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[13px] font-medium text-[var(--text-secondary)]"
              >
                {item}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
