import Link from 'next/link';
import { FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-display font-extrabold text-gradient mb-2">404</h1>
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">Page Not Found</h2>
      <p className="text-sm text-[var(--text-secondary)] max-w-md mb-8">
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn btn-primary btn-sm inline-flex items-center gap-2"
      >
        <FiHome size={16} />
        Back to Home
      </Link>
    </div>
  );
}
