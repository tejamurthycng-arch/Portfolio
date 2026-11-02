import React from 'react';
import { motion } from 'framer-motion';

export interface MarqueeItem {
  text: string;
  subtext?: string;
  icon?: React.ReactNode;
}

interface SectionMarqueeProps {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
  speed?: number; // duration in seconds
  className?: string;
}

export const SectionMarquee: React.FC<SectionMarqueeProps> = ({
  items,
  direction = 'left',
  speed = 28,
  className = '',
}) => {
  // Duplicate array 3 times for a seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items];

  const animateX = direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'];

  return (
    <div className={`relative py-5 sm:py-6 overflow-hidden bg-black border-y border-white/[0.06] select-none ${className}`}>
      {/* Left and Right Edge Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"></div>

      {/* Marquee Track */}
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: animateX }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: speed,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-3.5 sm:gap-4 flex-nowrap"
        >
          {duplicatedItems.map((item, idx) => (
            <div
              key={`${item.text}-${idx}`}
              className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full glass-pill hover:border-violet-500/60 hover:bg-white/[0.07] transition-all duration-300 flex-shrink-0 cursor-default"
            >
              {item.icon && (
                <span className="p-1 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </span>
              )}
              <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors whitespace-nowrap">
                {item.text}
              </span>
              {item.subtext && (
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/25 whitespace-nowrap">
                  {item.subtext}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
