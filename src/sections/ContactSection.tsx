import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Download, Copy, CheckCircle2, Send, Sparkles, ExternalLink } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = profileData.cvPdfPath;
    link.download = profileData.cvFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
      subject || 'Discussion: Senior React Native / Full-Stack Role'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-rn-cyan uppercase tracking-wider mb-3 shadow-sm dark:shadow-none">
          <Mail className="w-3.5 h-3.5" />
          Direct Hiring & Engineering Communication
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Let’s Build Something Exceptional
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2.5">
          Reach out directly to Mohit Khandelwal for senior mobile engineering, architecture consultations, or full-time engagements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contact Info Cards */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-mobile-card flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 dark:bg-rn-cyan/10 border border-cyan-500/20 dark:border-rn-cyan/30 flex items-center justify-center text-cyan-600 dark:text-rn-cyan">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block uppercase font-semibold">
                  Direct Email
                </span>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-rn-cyan transition-colors"
                >
                  {profileData.email}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(profileData.email, 'email')}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10"
              title="Copy Email"
            >
              {copiedKey === 'email' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-mobile-card flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block uppercase font-semibold">
                  Phone / WhatsApp
                </span>
                <a
                  href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                  className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {profileData.phone}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(profileData.phone, 'phone')}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10"
              title="Copy Phone"
            >
              {copiedKey === 'phone' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </motion.div>

          {/* Location & Social Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Location Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-mobile-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block uppercase font-semibold">
                    Location
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {profileData.location}
                  </span>
                </div>
              </div>
            </div>

            {/* CV Download Card */}
            <div
              onClick={handleDownloadCV}
              className="cursor-pointer p-5 rounded-3xl bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-cyan-950/40 dark:to-indigo-950/40 border border-cyan-300 dark:border-rn-cyan/40 shadow-sm dark:shadow-mobile-card hover:border-rn-cyan transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 dark:bg-rn-cyan/20 border border-cyan-500/30 dark:border-rn-cyan/40 flex items-center justify-center text-cyan-700 dark:text-rn-cyan group-hover:scale-110 transition-transform">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-700 dark:text-rn-cyan block uppercase font-bold">
                    Official Resume
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Download CV (PDF)
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* External Social Profiles */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-600/15 hover:bg-blue-100 dark:hover:bg-blue-600/25 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-between transition-all shadow-sm dark:shadow-none"
            >
              <span className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-600/15 hover:bg-purple-100 dark:hover:bg-purple-600/25 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-between transition-all shadow-sm dark:shadow-none"
            >
              <span className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>

        </div>

        {/* Right Column: Interactive Quick Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-mobile-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-rn-cyan" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Direct Mail Composer
            </h3>
          </div>

          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-semibold">
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Senior React Native Engineer Role / Interview"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-rn-cyan/60 transition-colors font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-semibold">
                Message Content
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Mohit, I reviewed your experience with React Native New Architecture, CodePush, and full-stack delivery..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-rn-cyan/60 transition-colors font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-rn-cyan to-rn-blue text-slate-950 font-bold text-sm shadow-rn-glow hover:opacity-95 transition-all active:scale-98"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>Launch Mail Client to Send</span>
            </button>
          </form>

          <p className="text-[11px] text-slate-500 mt-4 text-center">
            One-click direct dispatch to <strong className="text-slate-700 dark:text-slate-400">mk14novm@gmail.com</strong>.
          </p>
        </motion.div>

      </div>

    </section>
  );
};
