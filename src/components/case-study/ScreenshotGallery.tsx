import type { CaseStudyScreenshot } from '../../types/project';

export default function ScreenshotGallery({ screenshots }: { screenshots: CaseStudyScreenshot[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {screenshots.map((shot) => (
        <figure key={shot.src}>
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl border border-[var(--border)]"
          />
          {shot.caption && (
            <figcaption className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{shot.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
