import Hero from '../components/home/Hero';
import DeveloperConsole from '../components/home/DeveloperConsole';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ExperienceSection from '../components/home/ExperienceSection';
import EducationSection from '../components/home/EducationSection';
import SkillsSection from '../components/home/SkillsSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <DeveloperConsole />
      <FeaturedProjects />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
    </>
  );
}
