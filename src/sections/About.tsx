import React from 'react';
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
          
          {/* Left Column: Focused Introduction & 3 Pillars */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Primary introduction quote card with Crimson border */}
            <div className="p-6 sm:p-7 rounded-2xl bg-navy-900/80 border border-red-500/30 shadow-crimson-sm relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 to-rose-600"></div>
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed italic">
                "{personalInfo.aboutIntro}"
              </p>
            </div>

            {/* 3 Crisp Engineering Focus Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 hover:border-red-500/40 transition-all">
                <span className="p-2.5 rounded-xl bg-navy-800 text-rose-400 border border-red-500/20 inline-block mb-3">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <h4 className="text-white font-bold text-base mb-1.5">Academics</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  2nd Year B.E. Computer Science & Engineering at BMSCE Bangalore with focus on core CS fundamentals.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 hover:border-red-500/40 transition-all">
                <span className="p-2.5 rounded-xl bg-navy-800 text-rose-400 border border-red-500/20 inline-block mb-3">
                  <Code2 className="w-5 h-5" />
                </span>
                <h4 className="text-white font-bold text-base mb-1.5">Technical Focus</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Full-stack web applications, practical AI & computer vision systems, and systems programming.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 hover:border-red-500/40 transition-all">
                <span className="p-2.5 rounded-xl bg-navy-800 text-rose-400 border border-red-500/20 inline-block mb-3">
                  <BrainCircuit className="w-5 h-5" />
                </span>
                <h4 className="text-white font-bold text-base mb-1.5">Growth Mindset</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Disciplined problem solving, structured data structures, and continuous curiosity for modern tools.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Compact Overview Card */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 backdrop-blur-sm shadow-md">
              <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Quick Overview
              </h3>

              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Name</span>
                  <span className="text-white font-medium">{personalInfo.name}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Role</span>
                  <span className="text-rose-400 font-medium">{personalInfo.role}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">College</span>
                  <span className="text-white font-medium text-right">BMSCE, Bangalore</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Degree</span>
                  <span className="text-white font-medium">B.E. CSE (2nd Year)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Location</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {personalInfo.location}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">GitHub</span>
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-400 hover:underline"
                  >
                    @{personalInfo.githubUsername}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
