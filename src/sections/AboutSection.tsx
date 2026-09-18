import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, MapPin, ShieldCheck, Zap, GitMerge, Sparkles, User } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const engineeringPillars = [
    {
      title: 'React Native New Architecture',
      subtitle: 'Fabric & TurboModules (C++ JSI)',
      description:
        'Proven track record upgrading legacy production apps (RN 0.69 → latest) and eliminating JavaScript bridge overhead with direct C++ JSI bindings and Fabric concurrent rendering.',
      icon: Cpu,
      color: 'text-cyan-600 dark:text-rn-cyan',
      badge: '60 FPS UI',
    },
    {
      title: 'Offline-First & High-Throughput',
      subtitle: 'Resilient Mobile Client Systems',
      description:
        'Architected ticketing check-in systems handling 1,200+ scans/hour at 99.97% accuracy with local AsyncStorage caching and optimistic background reconciliation.',
      icon: Zap,
      color: 'text-amber-500 dark:text-amber-400',
      badge: '99.97% Accuracy',
    },
    {
      title: 'Rapid Zero-Downtime CI/CD',
      subtitle: 'Fastlane & CodePush OTA Releases',
      description:
        'Compressed multi-day iOS and Android release cycles from 3 days down to 4 hours, pushing instant hotfixes and feature updates over-the-air without app store waiting queues.',
      icon: GitMerge,
      color: 'text-emerald-600 dark:text-emerald-400',
      badge: '3 Days → 4 Hours',
    },
    {
      title: 'Full-Stack & Applied AI Delivery',
      subtitle: 'Solo End-to-End SaaS Architecture',
      description:
        'Independently delivered complete production SaaS platforms (Contract OS) across Australia & NZ: Next.js admin dashboards, live GPS tracking, Supabase, Stripe billing, and Google Gemini API assistants.',
      icon: Sparkles,
      color: 'text-purple-600 dark:text-purple-400',
      badge: 'Solo Architect',
    },
  ];

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-rn-cyan uppercase tracking-wider mb-3 shadow-sm dark:shadow-none">
          <User className="w-3.5 h-3.5" />
          Mobile Profile & Engineering Philosophy
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Crafting High-Performance Mobile Experiences
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          From micro-interactions and 60fps animations to rock-solid offline synchronization and automated cloud pipelines.
        </p>
      </div>

      {/* Main Profile Grid: Mobile Settings Style Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Card: Profile & Core Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-md dark:shadow-mobile-card space-y-6"
        >
          {/* Mobile Profile Card Header */}
          <div className="flex items-center gap-4 pb-5 border-b border-slate-200/80 dark:border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border-2 border-rn-cyan/50 flex items-center justify-center text-slate-900 dark:text-white font-extrabold text-2xl shadow-sm dark:shadow-rn-glow-sm">
              MK
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {profileData.name}
              </h3>
              <p className="text-xs text-cyan-600 dark:text-rn-cyan font-semibold">
                {profileData.title}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{profileData.location}</span>
              </div>
            </div>
          </div>

          {/* Current Engagements */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
              Current Engineering Posts
            </span>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <strong className="text-slate-900 dark:text-white">Anktech Software Pvt. Ltd.</strong>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Sep 2021 – Present</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Senior Full-Stack & Mobile Software Engineer leading client architectures.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <strong className="text-slate-900 dark:text-white">iLant Health (Healthcare)</strong>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-rn-cyan font-semibold">Feb 2026 – Present</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Architecting cardiometabolic platform for 15,000+ patients.
              </p>
            </div>
          </div>

          {/* Professional Summary Quote */}
          <div className="p-4 rounded-2xl bg-cyan-50/60 dark:bg-slate-800/70 border border-cyan-200/80 dark:border-white/10">
            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed italic">
              "{profileData.summary}"
            </p>
          </div>

          {/* Senior Engineering Delivery Badge */}
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-cyan-600 dark:text-rn-cyan flex-shrink-0" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Production Architecture & Enterprise Delivery
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-300">
                Clean Architecture (Domain/Data/Presentation) • HIPAA-aligned data layers • CI/CD automation
              </span>
            </div>
          </div>

        </motion.div>

        {/* Right Cards: 4 Engineering Pillars */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {engineeringPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 hover:border-rn-cyan/40 shadow-sm dark:shadow-mobile-card transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 group-hover:scale-105 transition-transform">
                      <Icon className={`w-5 h-5 ${pillar.color}`} />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      {pillar.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-rn-cyan transition-colors">
                    {pillar.title}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mt-0.5 mb-2">
                    {pillar.subtitle}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center text-[11px] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                  <span>Production Tested</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
