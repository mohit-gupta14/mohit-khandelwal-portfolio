import React, { useState, useEffect } from 'react';
import { Download, Sparkles, Command, Menu, X, User, Briefcase, Layers, Code, GraduationCap, Mail, Terminal } from 'lucide-react';
import { profileData } from '../../data/portfolioData';

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
  onOpenMetro,
  activeSection,
  setActiveSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl py-3'
          : 'bg-slate-950/60 backdrop-blur-md border-b border-white/[0.04] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Senior Title */}
        <button
          onClick={() => {
            setActiveSection('hero');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          {/* React Native Atom Icon */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-transparent border border-rn-cyan/30 flex items-center justify-center shadow-rn-glow-sm group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 text-rn-cyan animate-[spin_16s_linear_infinite]"
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

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight group-hover:text-rn-cyan transition-colors text-sm sm:text-base">
                {profileData.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              Senior Full-Stack & Mobile Engineer
            </p>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-white/[0.08] p-1 rounded-full backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold bg-white/[0.1] shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 h-0.5 bg-rn-cyan rounded-full shadow-rn-glow-sm"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Metro Bundler Easter Egg Trigger */}
          {onOpenMetro && (
            <button
              onClick={onOpenMetro}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-mono text-emerald-400 transition-colors"
              title="React Native Metro Console (Shift+Cmd+R)"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Metro:8081</span>
            </button>
          )}

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 transition-colors"
            title="Search and shortcuts (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-rn-cyan" />
            <span className="text-[11px] font-mono text-slate-400">⌘K</span>
          </button>

          {/* Recruiter 30s Fast-Track Button */}
          <button
            onClick={onOpenRecruiterModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 font-medium text-xs transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Recruiter 30s View</span>
          </button>

          {/* Primary CTA: Download CV */}
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rn-cyan to-rn-blue text-slate-950 font-bold text-xs hover:shadow-rn-glow hover:opacity-95 transition-all active:scale-95 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Download CV</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-4 bg-app-surface/98 border-b border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-rn-cyan/15 text-rn-cyan border border-rn-cyan/30'
                      : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-rn-cyan" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruiterModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4" />
              Recruiter 30-Second Overview
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 text-slate-300 border border-white/10 text-xs"
            >
              <Command className="w-3.5 h-3.5 text-rn-cyan" />
              Command Palette (⌘K)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
