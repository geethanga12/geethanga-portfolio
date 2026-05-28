import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

interface RootLayoutProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

/** Scroll to top on route change — replaces ScrollRestoration which requires a data router */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

const RootLayout = ({ darkMode, toggleDarkMode }: RootLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] overflow-x-clip">
      {/* Skip-to-content link — visually hidden until focused via keyboard */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[200] -translate-y-20 rounded-lg
                   bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white
                   shadow-lg outline-none transition-transform duration-150
                   focus-visible:translate-y-0"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main id="main-content" className="flex-1 pt-[var(--nav-height)] overflow-x-clip" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
