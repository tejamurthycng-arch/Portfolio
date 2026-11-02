import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, Project } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { Github, Filter, GitBranch, PanelsTopLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { personalInfo } from '../data/personalInfo';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fullstack' | 'ai' | 'frontend' | 'systems'>('all');
  const [viewMode, setViewMode] = useState<'horizontal' | 'timeline'>('horizontal');

  // GSAP Horizontal Scroll Refs
  const horizontalSectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Timeline Scroll Ref
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);

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

  // ========================================================
  // GSAP PINNED HORIZONTAL SCROLL ANIMATION (Desktop: md+)
  // ========================================================
  useEffect(() => {
    if (viewMode !== 'horizontal') return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = horizontalSectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 160);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top+=75",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
          }
        }
      });

      return () => {
        tween.kill();
      };
    });

    ScrollTrigger.refresh();

    return () => mm.revert();
  }, [viewMode, filteredProjects]);

  // Timeline Scroll Progress
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start 65%", "end 75%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  });

  const photonY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projects" className="py-20 md:py-28 relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeading
            badge="// 03. VERIFIED PROJECTS"
            title="Featured Engineering Work"
            subtitle="Authentic repositories analyzed directly from my GitHub profile. Controlled horizontal gallery & timeline backed by genuine codebases."
            className="mb-0"
          />

          <div className="flex items-center gap-3">
            {/* View Mode Switcher (Horizontal Gallery vs Curved Timeline) */}
            <div className="p-1 rounded-2xl glass-pill flex items-center gap-1">
              <button
                onClick={() => setViewMode('horizontal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  viewMode === 'horizontal'
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="GSAP Horizontal Pinned Gallery"
              >
                <PanelsTopLeft className="w-3.5 h-3.5" />
                <span>Horizontal Gallery</span>
              </button>
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
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/[0.08]">
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

      </div>

      {/* ======================================================== */}
      {/* VIEW 1: GSAP PINNED HORIZONTAL SCROLL GALLERY           */}
      {/* ======================================================== */}
      {viewMode === 'horizontal' ? (
        <div ref={horizontalSectionRef} className="relative w-full">
          
          {/* Top Progress Bar Indicator (Desktop) */}
          <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span>Scroll vertically to pan project gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span>{filteredProjects.length} Verified Repositories</span>
            </div>
            <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-full origin-left transition-transform duration-75"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>

          {/* Desktop Horizontal Track Container */}
          <div className="hidden md:block overflow-hidden py-4">
            <div
              ref={trackRef}
              className="flex items-stretch gap-8 px-4 sm:px-8 lg:px-12 w-max"
            >
              {filteredProjects.map((project: Project, index: number) => (
                <div
                  key={project.id}
                  className="w-[420px] lg:w-[460px] flex-shrink-0"
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / Tablet Horizontal Swipeable Native Gallery (<768px) */}
          <div className="md:hidden px-4">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-slate-400">
              <span className="text-cyan-400">👉 Swipe horizontally to view projects</span>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 pt-2 no-scrollbar">
              {filteredProjects.map((project: Project, index: number) => (
                <div
                  key={project.id}
                  className="w-[85vw] max-w-[340px] flex-shrink-0 snap-center"
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* ======================================================== */
        /* VIEW 2: SCROLL-ANIMATED CURVED TIMELINE VIEW            */
        /* ======================================================== */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={timelineContainerRef} className="relative py-6 max-w-6xl mx-auto">
            {/* SVG Background Track & Scroll-Animated Curved Line */}
            <div className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-8 pointer-events-none z-10 flex justify-center">
              <div className="w-[2px] h-full bg-white/[0.07] rounded-full"></div>
              <motion.div
                style={{ height: photonY }}
                className="absolute top-0 w-[3px] bg-gradient-to-b from-violet-500 via-indigo-400 to-cyan-400 rounded-full shadow-[0_0_16px_rgba(6,182,212,0.85)] origin-top"
              />
              <motion.div
                style={{ top: photonY }}
                className="absolute -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-300 border-2 border-white shadow-[0_0_20px_#06b6d4,0_0_35px_#8b5cf6] flex items-center justify-center z-20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              </motion.div>
            </div>

            {/* Alternating Milestone Items */}
            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {filteredProjects.map((project: Project, index: number) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={project.id}
                    className="relative flex flex-col md:flex-row items-center w-full"
                  >
                    <div className={`w-full md:w-[calc(50%-44px)] pl-12 sm:pl-16 md:pl-0 ${isEven ? 'md:mr-auto' : 'md:hidden'}`}>
                      {isEven && <ProjectCard project={project} index={index} />}
                    </div>

                    <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl glass-card border border-violet-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.35)] bg-black/90">
                        <span className="font-mono text-xs sm:text-sm font-extrabold text-white">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    <div className={`w-full md:w-[calc(50%-44px)] pl-12 sm:pl-16 md:pl-0 ${!isEven ? 'md:ml-auto' : 'hidden md:block md:invisible'}`}>
                      {!isEven && <ProjectCard project={project} index={index} />}
                    </div>

                    <div className="w-full md:hidden pl-12 sm:pl-16">
                      {!isEven && <ProjectCard project={project} index={index} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Note on Authenticity with Translucent Glass */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-4 rounded-2xl glass-panel text-center text-xs text-slate-400 font-mono"
        >
          <span>🔒 All codebases are authenticated with <span className="text-cyan-400 font-semibold">@{personalInfo.githubUsername}</span> on GitHub. Live Demo buttons are rendered strictly when active production deployments exist.</span>
        </motion.div>
      </div>

    </section>
  );
};
