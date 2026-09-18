import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Star, ArrowUpRight, Sparkles, Smartphone } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from '../components/ui/ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Mobile App', 'Full-Stack & SaaS', 'Architecture', 'AI & Backend'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-rn-cyan uppercase tracking-wider mb-3 shadow-sm dark:shadow-none">
          <Layers className="w-3.5 h-3.5" />
          Mobile App Store & System Showcase
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Featured Production Products
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2.5">
          Tap any app card to open the interactive native inspection sheet with complete architectural breakdown.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 select-none ${
                isActive
                  ? 'bg-rn-cyan text-slate-950 font-bold border border-rn-cyan shadow-rn-glow-sm scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            onClick={() => setActiveProject(project)}
            className="cursor-pointer group p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 hover:border-rn-cyan/50 shadow-sm dark:shadow-mobile-card hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 group-hover:bg-cyan-500/15 rounded-full blur-2xl transition-colors pointer-events-none" />

            <div>
              {/* App Icon + Badge Row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-13 h-13 rounded-2xl bg-slate-100 dark:bg-gradient-to-tr dark:from-cyan-500/20 dark:via-indigo-500/20 dark:to-purple-500/20 border border-slate-200 dark:border-white/15 p-3 flex items-center justify-center text-slate-900 dark:text-white font-mono font-bold shadow-sm group-hover:scale-105 transition-transform">
                  <Smartphone className="w-6 h-6 text-cyan-600 dark:text-rn-cyan" />
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    {project.category}
                  </span>
                  {project.appStoreRating && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500 dark:text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {project.appStoreRating}
                    </span>
                  )}
                  {project.badge && !project.appStoreRating && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                      {project.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-rn-cyan transition-colors tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {project.subtitle}
              </p>

              {/* Impact Tag Line */}
              <div className="mt-4 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-white/[0.03] border border-emerald-200/60 dark:border-white/5 space-y-1">
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="line-clamp-1">{project.impactMetrics[0]}</span>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.technologies.slice(0, 4).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.02] text-slate-500">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Action Trigger */}
            <div className="mt-6 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors flex items-center gap-1 font-medium">
                Tap to Inspect Specs
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-600 dark:text-rn-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="px-3 py-1 rounded-xl bg-cyan-500/10 dark:bg-rn-cyan/15 group-hover:bg-rn-cyan group-hover:text-slate-950 text-cyan-700 dark:text-rn-cyan text-xs font-bold transition-all">
                Open Sheet
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Bottom-Sheet / Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

    </section>
  );
};
