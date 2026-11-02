import React from 'react';
import { motion } from 'framer-motion';
import { TechIcon } from './TechIcons';
import { Sparkles, Terminal, Code2, Cpu, Database, Flame } from 'lucide-react';

interface MarqueeItem {
  name: string;
  category: string;
  iconName?: string;
}

const primaryTechList: MarqueeItem[] = [
  { name: 'C Language', category: 'Systems', iconName: 'C' },
  { name: 'Python', category: 'Backend / AI', iconName: 'Python' },
  { name: 'JavaScript', category: 'Frontend / Full-Stack', iconName: 'JavaScript' },
  { name: 'React.js', category: 'UI Library', iconName: 'React' },
  { name: 'Node.js', category: 'Runtime', iconName: 'Node' },
  { name: 'Express.js', category: 'Web Framework', iconName: 'Express' },
  { name: 'MongoDB', category: 'NoSQL Database', iconName: 'MongoDB' },
  { name: 'Tailwind CSS', category: 'Modern Styling', iconName: 'Tailwind' },
  { name: 'HTML5', category: 'Semantic Web', iconName: 'HTML' },
  { name: 'CSS3', category: 'Styling & Animations', iconName: 'CSS' },
  { name: 'Git', category: 'Version Control', iconName: 'Git' },
  { name: 'GitHub', category: 'Code Collaboration', iconName: 'GitHub' },
];

const secondaryTechList = [
  { label: 'BMSCE Bangalore', sub: "B.E. Computer Science '26", icon: <Terminal className="w-3.5 h-3.5 text-violet-400" /> },
  { label: 'Full-Stack Web Engineering', sub: 'MERN Stack Architecture', icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" /> },
  { label: 'Data Structures & Algorithms', sub: 'Problem Solving & Logic', icon: <Cpu className="w-3.5 h-3.5 text-fuchsia-400" /> },
  { label: 'RESTful API Design', sub: 'Backend Architecture', icon: <Database className="w-3.5 h-3.5 text-emerald-400" /> },
  { label: 'Computer Vision Systems', sub: 'Real-Time Pose & Motion', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
  { label: 'Clean Code Principles', sub: 'Scalable & Maintainable', icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" /> },
];

export const TechMarquee: React.FC = () => {
  // Duplicate arrays to create infinite seamless loop
  const duplicatedTech = [...primaryTechList, ...primaryTechList, ...primaryTechList];
  const duplicatedTags = [...secondaryTechList, ...secondaryTechList, ...secondaryTechList, ...secondaryTechList];

  return (
    <section className="relative py-10 sm:py-14 overflow-hidden bg-black border-y border-white/[0.06]">
      {/* Background Ambient Glow Ribbon */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[35vw] h-24 bg-violet-600/[0.08] blur-[70px]"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-24 bg-cyan-600/[0.08] blur-[70px]"></div>
      </div>

      {/* Left and Right Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"></div>

      <div className="space-y-4">
        {/* Row 1: Verified Technical Skills Marquee (Scrolling Left) */}
        <div className="flex select-none overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 28,
                ease: 'linear',
              },
            }}
            className="flex items-center gap-4 flex-nowrap"
          >
            {duplicatedTech.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-card hover:border-violet-500/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 flex-shrink-0 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center p-1.5 group-hover:scale-110 transition-transform flex-shrink-0">
                  {item.iconName && <TechIcon name={item.iconName} className="w-5 h-5" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Focus Areas & Academic Credentials Marquee (Scrolling Right) */}
        <div className="flex select-none overflow-hidden">
          <motion.div
            animate={{ x: ['-33.333%', '0%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 32,
                ease: 'linear',
              },
            }}
            className="flex items-center gap-3 flex-nowrap"
          >
            {duplicatedTags.map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="group flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all duration-300 flex-shrink-0 cursor-pointer"
              >
                <span className="p-1 rounded-full bg-white/[0.06] border border-white/[0.1] flex-shrink-0">
                  {item.icon}
                </span>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white whitespace-nowrap">
                  {item.label}
                </span>
                <span className="text-[10px] font-mono text-violet-300/80 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20 whitespace-nowrap">
                  {item.sub}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
