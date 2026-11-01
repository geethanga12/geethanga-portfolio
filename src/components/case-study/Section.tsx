import type { ReactNode } from 'react';

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
      <h2 id={`${id}-heading`} className="mb-5 text-2xl font-bold tracking-tight text-[var(--text)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
