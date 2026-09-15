import React from 'react';
import { ArrowUp, Download } from 'lucide-react';
import { profileData } from '../../data/portfolioData';

export const AppFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <footer className="w-full bg-slate-950/90 border-t border-white/10 pt-12 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Branding */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm tracking-tight">
              {profileData.name}
            </span>
            <span className="text-[10px] font-mono text-rn-cyan px-2 py-0.5 rounded bg-rn-cyan/10 border border-rn-cyan/20">
              Senior Mobile Engineer
            </span>
          </div>
          <p className="text-slate-400 text-xs">
            Architecting high-scale React Native & Full-Stack applications.
          </p>
        </div>

        {/* Center: Tech note & React detail */}
        <div className="flex items-center gap-1.5 text-center text-xs text-slate-400 font-mono">
          <span>Engineered with</span>
          <span className="text-rn-cyan font-bold">React</span>
          <span>•</span>
          <span className="text-blue-400">TypeScript</span>
          <span>•</span>
          <span className="text-indigo-400">Tailwind</span>
          <span>•</span>
          <span className="text-emerald-400">Framer Motion</span>
        </div>

        {/* Right: Quick actions & Back to top */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors text-xs"
          >
            <Download className="w-3.5 h-3.5 text-rn-cyan" />
            <span>CV PDF</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4 text-rn-cyan" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
        <div>
          © {new Date().getFullYear()} Mohit Khandelwal. All portfolio data backed by authentic CV.
        </div>
        <div>
          Jaipur, Rajasthan, India • mk14novm@gmail.com
        </div>
      </div>
    </footer>
  );
};
