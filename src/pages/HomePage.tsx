import { Suspense, lazy } from 'react';
import SEO from '../components/SEO';
import { SITE_URL } from '../data/site';
import Hero from '../components/home/Hero';

const DeveloperConsole = lazy(() => import('../components/home/DeveloperConsole'));
const ExperienceSection = lazy(() => import('../components/home/ExperienceSection'));
const FeaturedProjects = lazy(() => import('../components/home/FeaturedProjects'));
const EducationSection = lazy(() => import('../components/home/EducationSection'));
const SkillsSection = lazy(() => import('../components/home/SkillsSection'));

const SectionFallback = () => (
  <div className="flex items-center justify-center py-16">
    <div className="h-6 w-6 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
  </div>
);

const HomePage = () => {
  return (
    <>
      <SEO
        title="Geethanga Dissanayake — Associate Full Stack Developer"
        description="Portfolio of Geethanga Dissanayake — Associate Full Stack Developer building scalable Spring Boot APIs, React frontends, and AI-powered products."
        canonical={SITE_URL}
      />
      {/* Hero renders immediately — no lazy boundary above the fold */}
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <DeveloperConsole />
        <FeaturedProjects />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
      </Suspense>
    </>
  );
};

export default HomePage;

