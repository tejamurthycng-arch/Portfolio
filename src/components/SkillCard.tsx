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
      className="group relative p-6 rounded-2xl glass-card flex flex-col justify-between overflow-hidden"
    >
      {/* Top subtle violet-cyan hover indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div>
        <div className="flex items-center gap-4 mb-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center p-2.5 group-hover:scale-110 group-hover:border-violet-500/60 transition-all duration-300 shadow-sm backdrop-blur-md">
            <TechIcon name={skill.name} className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
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
