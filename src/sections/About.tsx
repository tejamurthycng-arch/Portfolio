import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Code2, 
  BrainCircuit, 
  MapPin, 
  BookOpen
} from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { SectionHeading } from '../components/SectionHeading';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="// 01. ABOUT ME"
          title="Engineering Foundations & Drive"
          subtitle="Computer Science student at BMSCE dedicated to clean code, strong algorithmic fundamentals, and impactful software."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Focused Introduction & 3 Pillars with Motion */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Primary introduction quote card with Translucent Glass */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 sm:p-7 rounded-2xl glass-card relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-violet-500 via-indigo-500 to-cyan-400"></div>
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed italic pl-2">
                "{personalInfo.aboutIntro}"
              </p>
            </motion.div>

            {/* 3 Crisp Engineering Focus Cards with Staggered Motion */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl glass-card transition-all"
              >
                <span className="p-2.5 rounded-xl bg-violet-500/10 text-cyan-400 border border-violet-500/20 inline-block mb-3">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <h4 className="text-white font-bold text-base mb-1.5">Academics</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  2nd Year B.E. Computer Science & Engineering at BMSCE Bangalore with focus on core CS fundamentals.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl glass-card transition-all"
              >
                <span className="p-2.5 rounded-xl bg-violet-500/10 text-cyan-400 border border-violet-500/20 inline-block mb-3">
                  <Code2 className="w-5 h-5" />
                </span>
                <h4 className="text-white font-bold text-base mb-1.5">Technical Focus</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Full-stack web applications, practical AI & computer vision systems, and systems programming.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl glass-card transition-all"
              >
                <span className="p-2.5 rounded-xl bg-violet-500/10 text-cyan-400 border border-violet-500/20 inline-block mb-3">
                  <BrainCircuit className="w-5 h-5" />
                </span>
                <h4 className="text-white font-bold text-base mb-1.5">Growth Mindset</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Disciplined problem solving, structured data structures, and continuous curiosity for modern tools.
                </p>
              </motion.div>
            </div>

          </div>

          {/* Right Column: Compact Overview Card with Motion & Translucent Glass */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl glass-panel"
            >
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-400" />
                Quick Overview
              </h3>

              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
                  <span className="text-slate-400">Name</span>
                  <span className="text-white font-medium">{personalInfo.name}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
                  <span className="text-slate-400">Role</span>
                  <span className="text-violet-300 font-medium">{personalInfo.role}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
                  <span className="text-slate-400">College</span>
                  <span className="text-white font-medium text-right">BMSCE, Bangalore</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
                  <span className="text-slate-400">Degree</span>
                  <span className="text-white font-medium">B.E. CSE (2nd Year)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
                  <span className="text-slate-400">Location</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {personalInfo.location}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">GitHub</span>
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-violet-300 hover:underline"
                  >
                    @{personalInfo.githubUsername}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
