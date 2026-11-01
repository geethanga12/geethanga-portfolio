import { Fragment } from 'react';
import { FiArrowRight, FiServer } from 'react-icons/fi';
import type { ArchitectureNode, CaseStudyArchitecture } from '../../types/project';

function Node({ node, muted = false }: { node: ArchitectureNode; muted?: boolean }) {
  return (
    <div
      role="listitem"
      className={`flex min-w-0 flex-1 flex-col justify-center rounded-xl border px-4 py-3 text-center ${
        muted ? 'border-dashed border-[var(--border-strong)]' : 'border-[var(--border-strong)] bg-[var(--bg)]'
      }`}
    >
      <p className="text-sm font-semibold leading-snug text-[var(--text)]">{node.label}</p>
      {node.detail && <p className="mt-0.5 text-[13px] leading-snug text-[var(--text-secondary)]">{node.detail}</p>}
    </div>
  );
}

export default function ArchitectureDiagram({ architecture }: { architecture: CaseStudyArchitecture }) {
  const { flow, connections, connectionsLabel, hosting, note } = architecture;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
      <div role="list" aria-label="Request flow" className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {flow.map((node, i) => (
          <Fragment key={node.label}>
            {i > 0 && (
              <FiArrowRight
                size={18}
                aria-hidden
                className="flex-shrink-0 rotate-90 self-center text-[var(--accent-text)] md:rotate-0"
              />
            )}
            <Node node={node} />
          </Fragment>
        ))}
      </div>

      {connections && connections.length > 0 && (
        <div className="mt-5">
          {connectionsLabel && (
            <p className="mb-2 text-[13px] font-medium text-[var(--text-secondary)]">{connectionsLabel}</p>
          )}
          <div role="list" aria-label={connectionsLabel} className="flex flex-col gap-2 sm:flex-row">
            {connections.map((node) => (
              <Node key={node.label} node={node} muted />
            ))}
          </div>
        </div>
      )}

      {(hosting || note) && (
        <p className="mt-5 flex items-start gap-2 border-t border-[var(--border)] pt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
          <FiServer size={15} aria-hidden className="mt-1 flex-shrink-0" />
          <span>
            {hosting && <>Hosted on {hosting}.</>}
            {note && <>{note}.</>}
          </span>
        </p>
      )}
    </div>
  );
}
