import React from 'react';
import { motion } from 'framer-motion';
import { SkillItem } from '../data/skills';
import { TechIcon } from './TechIcons';

interface SkillCardProps {
  skill: SkillItem;
  index?: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-rose-500/50 hover:bg-white/[0.06] transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(244,63,94,0.25)] flex flex-col justify-between overflow-hidden backdrop-blur-xl shadow-glass"
    >
      {/* Top subtle red hover indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div>
        <div className="flex items-center gap-4 mb-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center p-2.5 group-hover:scale-110 group-hover:border-rose-500/60 transition-all duration-300 shadow-sm backdrop-blur-md">
            <TechIcon name={skill.name} className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors duration-200">
              {skill.name}
            </h4>
            <span className="text-[11px] font-mono text-slate-400 capitalize">
              {skill.category}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mt-2">
          {skill.description}
        </p>
      </div>
    </motion.div>
  );
};
