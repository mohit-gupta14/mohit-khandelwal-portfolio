import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-rn-cyan uppercase tracking-wider mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          Academic Foundation
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Education & Honors
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2.5">
          Proven academic rigor backed by university top honors in computer applications.
        </p>
      </div>

      {/* Grid of Education Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {educationData.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-white/10 shadow-mobile-card flex flex-col justify-between"
          >
            <div>
              {/* Header with icon & date */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <GraduationCap className="w-6 h-6 text-rn-cyan" />
                </div>
                <span className="text-xs font-mono text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/5">
                  {edu.period}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">
                {edu.degree}
              </h3>
              <p className="text-sm text-slate-300 font-medium mt-1">
                {edu.institution}
              </p>

              {edu.grade && (
                <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-xs text-slate-300">
                  <Award className="w-4 h-4 text-rn-cyan flex-shrink-0" />
                  <span className="text-white font-mono font-bold">{edu.grade}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 flex items-center text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Degree Credential
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
