import React from 'react';
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
    <div className={cn("mb-12 md:mb-16", align === 'center' ? "text-center mx-auto max-w-2xl" : "max-w-2xl", className)}>
      <div className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border border-red-500/30 bg-red-950/50 text-rose-300 mb-3 shadow-sm",
        align === 'center' ? "mx-auto" : ""
      )}>
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        {badge}
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
