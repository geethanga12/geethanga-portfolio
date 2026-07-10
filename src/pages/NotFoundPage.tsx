import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  return (
    <>
      <SEO
        title="404 — Page Not Found · Geethanga Dissanayake"
        description="The page you're looking for doesn't exist."
        noIndex
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <p className="text-8xl font-black tracking-tighter text-[var(--border-strong)]">
            404
          </p>
          <h1 className="text-2xl font-bold text-[var(--text)]">Page not found</h1>
          <p className="text-[var(--text-secondary)] max-w-sm mx-auto text-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors focus-ring mt-2"
          >
            Go home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
