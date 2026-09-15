import { useState, useEffect } from 'react';
import { AppHeader } from './components/layout/AppHeader';
import { MobileNav } from './components/layout/MobileNav';
import { AppFooter } from './components/layout/AppFooter';
import { RecruiterDrawer } from './components/recruiter/RecruiterDrawer';
import { CommandPalette } from './components/ui/CommandPalette';
import { MetroBundlerModal } from './components/ui/MetroBundlerModal';

import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { EducationSection } from './sections/EducationSection';
import { ContactSection } from './sections/ContactSection';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isRecruiterOpen, setIsRecruiterOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isMetroOpen, setIsMetroOpen] = useState<boolean>(false);

  // Keyboard shortcut listener for Cmd+R (Metro Bundler Easter Egg) and Cmd+K (Command Palette)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K -> Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // Shift+Cmd+R -> React Native Metro console Easter Egg
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        setIsMetroOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Scrollspy to automatically highlight active tab
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const elem = document.getElementById(id);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-app-bg text-slate-100 flex flex-col relative selection:bg-rn-cyan/20 selection:text-rn-cyan">
      
      {/* Unified, Premium Header */}
      <AppHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenRecruiterModal={() => setIsRecruiterOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenMetro={() => setIsMetroOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection
          onOpenRecruiterModal={() => setIsRecruiterOpen(true)}
          onNavigateTo={navigateToSection}
        />

        <AboutSection />

        <ExperienceSection />

        <ProjectsSection />

        <SkillsSection />

        <EducationSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <AppFooter />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Modals & Overlays */}
      <RecruiterDrawer
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
        onNavigateTo={navigateToSection}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTo={navigateToSection}
        onOpenRecruiterModal={() => setIsRecruiterOpen(true)}
        onOpenMetro={() => setIsMetroOpen(true)}
      />

      <MetroBundlerModal
        isOpen={isMetroOpen}
        onClose={() => setIsMetroOpen(false)}
      />

    </div>
  );
}
