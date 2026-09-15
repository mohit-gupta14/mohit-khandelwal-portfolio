import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../../data/portfolioData';

interface StatusBarProps {
  onOpenRecruiterModal?: () => void;
  onOpenMetro?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({ onOpenRecruiterModal, onOpenMetro }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [islandExpanded, setIslandExpanded] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = profileData.cvPdfPath;
    link.download = profileData.cvFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-app-bg/90 backdrop-blur-xl border-b border-white/[0.06] select-none transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-11 flex items-center justify-between text-xs text-slate-300 font-medium">
        
        {/* Left: Carrier & Time */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-rn-cyan font-bold tracking-tight">
            {currentTime || '9:41 AM'}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/80 border border-white/10 text-[11px] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            React Native 0.74 • Fabric Ready
          </span>
        </div>

        {/* Center: Interactive Dynamic Island */}
        <div className="relative">
          <motion.div
            onClick={() => setIslandExpanded(!islandExpanded)}
            onHoverStart={() => setIslandExpanded(true)}
            onHoverEnd={() => setIslandExpanded(false)}
            className="cursor-pointer bg-slate-900/95 hover:bg-slate-800 border border-white/15 hover:border-rn-cyan/50 text-slate-200 px-3.5 py-1 rounded-full shadow-lg flex items-center gap-2 transition-colors duration-200"
            layout
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rn-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rn-cyan"></span>
            </span>
            <span className="text-[11px] tracking-wide font-semibold text-white flex items-center gap-1">
              Mohit Khandelwal
              <span className="text-slate-400 font-normal">| Mobile Architect</span>
            </span>
          </motion.div>

          {/* Dynamic Island Expandable Popover */}
          <AnimatePresence>
            {islandExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 4, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-80 bg-slate-900/98 backdrop-blur-2xl border border-rn-cyan/30 rounded-2xl p-4 shadow-2xl z-50 text-left"
              >
                <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Sparkles className="w-3.5 h-3.5 text-rn-cyan" />
                      Status: Open to High-Impact Roles
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Senior Full-Stack & Mobile Software Engineer
                    </p>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    5+ Yrs Exp
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Scale</span>
                    <span className="font-bold text-white">200k+ Users</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Store Quality</span>
                    <span className="font-bold text-rn-cyan">4.4 ★ Rating</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadCV();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-rn-cyan text-slate-950 font-bold text-xs hover:bg-rn-blue transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download CV
                  </button>
                  {onOpenRecruiterModal && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIslandExpanded(false);
                        onOpenRecruiterModal();
                      }}
                      className="py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors border border-white/10"
                    >
                      30s Overview
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Indicators & Easter Egg Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMetro}
            title="Open React Native Metro Bundler Terminal (Cmd+R)"
            className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700/80 text-rn-cyan border border-rn-cyan/20 text-[10px] font-mono transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rn-cyan"></span>
            Metro 8081
          </button>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">5G Ultra</span>
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-slate-300">100%</span>
              <Battery className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

      </div>

      {/* Download feedback notification banner */}
      <AnimatePresence>
        {copiedNotification && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-emerald-500 text-slate-950 px-4 py-1.5 text-center text-xs font-semibold flex items-center justify-center gap-2 shadow-inner"
          >
            <CheckCircle2 className="w-4 h-4" />
            Downloading Mohit Khandelwal's CV (Mohit_Khandelwal_React_Native_Developer_CV.pdf)...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
