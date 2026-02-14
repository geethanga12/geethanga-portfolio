import { useEffect, useState, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SEO from './components/SEO';

// Lazy load heavy components
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const StarBackground = lazy(() => import('./components/Canvas/StarBackground'));

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen relative overflow-x-hidden">
        <SEO />
        <Toaster position="bottom-right" />

        {/* 3D Background */}
        <Suspense fallback={null}>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <StarBackground />
          </div>
        </Suspense>

        <div className="relative z-10">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Hero />

          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            }
          >
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Contact />
            <Footer />
          </Suspense>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
