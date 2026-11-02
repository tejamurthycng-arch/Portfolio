import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '../data/education';
import { SectionHeading } from '../components/SectionHeading';
import { GraduationCap, Calendar, MapPin, BookOpen, CheckCircle } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="// 05. ACADEMIC FOUNDATION"
          title="Education & Engineering Studies"
          subtitle="Rigorous foundational computer science education at BMS College of Engineering, Bangalore."
        />

        <div className="max-w-4xl mx-auto">
          {educationData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-7 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-rose-500/40 transition-all duration-300 shadow-glass backdrop-blur-2xl"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.07]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0 shadow-sm backdrop-blur-md">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {item.institution}
                    </h3>
                    <p className="text-base text-rose-400 font-medium mt-0.5">
                      {item.degree} — {item.branch}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5 font-mono text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-200 border border-rose-500/30 w-fit backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    {item.currentYear}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300/90 text-sm md:text-base leading-relaxed my-6">
                {item.description}
              </p>

              {/* Coursework & Focus Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Coursework */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Core Coursework
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300/90">
                    {item.coursework.map((course) => (
                      <li key={course} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Engineering Focus */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Key Engineering Focus
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300/90">
                    {item.keyFocus.map((focus) => (
                      <li key={focus} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        <span>{focus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
