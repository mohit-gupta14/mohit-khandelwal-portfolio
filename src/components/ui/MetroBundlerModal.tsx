import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, RefreshCw } from 'lucide-react';

interface MetroBundlerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetroBundlerModal: React.FC<MetroBundlerModalProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<string[]>([
    'Welcome to React Native Metro Bundler (v0.80.12)',
    'Target architecture: Fabric + TurboModules (New Architecture)',
    'JS Engine: Hermes (Optimized Bytecode v96)',
    'Platform targets: iOS (Metal) & Android (Vulkan)',
    'Reanimated 3: Worklet runtime initialized @ 60 FPS',
    'FlashList virtualization: active',
    'CodePush OTA sync endpoint: ready',
    'BUNDLE  ./src/index.js ░░░░░░░░░░░░░░░░ 100.0% (1,420 modules) [DONE in 218ms]',
    'Active Developer: Mohit Khandelwal (Senior Mobile Engineer)',
  ]);
  const [isReloading, setIsReloading] = useState(false);

  const triggerReload = () => {
    setIsReloading(true);
    setLogs((prev) => [...prev, '🔄 Reloading JavaScript bundle...']);
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `✅ Fast Refresh completed in 114ms (1 module changed)`,
        `Hermes memory footprint: 18.4 MB (nominal)`,
      ]);
      setIsReloading(false);
    }, 450);
  };

  const clearLogs = () => {
    setLogs(['Metro v0.80.12 - Console cleared.']);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl bg-slate-950 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden z-10 font-mono text-xs"
        >
          {/* Terminal Window Title Bar */}
          <div className="px-4 py-3 bg-slate-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity"
                  aria-label="Close"
                />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-slate-400 text-[11px] ml-2 font-mono flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                metro-bundler:8081 — mohit-khandelwal@engine
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Controls */}
          <div className="px-4 py-2 bg-slate-900/60 border-b border-white/5 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                RUNNING
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-rn-cyan">Fabric: ON</span>
              <span className="text-slate-500">|</span>
              <span className="text-purple-400">TurboModules: ON</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={triggerReload}
                disabled={isReloading}
                className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 transition-transform active:scale-95"
              >
                <RefreshCw className={`w-3 h-3 ${isReloading ? 'animate-spin' : ''}`} />
                Reload (r)
              </button>
              <button
                onClick={clearLogs}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 text-[10px]"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="p-4 bg-slate-950/95 max-h-72 overflow-y-auto space-y-1.5 text-slate-300 text-[11px] leading-relaxed select-text">
            <div className="text-emerald-400 font-bold">
              {'              ____                                    '} <br />
              {'  /\\/\\   ___| |_ _ __ ___                            '} <br />
              {' /    \\ / _ \\ __| \'__/ _ \\   React Native Metro Bundler'} <br />
              {'/ /\\/\\ \\  __/ |_| | | (_) |  Fabric Engine Active      '} <br />
              {'\\/    \\/\\___|\\__|_|  \\___/                             '}
            </div>

            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-slate-600 select-none">&gt;</span>
                <span
                  className={
                    log.includes('✅')
                      ? 'text-emerald-400'
                      : log.includes('🔄')
                      ? 'text-amber-400'
                      : log.includes('Fabric')
                      ? 'text-rn-cyan font-semibold'
                      : 'text-slate-300'
                  }
                >
                  {log}
                </span>
              </div>
            ))}
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-2.5 bg-slate-900 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Cmd+R</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">r</kbd> to reload bundle</span>
            <span className="text-rn-cyan">Built with React Native principles</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
