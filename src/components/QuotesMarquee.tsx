import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Code2, Compass, Zap, Lightbulb } from 'lucide-react';

interface QuoteItem {
  quote: string;
  author: string;
  tag?: string;
  icon?: React.ReactNode;
}

const inspirationalQuotes: QuoteItem[] = [
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    tag: "Mindset",
    icon: <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
  },
  {
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    tag: "Execution",
    icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" />
  },
  {
    quote: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    tag: "Craftsmanship",
    icon: <Zap className="w-3.5 h-3.5 text-violet-400" />
  },
  {
    quote: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    tag: "Innovation",
    icon: <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
  },
  {
    quote: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
    tag: "Architecture",
    icon: <Compass className="w-3.5 h-3.5 text-emerald-400" />
  },
  {
    quote: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    tag: "Clarity",
    icon: <Quote className="w-3.5 h-3.5 text-cyan-300" />
  },
  {
    quote: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
    tag: "Curiosity",
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />
  },
  {
    quote: "Programs must be written for people to read.",
    author: "Harold Abelson",
    tag: "Empathy",
    icon: <Lightbulb className="w-3.5 h-3.5 text-violet-300" />
  }
];

export const QuotesMarquee: React.FC = () => {
  // Duplicate array 3 times for a completely seamless infinite loop
  const duplicatedQuotes = [...inspirationalQuotes, ...inspirationalQuotes, ...inspirationalQuotes];

  return (
    <section 
      aria-label="Inspirational Quotes" 
      className="relative py-6 sm:py-8 overflow-hidden bg-black/60 backdrop-blur-md border-y border-white/[0.08] select-none"
    >
      {/* Subtle Glowing Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/[0.03] via-cyan-500/[0.04] to-violet-600/[0.03] pointer-events-none" />

      {/* Left and Right Edge Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

      {/* Infinite Scrolling Ribbon */}
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 36,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-4 sm:gap-6 flex-nowrap"
        >
          {duplicatedQuotes.map((item, idx) => (
            <div
              key={`${item.author}-${idx}`}
              className="group flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 flex-shrink-0 cursor-default backdrop-blur-xl"
            >
              {/* Icon Pill */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Quote Text */}
              <p className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors italic whitespace-nowrap">
                "{item.quote}"
              </p>

              {/* Author and Tag */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-xs font-semibold text-slate-400 group-hover:text-cyan-300 transition-colors whitespace-nowrap font-display">
                  — {item.author}
                </span>
                {item.tag && (
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 whitespace-nowrap">
                    {item.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
