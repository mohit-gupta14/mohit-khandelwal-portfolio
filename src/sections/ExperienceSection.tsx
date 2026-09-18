import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { workExperienceData } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('ilant');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const experience = workExperienceData[0]; // Anktech Software with engagements

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-rn-cyan uppercase tracking-wider mb-3 shadow-sm dark:shadow-none">
          <Briefcase className="w-3.5 h-3.5" />
          Production Engineering Career
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          5+ Years Shipping High-Scale Apps
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
          Detailed timeline of client engagements and core roles at Anktech Software Pvt. Ltd., spanning healthcare, fintech, live ticketing, and energy.
        </p>
      </div>

      {/* Main Employer Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-mobile-card mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {experience.company}
              </h3>
            </div>
            <p className="text-cyan-600 dark:text-rn-cyan text-sm font-semibold mt-0.5">
              {experience.role}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{experience.location}</span>
              <span>•</span>
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{experience.period}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300">
              8 Major Engagements
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-700 dark:text-emerald-300 font-bold">
              Active Senior Role
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mt-4 leading-relaxed italic">
          {experience.summary}
        </p>
      </div>

      {/* Vertical Mobile Timeline of Engagements */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 dark:border-rn-cyan/30 space-y-6">
        
        {experience.engagements.map((eng, idx) => {
          const isExpanded = expandedId === eng.id;

          return (
            <motion.div
              key={eng.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-rn-cyan flex items-center justify-center shadow-sm dark:shadow-rn-glow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rn-cyan" />
              </div>

              {/* Engagement Card */}
              <div
                onClick={() => toggleExpand(eng.id)}
                className={`cursor-pointer p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/90 border transition-all duration-200 ${
                  isExpanded
                    ? 'border-rn-cyan/50 shadow-md dark:shadow-xl bg-slate-50/50 dark:bg-slate-900'
                    : 'border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm dark:shadow-mobile-card'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-rn-cyan transition-colors">
                        {eng.client}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-rn-cyan border border-cyan-500/20">
                        {eng.domain}
                      </span>
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {eng.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {eng.period}
                    </span>
                    <button
                      className="p-1 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Key Metrics Chips */}
                <div className="flex flex-wrap gap-2 pt-1 pb-2">
                  {eng.metrics.map((metric, mIdx) => (
                    <span
                      key={mIdx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-700 dark:text-emerald-300"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Expandable Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 pt-3 border-t border-slate-200/80 dark:border-white/10 mt-2"
                    >
                      <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {eng.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-rn-cyan flex-shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Pills */}
                      <div className="pt-2">
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5 font-semibold">
                          Technologies Used
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {eng.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          );
        })}

      </div>

    </section>
  );
};
