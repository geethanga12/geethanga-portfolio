import type { CaseStudyFeatureGroup } from '../../types/project';

export default function FeatureGrid({ groups }: { groups: CaseStudyFeatureGroup[] }) {
  return (
    <div className="space-y-7">
      {groups.map((group, i) => {
        const Title = group.name ? 'h4' : 'h3';
        return (
          <div key={group.name ?? i}>
            {group.name && <h3 className="mb-3 text-base font-semibold text-[var(--text)]">{group.name}</h3>}
            <ul className="grid gap-3 sm:grid-cols-2">
              {group.features.map((feature) => (
                <li
                  key={feature.title}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 sm:[&:last-child:nth-child(odd)]:col-span-2"
                >
                  <Title className="text-[15px] font-semibold leading-snug text-[var(--text)]">{feature.title}</Title>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
