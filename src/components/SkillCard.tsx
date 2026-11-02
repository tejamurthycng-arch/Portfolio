import React from 'react';
import { 
  Terminal, 
  FileCode, 
  Code2, 
  Layout, 
  Palette, 
  Layers, 
  Sparkles, 
  Server, 
  Cpu, 
  Database, 
  GitBranch, 
  Github,
  type LucideIcon
} from 'lucide-react';
import { SkillItem } from '../data/skills';

interface SkillCardProps {
  skill: SkillItem;
}

const iconMap: Record<string, LucideIcon> = {
  Terminal,
  FileCode,
  Code2,
  Layout,
  Palette,
  Layers,
  Sparkles,
  Server,
  Cpu,
  Database,
  GitBranch,
  Github,
};

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const IconComponent = iconMap[skill.iconName] || Code2;

  return (
    <div className="group relative p-5 rounded-xl bg-navy-900/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-navy-850/80 transition-all duration-300 hover:shadow-electric-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-10 h-10 rounded-lg bg-navy-800 border border-cyan-500/20 flex items-center justify-center text-electric group-hover:scale-105 group-hover:border-electric/50 transition-all duration-300">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white group-hover:text-electric transition-colors duration-200">
              {skill.name}
            </h4>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {skill.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>Verified Skill</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span>
      </div>
    </div>
  );
};
