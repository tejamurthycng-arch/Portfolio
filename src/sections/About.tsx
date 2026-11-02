import React from 'react';
import { 
  GraduationCap, 
  Code2, 
  Rocket, 
  BrainCircuit, 
  MapPin, 
  BookOpen, 
  Cpu 
} from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { SectionHeading } from '../components/SectionHeading';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="// 01. ABOUT ME"
          title="Engineering Foundations & Drive"
          subtitle="A passionate Computer Science student dedicated to crafting clean code, learning modern architectures, and building technology that solves real problems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary introduction quote card */}
            <div className="p-6 md:p-8 rounded-2xl bg-navy-900/80 border border-cyan-500/20 shadow-electric-sm relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-electric to-blue-600"></div>
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed italic">
                "{personalInfo.aboutIntro}"
              </p>
            </div>

            {/* Narrative breakdown */}
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-navy-900/40 border border-slate-800/80">
                <span className="p-2 rounded-lg bg-navy-800 text-electric border border-cyan-500/20 mt-1 flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">Academic Background</h4>
                  <p className="text-slate-400 text-sm">
                    {personalInfo.aboutDetailed.background}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-navy-900/40 border border-slate-800/80">
                <span className="p-2 rounded-lg bg-navy-800 text-electric border border-cyan-500/20 mt-1 flex-shrink-0">
                  <Code2 className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">Technical Interests</h4>
                  <p className="text-slate-400 text-sm">
                    {personalInfo.aboutDetailed.interests}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-navy-900/40 border border-slate-800/80">
                <span className="p-2 rounded-lg bg-navy-800 text-electric border border-cyan-500/20 mt-1 flex-shrink-0">
                  <BrainCircuit className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">Learning Mindset</h4>
                  <p className="text-slate-400 text-sm">
                    {personalInfo.aboutDetailed.learningMindset}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-navy-900/40 border border-slate-800/80">
                <span className="p-2 rounded-lg bg-navy-800 text-electric border border-cyan-500/20 mt-1 flex-shrink-0">
                  <Rocket className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">Career Aspirations</h4>
                  <p className="text-slate-400 text-sm">
                    {personalInfo.aboutDetailed.aspirations}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Profile & Core Pillars */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Facts Card */}
            <div className="p-6 rounded-2xl bg-navy-900/70 border border-slate-800 backdrop-blur-sm">
              <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-5 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Quick Profile Overview
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Name</span>
                  <span className="text-white font-medium">{personalInfo.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Current Role</span>
                  <span className="text-electric font-medium">{personalInfo.role}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Institution</span>
                  <span className="text-white font-medium text-right">BMSCE Bangalore</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Degree</span>
                  <span className="text-white font-medium">B.E. Computer Science</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Academic Standing</span>
                  <span className="text-cyan-300 font-medium">2nd Year</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Location</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    {personalInfo.location}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">GitHub</span>
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    @{personalInfo.githubUsername}
                  </a>
                </div>
              </div>
            </div>

            {/* Engineering Principles */}
            <div className="p-6 rounded-2xl bg-navy-900/50 border border-cyan-500/15">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-semibold mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Engineering Principles
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800">
                  <span className="font-semibold text-white block mb-1">Authenticity First</span>
                  <span className="text-slate-400">Genuine codebases and verified accomplishments only.</span>
                </div>
                <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800">
                  <span className="font-semibold text-white block mb-1">Clean Architecture</span>
                  <span className="text-slate-400">Structured components, readable patterns, and maintainability.</span>
                </div>
                <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800">
                  <span className="font-semibold text-white block mb-1">Continuous Depth</span>
                  <span className="text-slate-400">Mastering fundamentals before chasing transient trends.</span>
                </div>
                <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800">
                  <span className="font-semibold text-white block mb-1">Pragmatic Impact</span>
                  <span className="text-slate-400">Building software that solves tangible real-world problems.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
