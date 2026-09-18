import React, { useState, useEffect } from 'react';
import { Download, Sparkles, Command, Menu, X, User, Briefcase, Layers, Code, GraduationCap, Mail, Sun, Moon } from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

interface AppHeaderProps {
  onOpenRecruiterModal: () => void;
  onOpenCommandPalette: () => void;
  onOpenMetro?: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenRecruiterModal,
  onOpenCommandPalette,
  activeSection,
  setActiveSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
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
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="w-full max-w-6xl">
        <nav
          className={`pointer-events-auto flex items-center justify-between w-full px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-slate-200/90 dark:border-white/15 shadow-md dark:shadow-2xl'
              : 'bg-white/80 dark:bg-slate-950/75 backdrop-blur-xl border-slate-200/70 dark:border-white/10 shadow-sm dark:shadow-none'
          }`}
        >
          {/* Left Brand Logo & Title */}
          <button
            onClick={() => {
              setActiveSection('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 text-left group outline-none focus:outline-none select-none shrink-0"
          >
            {/* React Native Atom Icon */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-transparent border border-rn-cyan/40 flex items-center justify-center shadow-sm dark:shadow-rn-glow-sm group-hover:scale-105 transition-transform flex-shrink-0">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-rn-cyan animate-[spin_16s_linear_infinite]"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="16" cy="16" r="2.2" fill="currentColor" />
                <ellipse cx="16" cy="16" rx="11.5" ry="4.2" strokeWidth="1.4" transform="rotate(30 16 16)" />
                <ellipse cx="16" cy="16" rx="11.5" ry="4.2" strokeWidth="1.4" transform="rotate(90 16 16)" />
                <ellipse cx="16" cy="16" rx="11.5" ry="4.2" strokeWidth="1.4" transform="rotate(150 16 16)" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-rn-cyan transition-colors text-sm sm:text-base leading-none">
                  {profileData.name}
                  <span className="text-cyan-600 dark:text-rn-cyan">.</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-0.5 whitespace-nowrap">
                Senior Full-Stack & Mobile
              </span>
            </div>
          </button>

          {/* Centered Desktop Nav Items - Flex Flow ensures ZERO overlap */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-4">
            <div className="flex items-center gap-0.5 bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 p-1 rounded-full backdrop-blur-xl shadow-inner">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 outline-none focus:outline-none focus-visible:outline-none select-none whitespace-nowrap ${
                      isActive
                        ? 'text-slate-900 dark:text-white bg-white dark:bg-white/[0.12] shadow-sm dark:shadow-inner'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 h-0.5 bg-rn-cyan rounded-full shadow-rn-glow-sm"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 transition-colors outline-none focus:outline-none"
              title="Search commands and shortcuts (Cmd+K)"
            >
              <Command className="w-3.5 h-3.5 text-cyan-600 dark:text-rn-cyan" />
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">⌘K</span>
            </button>

            {/* Day / Night Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm outline-none focus:outline-none"
              title={theme === 'dark' ? 'Switch to Day theme (Light mode)' : 'Switch to Night theme (Dark mode)'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Recruiter 30s Fast-Track Button - shown on ultra-wide screens */}
            <button
              onClick={onOpenRecruiterModal}
              className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 hover:bg-indigo-100 dark:hover:bg-indigo-500/25 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-semibold text-xs transition-all hover:scale-[1.02] outline-none focus:outline-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Recruiter 30s</span>
            </button>

            {/* Primary CTA: Download CV */}
            <button
              onClick={handleDownloadCV}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-rn-cyan to-rn-blue text-slate-950 font-bold text-xs hover:shadow-rn-glow hover:opacity-95 transition-all active:scale-95 shadow-sm outline-none focus:outline-none whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download CV</span>
            </button>

            {/* Mobile menu toggle (shows on < lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white outline-none focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile / Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 pointer-events-auto px-4 pt-3 pb-4 bg-white/95 dark:bg-slate-900/98 border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl transition-all">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium text-left transition-colors outline-none focus:outline-none ${
                      isActive
                        ? 'bg-rn-cyan/15 text-rn-cyan border border-rn-cyan/30 font-bold'
                        : 'bg-slate-100 dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-white/[0.07]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-rn-cyan" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
              {/* Mobile Theme Toggle in dropdown */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-semibold outline-none focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-600" />
                  )}
                  <span>Theme: {theme === 'dark' ? 'Night (Dark)' : 'Day (Light)'}</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-cyan-600 dark:text-rn-cyan font-bold">Switch</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRecruiterModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 text-xs font-bold outline-none focus:outline-none"
              >
                <Sparkles className="w-4 h-4" />
                Recruiter 30-Second Overview
              </button>

              <button
                onClick={handleDownloadCV}
                className="w-full sm:hidden flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-rn-cyan to-rn-blue text-slate-950 font-bold text-xs outline-none focus:outline-none"
              >
                <Download className="w-4 h-4" />
                Download CV (PDF)
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-xs outline-none focus:outline-none"
              >
                <Command className="w-3.5 h-3.5 text-cyan-600 dark:text-rn-cyan" />
                Command Palette (⌘K)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
