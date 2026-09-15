import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, QrCode, Activity, RotateCw, CheckCircle2, ShieldCheck, Zap, ChevronLeft, MapPin } from 'lucide-react';

export const DeviceFrame: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contract-os' | 'ticketsir' | 'ilant'>('contract-os');
  const [scanCount, setScanCount] = useState<number>(1248);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanFeedback, setScanFeedback] = useState<string | null>(null);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScanCount((prev) => prev + 1);
      setIsScanning(false);
      setScanFeedback('VIP Pass #9402 Verified');
      setTimeout(() => setScanFeedback(null), 2000);
    }, 400);
  };

  return (
    <div className="relative mx-auto select-none">
      
      {/* Soft Ambient Glow under iPhone */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-purple-500/10 rounded-[60px] blur-3xl -z-10 pointer-events-none opacity-80" />

      {/* ========================================================
          AUTHENTIC iPHONE 16 PRO TITANIUM CHASSIS
         ======================================================== */}
      <div className="relative w-[320px] sm:w-[340px] rounded-[52px] p-[10px] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.4)]">
        
        {/* Left Hardware Buttons: Action Button, Volume Up, Volume Down */}
        <div className="absolute top-[82px] -left-[3.5px] w-[3.5px] h-[18px] bg-slate-500 rounded-l-sm shadow-sm" />
        <div className="absolute top-[115px] -left-[3.5px] w-[3.5px] h-[36px] bg-slate-500 rounded-l-sm shadow-sm" />
        <div className="absolute top-[160px] -left-[3.5px] w-[3.5px] h-[36px] bg-slate-500 rounded-l-sm shadow-sm" />

        {/* Right Hardware Buttons: Side Power Button & Camera Control */}
        <div className="absolute top-[125px] -right-[3.5px] w-[3.5px] h-[52px] bg-slate-500 rounded-r-sm shadow-sm" />
        <div className="absolute top-[230px] -right-[3.5px] w-[3.5px] h-[28px] bg-slate-600/90 rounded-r-sm shadow-sm" title="Camera Control" />

        {/* Outer Titanium Bevel Line */}
        <div className="relative rounded-[44px] p-[3px] bg-slate-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
          
          {/* OLED Screen Edge */}
          <div className="relative rounded-[41px] overflow-hidden bg-black flex flex-col justify-between text-slate-100 min-h-[580px] sm:min-h-[610px] border border-white/[0.08]">
            
            {/* Gloss Glass Light Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none z-30" />

            {/* ========================================================
                NATIVE iOS STATUS BAR & DYNAMIC ISLAND
               ======================================================== */}
            <div className="pt-3 px-6 flex items-center justify-between z-20 relative bg-black">
              {/* iOS Time */}
              <span className="text-[12px] font-semibold tracking-tight text-white font-sans">
                9:41
              </span>

              {/* Dynamic Island Pill */}
              <div className="w-[105px] h-[26px] rounded-full bg-black border border-white/[0.12] flex items-center justify-between px-2.5 shadow-inner group">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-blue-500/80" />
                </span>
                <span className="text-[9.5px] font-mono text-rn-cyan font-bold tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FABRIC
                </span>
                <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
              </div>

              {/* iOS Signal, 5G & Battery */}
              <div className="flex items-center gap-1.5 text-white">
                {/* 4 iOS Signal Bars */}
                <div className="flex items-end gap-[1.5px] h-2.5">
                  <span className="w-[2.5px] h-[3px] bg-white rounded-xs" />
                  <span className="w-[2.5px] h-[5px] bg-white rounded-xs" />
                  <span className="w-[2.5px] h-[7px] bg-white rounded-xs" />
                  <span className="w-[2.5px] h-[9px] bg-white rounded-xs" />
                </div>
                <span className="text-[9px] font-bold tracking-tight">5G</span>
                {/* iOS Battery Capsule */}
                <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-[1.5px] flex items-center relative">
                  <div className="h-full bg-emerald-400 rounded-xs w-full" />
                  <div className="absolute -right-[2.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-1 bg-white/80 rounded-r-xs" />
                </div>
              </div>
            </div>

            {/* ========================================================
                iOS SEGMENTED CONTROL TABS
               ======================================================== */}
            <div className="px-3 pt-2.5 z-20">
              <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-white/10 shadow-inner">
                <button
                  onClick={() => setActiveTab('contract-os')}
                  className={`flex-1 py-1.5 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'contract-os'
                      ? 'bg-rn-cyan text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Navigation className="w-3 h-3" />
                  <span>Fleet GPS</span>
                </button>
                <button
                  onClick={() => setActiveTab('ticketsir')}
                  className={`flex-1 py-1.5 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'ticketsir'
                      ? 'bg-rn-cyan text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-3 h-3" />
                  <span>Scanner</span>
                </button>
                <button
                  onClick={() => setActiveTab('ilant')}
                  className={`flex-1 py-1.5 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'ilant'
                      ? 'bg-rn-cyan text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  <span>Health</span>
                </button>
              </div>
            </div>

            {/* ========================================================
                NATIVE iOS APP VIEWPORT
               ======================================================== */}
            <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden relative z-10">
              
              <AnimatePresence mode="wait">
                {/* 1. CONTRACT OS APP */}
                {activeTab === 'contract-os' && (
                  <motion.div
                    key="contract-os"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* App Navigation Bar */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                        <div className="flex items-center gap-1 text-[11px] text-rn-cyan font-medium">
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Fleet Telemetry</span>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live AUS/NZ
                        </span>
                      </div>

                      {/* Radar Map View */}
                      <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 p-3 mb-2.5 relative overflow-hidden">
                        <div className="flex justify-between items-center text-[10px] mb-1.5">
                          <div className="flex items-center gap-1 text-white font-bold">
                            <MapPin className="w-3 h-3 text-rn-cyan" />
                            <span>Vehicle #402 (Sydney - M4)</span>
                          </div>
                          <span className="text-rn-cyan font-mono text-[9px] font-bold">88 km/h</span>
                        </div>

                        {/* Visual GPS Telemetry Map */}
                        <div className="h-28 rounded-xl bg-slate-950 border border-white/10 relative flex items-center justify-center overflow-hidden">
                          {/* Radial Coordinate Grid */}
                          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#00d8ff_1px,transparent_1px)] [background-size:10px_10px]" />
                          
                          {/* Route Path Line */}
                          <div className="absolute w-40 h-[1.5px] bg-gradient-to-r from-transparent via-rn-cyan to-indigo-500 rotate-[-18deg] opacity-70" />

                          {/* Pulsing Vehicle Marker */}
                          <div className="relative flex items-center justify-center">
                            <span className="absolute w-10 h-10 rounded-full bg-rn-cyan/20 animate-ping" />
                            <span className="relative w-4 h-4 rounded-full bg-rn-cyan border-2 border-white shadow-[0_0_12px_#00d8ff] flex items-center justify-center">
                              <span className="w-1 h-1 rounded-full bg-slate-950" />
                            </span>
                          </div>

                          <span className="absolute bottom-1.5 right-2 text-[8px] font-mono text-slate-400 bg-black/60 px-1.5 py-0.5 rounded">
                            Supabase Realtime
                          </span>
                        </div>
                      </div>

                      {/* Fleet Info Card */}
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1 text-[10px]">
                        <div className="flex justify-between text-slate-400">
                          <span>Architecture:</span>
                          <span className="text-white font-mono">React Native • Next.js 14</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Billing & Auth:</span>
                          <span className="text-white font-mono">Stripe Subscriptions + RBAC</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>AI Assistant:</span>
                          <span className="text-purple-300 font-mono">Google Gemini API</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1.5 text-center text-[9px] text-slate-500 font-mono">
                      End-to-End Solo Architectural Delivery
                    </div>
                  </motion.div>
                )}

                {/* 2. TICKETSIR SCANNER APP */}
                {activeTab === 'ticketsir' && (
                  <motion.div
                    key="ticketsir"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* App Navigation Bar */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                        <div className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Event Gate Validator</span>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          99.97% Accuracy
                        </span>
                      </div>

                      {/* Camera Viewfinder Card */}
                      <div className="rounded-2xl bg-slate-900 border border-white/10 p-3 mb-2 relative overflow-hidden">
                        <div className="relative h-32 rounded-xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                          {/* Viewfinder Target Reticle */}
                          <div className="w-24 h-24 border border-rn-cyan/60 rounded-xl relative flex items-center justify-center">
                            {/* Viewfinder Corners */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-rn-cyan" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-rn-cyan" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-rn-cyan" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-rn-cyan" />

                            {/* Animated Laser Scan Line */}
                            <motion.div
                              animate={{ y: [-36, 36, -36] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              className="w-20 h-[2px] bg-rn-cyan shadow-[0_0_8px_#00d8ff]"
                            />
                          </div>

                          {/* Live Scan Trigger Overlay */}
                          <div className="absolute bottom-2 flex items-center gap-2">
                            <button
                              onClick={triggerScan}
                              disabled={isScanning}
                              className="px-3 py-1 rounded-full bg-rn-cyan text-slate-950 font-bold text-[10px] flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all"
                            >
                              {isScanning ? (
                                <>
                                  <RotateCw className="w-3 h-3 animate-spin" />
                                  Decoding...
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-3 h-3" />
                                  Scan Pass
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {scanFeedback && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 py-1 rounded-lg border border-emerald-500/20"
                          >
                            ✅ {scanFeedback}
                          </motion.div>
                        )}
                      </div>

                      {/* Throughput Stats Card */}
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-[10px]">
                        <div>
                          <div className="text-slate-400">Peak Scan Rate:</div>
                          <div className="text-white font-mono font-bold text-xs">{scanCount} scans/hr</div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-400">Offline Fallback:</div>
                          <div className="text-emerald-400 font-mono font-bold">AsyncStorage</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1.5 text-center text-[9px] text-slate-500 font-mono">
                      120k+ Events • 500k+ Users Scaled
                    </div>
                  </motion.div>
                )}

                {/* 3. iLANT HEALTH APP */}
                {activeTab === 'ilant' && (
                  <motion.div
                    key="ilant"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* App Navigation Bar */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                        <div className="flex items-center gap-1 text-[11px] text-indigo-400 font-medium">
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Cardiometabolic Care</span>
                        </div>
                        <span className="text-[9px] font-mono text-rn-cyan bg-rn-cyan/10 px-2 py-0.5 rounded-full border border-rn-cyan/20">
                          Active Role
                        </span>
                      </div>

                      {/* Patient Health Dashboard Card */}
                      <div className="rounded-2xl bg-slate-900 border border-white/10 p-3 mb-2.5 space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-300 font-bold">Longitudinal Vitals</span>
                          <span className="text-emerald-400 font-mono font-bold">72 BPM (Nominal)</span>
                        </div>

                        {/* Simulated ECG Heartbeat Waveform */}
                        <div className="h-16 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center p-2 relative overflow-hidden">
                          <svg className="w-full h-10 text-emerald-400" viewBox="0 0 100 25" fill="none" stroke="currentColor">
                            <path
                              d="M0 12.5 H25 L28 4 L33 22 L37 8 L40 16 L43 12.5 H60 L63 4 L68 22 L72 8 L75 16 L78 12.5 H100"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        <div className="pt-1 flex justify-between text-[10px] text-slate-300">
                          <span>Active Patients:</span>
                          <span className="text-white font-mono font-bold">15,000+</span>
                        </div>
                      </div>

                      {/* CI/CD & Security Card */}
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5 text-[10px]">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-emerald-400" />
                            CI/CD OTA Release:
                          </span>
                          <span className="text-emerald-400 font-bold font-mono">3 Days → 4 Hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-rn-cyan" />
                            Compliance:
                          </span>
                          <span className="text-white font-mono">HIPAA Encrypted</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1.5 text-center text-[9px] text-slate-500 font-mono">
                      Fastlane + CodePush Zero-Downtime
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* ========================================================
                AUTHENTIC iOS HOME INDICATOR BAR
               ======================================================== */}
            <div className="pb-2 pt-1 flex justify-center z-20">
              <div className="w-28 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-colors cursor-pointer" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
