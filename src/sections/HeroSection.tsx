import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Sparkles, Layers, MapPin } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { DeviceFrame } from '../components/ui/DeviceFrame';

interface HeroSectionProps {
  onOpenRecruiterModal: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRecruiterModal, onNavigateTo }) => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = profileData.cvPdfPath;
    link.download = profileData.cvFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Ambient Backdrop Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-br from-cyan-500/10 via-indigo-600/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          
          {/* Top Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs text-slate-300 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">Available for Senior Full-Stack & Mobile Roles</span>
            <span className="text-slate-500">•</span>
            <span className="text-rn-cyan font-mono text-[11px]">5+ Yrs Exp</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Hi, I’m{' '}
              <span className="bg-gradient-to-r from-rn-cyan via-rn-blue to-indigo-400 bg-clip-text text-transparent">
                {profileData.name}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-slate-200">
              Senior Full-Stack & Mobile Software Engineer
            </p>
          </motion.div>

          {/* Professional Summary */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0"
          >
            5+ years architecting and shipping production applications used by <strong className="text-white">200,000+ users</strong> across healthcare, live ticketing, and logistics. Specialized in <strong className="text-rn-cyan">React Native New Architecture</strong> (Fabric, TurboModules, Reanimated 3), zero-downtime <strong className="text-emerald-400">Fastlane & CodePush OTA</strong>, and end-to-end full-stack SaaS delivery.
          </motion.p>

          {/* 4 Clean Production Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 max-w-xl mx-auto lg:mx-0"
          >
            {profileData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rn-cyan/30 transition-colors text-center lg:text-left"
              >
                <div className="text-xl font-extrabold text-white tracking-tight font-mono">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
          >
            {/* Primary Action: Download CV */}
            <button
              onClick={handleDownloadCV}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rn-cyan to-rn-blue text-slate-950 font-bold text-sm shadow-rn-glow hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download CV (PDF)</span>
            </button>

            {/* Secondary Action: Explore Projects */}
            <button
              onClick={() => onNavigateTo('projects')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 hover:border-rn-cyan/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Layers className="w-4 h-4 text-rn-cyan" />
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Recruiter Quick Link */}
            <button
              onClick={onOpenRecruiterModal}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Recruiter 30s View</span>
            </button>
          </motion.div>

          {/* Location & Tech Pillars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-400 pt-1"
          >
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {profileData.location}
            </span>
            <span>•</span>
            <span className="text-slate-300">
              React Native (CLI/Expo) • Next.js • Supabase • AWS
            </span>
          </motion.div>

        </div>

        {/* Right Column: Sleek Interactive Phone Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-5 flex justify-center relative"
        >
          <DeviceFrame />
        </motion.div>

      </div>
    </section>
  );
};
