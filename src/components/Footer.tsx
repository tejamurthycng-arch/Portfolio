import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-navy-950 text-slate-400 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-navy-900 border border-red-500/40 flex items-center justify-center text-crimson-DEFAULT shadow-sm">
                <span className="font-mono text-sm font-bold text-white">TM</span>
              </div>
              <span className="font-display font-bold text-white tracking-tight text-xl">
                Tejamurthy M
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-4">
              Aspiring Software Engineer & Computer Science student at BMSCE Bangalore. Focused on full-stack web engineering, resilient code, and modern technology solutions.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-red-500/50 hover:bg-navy-850 hover:shadow-crimson-sm transition-all"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-red-500/50 hover:bg-navy-850 hover:shadow-crimson-sm transition-all"
                aria-label="LinkedIn profile (configurable)"
                title="Configurable LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-red-500/50 hover:bg-navy-850 hover:shadow-crimson-sm transition-all"
                aria-label="Email address"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-rose-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-rose-400 transition-colors">About Me</a></li>
              <li><a href="#skills" className="hover:text-rose-400 transition-colors">Technical Skills</a></li>
              <li><a href="#projects" className="hover:text-rose-400 transition-colors">Verified Projects</a></li>
              <li><a href="#experience" className="hover:text-rose-400 transition-colors">Hackathons & Experience</a></li>
              <li><a href="#education" className="hover:text-rose-400 transition-colors">Education</a></li>
              <li><a href="#contact" className="hover:text-rose-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Status & Location */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-4">
              Status & Location
            </h4>
            <p className="text-sm text-slate-300 mb-2">
              📍 {personalInfo.location}
            </p>
            <p className="text-sm text-slate-400 mb-4">
              🎓 {personalInfo.collegeShort}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-xs text-rose-200 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Open to Opportunities
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Tejamurthy M. Built with React, TypeScript & Tailwind CSS.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900 border border-slate-800 hover:border-red-500/40 text-slate-300 hover:text-white transition-all shadow-sm"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-rose-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
