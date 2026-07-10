import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { flushSync } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import RootLayout from './layouts/RootLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  const themeTimer = useRef<number>();

  // Apply theme to <html> synchronously (also persists the choice)
  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      /* ignore unavailable storage */
    }
  };

  // Keep <html> in sync on mount (an inline script sets it pre-React; this is a safety net)
  useEffect(() => {
    applyTheme(darkMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;

    // Commit state + DOM together so the View Transition snapshots the new theme
    const commit = () => {
      flushSync(() => setDarkMode(next));
      applyTheme(next);
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };

    if (reduce) {
      commit();
      return;
    }

    // Preferred: crossfade a snapshot of the page (no text-contrast flash)
    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(commit);
      return;
    }

    // Fallback: brief colour cross-fade via the .theme-transition class
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.clearTimeout(themeTimer.current);
    themeTimer.current = window.setTimeout(
      () => root.classList.remove('theme-transition'),
      450,
    );
    commit();
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route
              element={
                <RootLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              }
            >
              <Route index element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

