import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { projects, Project } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { Github, Filter, GitBranch, LayoutGrid, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { personalInfo } from '../data/personalInfo';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fullstack' | 'ai' | 'frontend' | 'systems'>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');

  const containerRef = useRef<HTMLDivElement>(null);

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'fullstack', label: 'Full-Stack & Computer Vision', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'ai', label: 'AI & Data Ecosystems', count: projects.filter(p => p.category === 'ai').length },
    { id: 'frontend', label: 'Frontend & UI', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'systems', label: 'Systems & C', count: projects.filter(p => p.category === 'systems').length },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Scroll animated progress for the curved timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  });

  // Calculate dynamic laser photon indicator position (0% to 100%)
  const photonY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeading
            badge="// 03. VERIFIED PROJECTS"
            title="Featured Engineering Work"
            subtitle="Authentic repositories analyzed directly from my GitHub profile. No fictional projects, mock metrics, or synthetic claims."
            className="mb-0"
          />

          <div className="flex items-center gap-3">
            {/* View Mode Switcher (Timeline vs Grid) */}
            <div className="p-1 rounded-2xl glass-pill flex items-center gap-1">
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Interactive Curved Timeline View"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Timeline</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="3D Card Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>

            <Button
              href={personalInfo.githubUrl}
              external
              variant="outline"
              size="sm"
              icon={<Github className="w-4 h-4 text-cyan-400" />}
              className="w-fit glass-pill hover:bg-white/[0.08] text-slate-200"
            >
              GitHub
            </Button>
          </div>
        </div>

        {/* Filter Navigation with Translucent Glass */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 mr-2 text-xs font-mono text-slate-500">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filter:</span>
          </div>

          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-2 ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold shadow-[0_0_18px_rgba(139,92,246,0.4)]'
                  : 'glass-pill text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === tab.id ? 'bg-black/25 text-white font-bold' : 'bg-white/[0.08] text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: SCROLL ANIMATED TIMELINE WITH CURVED LINE       */}
        {/* ======================================================== */}
        {viewMode === 'timeline' ? (
          <div ref={containerRef} className="relative py-6 max-w-6xl mx-auto">
            
            {/* SVG Background Track & Scroll-Animated Curved Line (Desktop: Center, Mobile: Left) */}
            <div className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-8 pointer-events-none z-10 flex justify-center">
              
              {/* Static Background Guide Track */}
              <div className="w-[2px] h-full bg-white/[0.07] rounded-full"></div>

              {/* Scroll-Animated Illuminated Glowing Laser Line */}
              <motion.div
                style={{ height: photonY }}
                className="absolute top-0 w-[3px] bg-gradient-to-b from-violet-500 via-indigo-400 to-cyan-400 rounded-full shadow-[0_0_16px_rgba(6,182,212,0.85)] origin-top"
              />

              {/* Glowing Traveling Photon Orb at the Head of the Scroll Line */}
              <motion.div
                style={{ top: photonY }}
                className="absolute -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-300 border-2 border-white shadow-[0_0_20px_#06b6d4,0_0_35px_#8b5cf6] flex items-center justify-center z-20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              </motion.div>
            </div>

            {/* Alternating Milestone Items along the Curved Spine */}
            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {filteredProjects.map((project: Project, index: number) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={project.id}
                    className="relative flex flex-col md:flex-row items-center w-full"
                  >
                    {/* Desktop Left-Side Card Column (Even Indices) */}
                    <div className={`w-full md:w-[calc(50%-44px)] pl-12 sm:pl-16 md:pl-0 ${isEven ? 'md:mr-auto' : 'md:hidden'}`}>
                      {isEven && (
                        <ProjectCard project={project} index={index} />
                      )}
                    </div>

                    {/* Central Spine Milestone Node (Desktop Center, Mobile Left) */}
                    <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="relative group cursor-pointer"
                      >
                        {/* Milestone Pill with Index Number */}
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl glass-card border border-violet-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.35)] group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-300 bg-black/90">
                          <span className="font-mono text-xs sm:text-sm font-extrabold text-white group-hover:text-cyan-300">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Outer Pulse Ring */}
                        <div className="absolute -inset-1 rounded-2xl border border-dashed border-cyan-400/40 animate-spin-slow pointer-events-none"></div>
                      </motion.div>
                    </div>

                    {/* Desktop Right-Side Card Column (Odd Indices) */}
                    <div className={`w-full md:w-[calc(50%-44px)] pl-12 sm:pl-16 md:pl-0 ${!isEven ? 'md:ml-auto' : 'hidden md:block md:invisible'}`}>
                      {!isEven && (
                        <ProjectCard project={project} index={index} />
                      )}
                    </div>

                    {/* Mobile Only: Render even cards with offset padding */}
                    <div className="w-full md:hidden pl-12 sm:pl-16">
                      {!isEven && (
                        <ProjectCard project={project} index={index} />
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Bottom Timeline Milestone Cap */}
            <div className="relative flex justify-center mt-12 sm:mt-16 z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-violet-500/40 text-xs font-mono text-slate-300 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Repositories Milestone Timeline</span>
              </div>
            </div>

          </div>
        ) : (
          /* ======================================================== */
          /* VIEW 2: 3D CARD GRID VIEW                                */
          /* ======================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project: Project, index: number) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {/* Note on Authenticity with Translucent Glass */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 p-4 rounded-2xl glass-panel text-center text-xs text-slate-400 font-mono"
        >
          <span>🔒 All codebases are authenticated with <span className="text-cyan-400 font-semibold">@{personalInfo.githubUsername}</span> on GitHub. Live Demo buttons are rendered strictly when active production deployments exist.</span>
        </motion.div>

      </div>
    </section>
  );
};
