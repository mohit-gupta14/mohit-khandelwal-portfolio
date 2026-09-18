import React from 'react';
import { Home, User, Briefcase, Layers, Mail, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/portfolioData';

interface MobileNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeSection, setActiveSection }) => {
  const navTabs = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Career', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleScroll = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
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

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = profileData.cvPdfPath;
    link.download = profileData.cvFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe pt-1 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-t border-slate-200 dark:border-white/10 shadow-lg dark:shadow-mobile-sheet px-3 transition-colors">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto relative">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleScroll(tab.id)}
              className="relative flex-1 flex flex-col items-center justify-center py-1.5 outline-none focus:outline-none select-none transition-transform active:scale-90"
              aria-label={tab.label}
            >
              {/* Active Tab Background Pill with Framer Motion */}
              {isActive && (
                <motion.div
                  layoutId="mobileNavActivePill"
                  className="absolute inset-0 bg-rn-cyan/15 rounded-2xl border border-rn-cyan/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-rn-cyan stroke-[2.3]' : 'text-slate-500 dark:text-slate-400'
                  }`}
                />
                <span
                  className={`text-[10px] mt-1 font-medium transition-colors ${
                    isActive ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}

        {/* Quick CV Download Floating Mini Button on Mobile */}
        <button
          onClick={handleDownloadCV}
          title="Download CV"
          className="relative z-10 p-2.5 ml-1 rounded-xl bg-gradient-to-r from-rn-cyan to-rn-blue text-slate-950 shadow-rn-glow-sm active:scale-90 transition-transform flex items-center justify-center outline-none focus:outline-none select-none"
          aria-label="Download CV"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
