import React from 'react';
import { SkillItem } from '../data/skills';
import { TechIcon } from './TechIcons';

interface SkillCardProps {
  skill: SkillItem;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div className="group relative p-6 rounded-2xl bg-navy-900/80 border border-slate-800/90 hover:border-red-500/50 hover:bg-navy-850 transition-all duration-300 hover:shadow-crimson-sm flex flex-col justify-between overflow-hidden backdrop-blur-sm">
      {/* Top subtle red hover indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div>
        <div className="flex items-center gap-4 mb-3.5">
          <div className="w-12 h-12 rounded-xl bg-navy-800/90 border border-red-500/25 flex items-center justify-center p-2.5 group-hover:scale-110 group-hover:border-red-500/60 transition-all duration-300 shadow-sm">
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

        <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mt-2">
          {skill.description}
        </p>
      </div>
    </div>
  );
};
