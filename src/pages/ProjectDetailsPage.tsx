import { Link, useParams } from 'react-router-dom';
import { CASE_STUDIES } from '../data/projects';

const ProjectDetailsPage = () => {
  const { slug } = useParams();
  const study = CASE_STUDIES.find((item) => item.slug === slug);

  if (!study) {
    return (
      <main className="relative z-10 min-h-screen px-4 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="mb-4 text-3xl font-bold">Case Study Not Found</h1>
          <p className="mb-6 text-slate-600 dark:text-slate-300">
            The requested case study is not available.
          </p>
          <Link
            to="/#projects"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen px-4 pt-28 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl space-y-8 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/95 sm:p-10">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            {study.role}
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">{study.title}</h1>
          <p className="text-slate-600 dark:text-slate-300">{study.timeline}</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <span
                key={item}
                className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-200"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Problem</h2>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">{study.problem}</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Solution</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">
            {study.solution.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Impact</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {study.impactMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {metric.label}
                </p>
                <p className="mt-2 text-lg font-semibold">{metric.value}</p>
                {metric.note ? (
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{metric.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
          <strong>Disclosure:</strong> {study.sanitizedNotes}
        </section>

        <footer className="pt-4">
          <Link
            to="/#projects"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Projects
          </Link>
        </footer>
      </article>
    </main>
  );
};

export default ProjectDetailsPage;
