import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, Sparkles, Terminal, Mail, Phone, Linkedin, Github, PartyPopper, ChevronRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '../../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (sectionId: string) => void;
  onOpenRecruiterModal: () => void;
  onOpenMetro: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateTo,
  onOpenRecruiterModal,
  onOpenMetro,
}) => {
  const [query, setQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
          // trigger open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = profileData.cvPdfPath;
    link.download = profileData.cvFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(`Copied ${label}!`);
    setTimeout(() => {
      setCopiedText(null);
      onClose();
    }, 1200);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00D8FF', '#38BDF8', '#6366F1', '#10B981'],
    });
    onClose();
  };

  const actions = [
    {
      id: 'recruiter',
      category: 'Recruiter Fast-Track',
      title: 'Open 30-Second Recruiter Summary',
      subtitle: 'Executive overview, key metrics, and direct contacts',
      icon: Sparkles,
      iconColor: 'text-indigo-400',
      action: () => {
        onClose();
        onOpenRecruiterModal();
      },
    },
    {
      id: 'download-cv',
      category: 'Downloads',
      title: 'Download CV (PDF)',
      subtitle: 'Mohit_Khandelwal_React_Native_Developer_CV.pdf',
      icon: Download,
      iconColor: 'text-rn-cyan',
      action: handleDownloadCV,
    },
    {
      id: 'metro-terminal',
      category: 'Developer Tools',
      title: 'React Native Metro Bundler Terminal',
      subtitle: 'Inspect Hermes engine, TurboModules, and hot reload',
      icon: Terminal,
      iconColor: 'text-emerald-400',
      action: () => {
        onClose();
        onOpenMetro();
      },
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Jump to Interactive Projects',
      subtitle: 'Contract OS, Ticketsir Scanner, CokoBar, iLant Health',
      icon: ChevronRight,
      iconColor: 'text-slate-400',
      action: () => {
        onClose();
        onNavigateTo('projects');
      },
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Jump to Career Experience Timeline',
      subtitle: '5+ years at Anktech Software & 8+ major client apps',
      icon: ChevronRight,
      iconColor: 'text-slate-400',
      action: () => {
        onClose();
        onNavigateTo('experience');
      },
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Jump to Technical Skills & Architecture',
      subtitle: 'Fabric, TurboModules, Reanimated 3, TypeScript, AWS',
      icon: ChevronRight,
      iconColor: 'text-slate-400',
      action: () => {
        onClose();
        onNavigateTo('skills');
      },
    },
    {
      id: 'copy-email',
      category: 'Contact',
      title: `Copy Email: ${profileData.email}`,
      subtitle: 'Instant clipboard copy',
      icon: Mail,
      iconColor: 'text-rn-cyan',
      action: () => handleCopy(profileData.email, 'Email'),
    },
    {
      id: 'copy-phone',
      category: 'Contact',
      title: `Call / Copy Phone: ${profileData.phone}`,
      subtitle: 'Jaipur, Rajasthan, India (+91)',
      icon: Phone,
      iconColor: 'text-emerald-400',
      action: () => handleCopy(profileData.phone, 'Phone Number'),
    },
    {
      id: 'open-linkedin',
      category: 'Social',
      title: 'Visit LinkedIn Profile',
      subtitle: 'linkedin.com/in/mohit-khandelwal',
      icon: Linkedin,
      iconColor: 'text-blue-400',
      action: () => {
        window.open(profileData.linkedin, '_blank');
        onClose();
      },
    },
    {
      id: 'open-github',
      category: 'Social',
      title: 'Visit GitHub Profile',
      subtitle: 'github.com/mohit-khandelwal',
      icon: Github,
      iconColor: 'text-purple-400',
      action: () => {
        window.open(profileData.github, '_blank');
        onClose();
      },
    },
    {
      id: 'confetti',
      category: 'Easter Egg',
      title: 'Celebrate React Native New Architecture 🎉',
      subtitle: 'Fire celebratory particle confetti',
      icon: PartyPopper,
      iconColor: 'text-amber-400',
      action: triggerConfetti,
    },
  ];

  const filteredActions = actions.filter((action) => {
    const text = `${action.title} ${action.subtitle} ${action.category}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.16 }}
          className="relative w-full max-w-xl bg-slate-900 border border-rn-cyan/40 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="p-3.5 border-b border-white/10 flex items-center gap-3 bg-slate-800/80">
            <Search className="w-5 h-5 text-rn-cyan flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands, projects, shortcuts..."
              className="w-full bg-transparent border-none text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-0 font-medium"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {copiedText && (
            <div className="bg-emerald-500 text-slate-950 text-xs font-bold py-1 px-4 text-center">
              {copiedText}
            </div>
          )}

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredActions.length > 0 ? (
              filteredActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.08] transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-white/[0.04] border border-white/5 ${action.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block group-hover:text-rn-cyan transition-colors">
                          {action.title}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {action.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-white/[0.03]">
                      {action.category}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No matching actions found for "{query}".
              </div>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="p-2.5 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Navigation: ↑ ↓ Enter</span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
