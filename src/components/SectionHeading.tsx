import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-12 md:mb-16", align === 'center' ? "text-center mx-auto max-w-2xl" : "max-w-2xl", className)}
    >
      <div className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium border border-rose-500/30 bg-rose-500/10 text-rose-300 mb-4 backdrop-blur-xl shadow-sm",
        align === 'center' ? "mx-auto" : ""
      )}>
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]"></span>
        {badge}
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
