import React from 'react';
import { motion } from 'framer-motion';
import { TechIcon } from './TechIcons';

interface MarqueeItem {
  name: string;
  category: string;
  iconName: string;
}

const techList: MarqueeItem[] = [
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

export const TechMarquee: React.FC = () => {
  // Duplicate array 3 times for a seamless infinite loop
  const duplicatedTech = [...techList, ...techList, ...techList];

  return (
    <section className="relative py-7 sm:py-9 overflow-hidden bg-transparent border-y border-white/[0.06]">
      {/* Left and Right Edge Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#030407] via-[#030407]/80 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#030407] via-[#030407]/80 to-transparent z-20 pointer-events-none"></div>

      {/* Single Unified Marquee Ribbon */}
      <div className="flex select-none overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 26,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-4 flex-nowrap"
        >
          {duplicatedTech.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="group flex items-center gap-3 px-4 py-2 rounded-2xl glass-card hover:border-violet-500/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 flex-shrink-0 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center p-1.5 group-hover:scale-110 transition-transform flex-shrink-0">
                <TechIcon name={item.iconName} className="w-5 h-5" />
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
    </section>
  );
};
