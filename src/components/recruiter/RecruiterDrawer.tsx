import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Phone, Mail, Linkedin, Github, CheckCircle, ExternalLink, Clock, Award, Users, Zap } from 'lucide-react';
import { profileData } from '../../data/portfolioData';

interface RecruiterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const RecruiterDrawer: React.FC<RecruiterDrawerProps> = ({ isOpen, onClose, onNavigateTo }) => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = profileData.cvPdfPath;
    link.download = profileData.cvFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-rn-cyan/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto transition-colors"
          >
            {/* Top Bar / Header */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-300 font-bold">
                  Recruiter 30-Second Executive Summary
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
              
              {/* Candidate Quick Intro */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {profileData.name}
                  </h2>
                  <p className="text-cyan-600 dark:text-rn-cyan text-sm font-semibold mt-0.5">
                    {profileData.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    📍 {profileData.location} • 5+ Years Production Experience
                  </p>
                </div>

                <button
                  onClick={handleDownloadCV}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rn-cyan to-rn-blue text-slate-950 font-bold text-xs hover:shadow-rn-glow transition-all active:scale-95 whitespace-nowrap shadow-sm"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  Download CV (PDF)
                </button>
              </div>

              {/* 4 Crucial Fast Stats */}
              <div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5 font-semibold">
                  1. High-Impact Metrics at a Glance
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-center">
                    <Users className="w-4 h-4 text-cyan-600 dark:text-rn-cyan mx-auto mb-1" />
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">200,000+</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Users Supported</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-center">
                    <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">3d → 4h</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">CI/CD OTA Release</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-center">
                    <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400 mx-auto mb-1" />
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">99.97%</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">1.2k+ Scans/Hr</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-center">
                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">4.4 ★</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">App Store Rating</div>
                  </div>
                </div>
              </div>

              {/* Specialization & Tech Pillars */}
              <div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5 font-semibold">
                  2. Core Specializations
                </span>
                <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-rn-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">React Native New Architecture:</strong> Deep expertise in Fabric concurrent renderer, TurboModules JSI C++ direct binding, Native Modules (Kotlin/Swift), and Reanimated 3.
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-rn-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">End-to-End Product Ownership:</strong> From React Native & Next.js frontend to Node.js/Python FastAPI backend, Supabase/Postgres databases, Stripe subscriptions, and AWS cloud deployment.
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-rn-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Automated Delivery & Scalability:</strong> Fastlane + CodePush OTA zero-downtime releases, offline-first queue syncing (AsyncStorage), and high-throughput barcode scanning.
                    </div>
                  </div>
                </div>
              </div>

              {/* Current & Flagship Roles */}
              <div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5 font-semibold">
                  3. Key Engagements & Projects
                </span>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        Contract OS (Freelance Full-Stack & Mobile)
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400">
                        Live GPS tracking SaaS for heavy vehicles in Australia & NZ (Supabase, Next.js, RN, Stripe, Gemini AI).
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold">
                      Live
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        Anktech Software — Senior Software Engineer
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400">
                        iLant Health (15k+ patients, 4h CI/CD) • Ticketsir (500k+ users) • CokoBar (4.4★ App Store).
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-rn-cyan font-semibold">
                      Sep 2021 – Present
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant Contact Actions */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-white/10">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                  4. Direct Instant Contact
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs font-semibold border border-slate-200 dark:border-white/10 transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-cyan-600 dark:text-rn-cyan" />
                    <span>{profileData.email}</span>
                  </a>
                  <a
                    href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs font-semibold border border-slate-200 dark:border-white/10 transition-colors shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{profileData.phone}</span>
                  </a>
                  <a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-600/20 dark:hover:bg-blue-600/30 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-500/30 transition-colors shadow-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                  </a>
                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-600/20 dark:hover:bg-purple-600/30 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-200 dark:border-purple-500/30 transition-colors shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repositories</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                  </a>
                </div>
              </div>

              {/* Navigation Jump CTAs */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateTo('experience');
                  }}
                  className="text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-rn-cyan transition-colors underline-offset-4 hover:underline"
                >
                  Explore Complete Career Timeline →
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateTo('projects');
                  }}
                  className="text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-rn-cyan transition-colors underline-offset-4 hover:underline"
                >
                  View Interactive App Showcases →
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
