import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Layout, Server, Database, Sparkles, ShieldCheck, CheckCircle, Code } from 'lucide-react';
import { skillGroups } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Layout,
  Server,
  Database,
  Sparkles,
  ShieldCheck,
};

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkillName, setActiveSkillName] = useState<string | null>(null);

  const categories = ['All', ...skillGroups.map((g) => g.category)];

  const filteredGroups =
    selectedCategory === 'All'
      ? skillGroups
      : skillGroups.filter((g) => g.category === selectedCategory);

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-rn-cyan uppercase tracking-wider mb-3">
          <Code className="w-3.5 h-3.5" />
          Technical Stack & Architectural Competencies
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Battle-Tested Production Technologies
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2.5">
          Technologies strictly from Mohit's verified production track record across mobile, web, backend, and cloud.
        </p>
      </div>

      {/* Category Pills Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-rn-cyan text-slate-950 font-bold shadow-rn-glow-sm scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skill Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredGroups.map((group, groupIdx) => {
            const Icon = iconMap[group.iconName] || Smartphone;

            return (
              <motion.div
                key={group.category}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: groupIdx * 0.05 }}
                className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-mobile-card flex flex-col justify-between hover:border-rn-cyan/30 transition-colors"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-rn-cyan/15 border border-rn-cyan/30 flex items-center justify-center text-rn-cyan shadow-rn-glow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {group.category}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {group.skills.length} core technologies
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {group.description}
                  </p>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => {
                      return (
                        <div
                          key={sIdx}
                          onMouseEnter={() => setActiveSkillName(skill.name)}
                          onMouseLeave={() => setActiveSkillName(null)}
                          onClick={() =>
                            setActiveSkillName(
                              activeSkillName === skill.name ? null : skill.name
                            )
                          }
                          className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 select-none ${
                            skill.highlight
                              ? 'bg-slate-800/90 border border-rn-cyan/30 text-white shadow-sm hover:border-rn-cyan hover:bg-slate-800'
                              : 'bg-white/[0.04] border border-white/5 text-slate-300 hover:bg-white/[0.08] hover:text-white'
                          }`}
                        >
                          <span>{skill.name}</span>
                          {skill.tag && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rn-cyan/15 text-rn-cyan">
                              {skill.tag}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Insight */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified in Production
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    5+ Yrs Hands-On
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </section>
  );
};
