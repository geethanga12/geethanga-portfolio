import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';

const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Experience = lazy(() => import('../components/Experience'));
const Education = lazy(() => import('../components/Education'));
const Contact = lazy(() => import('../components/Contact'));

const HomePage = () => {
  return (
    <main id="main-content" className="relative z-10">
      <Hero />
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          </div>
        }
      >
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </Suspense>
    </main>
  );
};

export default HomePage;
