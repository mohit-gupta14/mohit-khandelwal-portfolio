import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Layers, Cpu, Calendar, UserCheck, ExternalLink, Github, Sparkles, Star } from 'lucide-react';
import { Project } from '../../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal / Bottom Sheet */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.6 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 140) {
              onClose();
            }
          }}
          className="relative w-full max-w-3xl bg-slate-900 border-t sm:border border-rn-cyan/30 rounded-t-[36px] sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] sm:max-h-[85vh] flex flex-col"
        >
          {/* Native Drag Handle for Mobile */}
          <div className="sm:hidden pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
            <div className="w-12 h-1.5 rounded-full bg-slate-600/80" />
          </div>

          {/* Modal Header */}
          <div className="px-6 py-4 bg-slate-800/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-rn-cyan/15 text-rn-cyan border border-rn-cyan/30 font-semibold">
                {project.category}
              </span>
              {project.badge && (
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {project.badge}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            
            {/* Title & Role Info */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {project.title}
                  </h2>
                  <p className="text-sm sm:text-base text-rn-cyan font-medium mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {project.appStoreRating && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{project.appStoreRating}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-rn-cyan" />
                  <strong className="text-slate-200">{project.role}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {project.timeline}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-sm text-slate-300 leading-relaxed">
              {project.description}
            </div>

            {/* Measurable Impact & Achievements */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Measurable Impact & Production Results
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.impactMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Highlights */}
            {project.architectureHighlights && project.architectureHighlights.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-rn-cyan" />
                  Engineering & Architectural Highlights
                </h3>
                <div className="space-y-2">
                  {project.architectureHighlights.map((arch, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <Layers className="w-4 h-4 text-rn-cyan flex-shrink-0 mt-0.5" />
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2.5">
                Technologies & Architecture Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-medium text-slate-200 hover:border-rn-cyan/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Verified against Mohit Khandelwal's Professional Resume
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/mohit-khandelwal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
