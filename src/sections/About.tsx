import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  Code2, 
  BrainCircuit, 
  Sparkles,
  ArrowRight,
  User,
  Compass,
  Rocket,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { SectionHeading } from '../components/SectionHeading';
import { Card3D } from '../components/Card3D';
import { globalLenis } from '../components/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

interface ChapterMetric {
  label: string;
  value: string;
  highlight?: boolean;
}

interface Chapter {
  id: number;
  badge: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  leftHighlight: {
    tag: string;
    metrics: ChapterMetric[];
    summary: string;
  };
  rightContent: React.ReactNode;
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const activeStepRef = useRef<number>(0);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  const chapters: Chapter[] = [
    {
      id: 0,
      badge: "CHAPTER 01 // IDENTITY",
      shortLabel: "Identity",
      title: "Who I Am",
      subtitle: "Aspiring software engineer exploring modern web architectures & scalable solutions.",
      icon: <User className="w-4 h-4 text-cyan-400" />,
      leftHighlight: {
        tag: "Core Profile",
        metrics: [
          { label: "Role", value: "Aspiring SWE", highlight: true },
          { label: "Standing", value: "2nd Year B.E." },
          { label: "Institution", value: "BMSCE Bangalore" },
          { label: "Location", value: personalInfo.location }
        ],
        summary: "Passionate CS student driven by clean code, systems thinking, and purposeful software engineering."
      },
      rightContent: (
        <div className="space-y-4">
          {/* Main Intro Quote Card */}
          <div className="p-5 sm:p-6 rounded-2xl glass-card relative overflow-hidden border-violet-500/30">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-violet-500 via-indigo-500 to-cyan-400"></div>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed italic pl-3">
              "{personalInfo.aboutIntro}"
            </p>
          </div>

          {/* Core Mindset & Traits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-4 rounded-xl glass-panel border border-white/[0.08] space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Disciplined Engineering</span>
              </div>
              <p className="text-slate-300/80 text-[11px] leading-relaxed">
                Approaching every problem with structured modularity, algorithmic efficiency, and clean code hygiene.
              </p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/[0.08] space-y-1.5">
              <div className="flex items-center gap-2 text-violet-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Continuous Growth</span>
              </div>
              <p className="text-slate-300/80 text-[11px] leading-relaxed">
                Exploring cutting-edge developer tools, responsive user interfaces, and high-performance full-stack architectures.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      badge: "CHAPTER 02 // ACADEMICS",
      shortLabel: "Education",
      title: "My Education",
      subtitle: "BMS College of Engineering, Department of Computer Science & Engineering.",
      icon: <GraduationCap className="w-4 h-4 text-violet-400" />,
      leftHighlight: {
        tag: "Academic Standing",
        metrics: [
          { label: "Degree", value: "B.E. CSE", highlight: true },
          { label: "College", value: "BMSCE Bangalore" },
          { label: "Timeline", value: "2024 – 2028" },
          { label: "Semester", value: "2nd Year (4th Sem)" }
        ],
        summary: "Rigorous computer science curriculum emphasizing fundamentals, systems, and algorithms."
      },
      rightContent: (
        <div className="space-y-4">
          {/* Institution Card */}
          <div className="p-5 sm:p-6 rounded-2xl glass-card border-violet-500/30">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-violet-400" />
                BMS College of Engineering (BMSCE)
              </h4>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-violet-500/15 text-violet-200 border border-violet-500/30">
                2024 – 2028
              </span>
            </div>
            <p className="text-xs sm:text-sm text-cyan-300 font-medium mb-3">
              Bachelor of Engineering in Computer Science and Engineering • Bangalore, India
            </p>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed">
              Immersed in core computer science curriculum emphasizing structured programming in C, object-oriented paradigms, discrete structures, and algorithmic complexity analysis.
            </p>
          </div>

          {/* Core Foundations Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded-xl glass-pill flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span className="text-slate-200">Data Structures & C</span>
            </div>
            <div className="p-3 rounded-xl glass-pill flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
              <span className="text-slate-200">Algorithmic Logic</span>
            </div>
            <div className="p-3 rounded-xl glass-pill flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span className="text-slate-200">OOP Paradigms</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: "CHAPTER 03 // CRAFT",
      shortLabel: "Journey",
      title: "My Developer Journey",
      subtitle: "Bridging fundamental logic with modern interactive web & systems engineering.",
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      leftHighlight: {
        tag: "Technical Stack",
        metrics: [
          { label: "Frontend", value: "React & Modern UI", highlight: true },
          { label: "Backend", value: "Node.js & Express" },
          { label: "Database", value: "MongoDB" },
          { label: "Languages", value: "C, Python, JS" }
        ],
        summary: "Developing responsive full-stack applications and exploring computer vision systems."
      },
      rightContent: (
        <div className="space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl glass-card border-cyan-500/30">
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Full-Stack & Intelligent Systems Engineering
            </h4>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-4">
              I develop responsive, user-first web applications using React, Tailwind CSS, Node.js, and MongoDB. Beyond traditional web tools, I explore real-time computer vision systems (OpenCV, YOLO) and interactive high-performance user interfaces.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-3 border-t border-white/[0.08]">
              <div className="p-2.5 rounded-lg bg-white/[0.03]">
                <span className="text-slate-500 block mb-1">Frontend Engineering</span>
                <span className="text-white font-medium">React.js, Tailwind, GSAP, Responsive Glassmorphism</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.03]">
                <span className="text-slate-500 block mb-1">Backend & Systems</span>
                <span className="text-white font-medium">Node.js, Express, REST APIs, Python OpenCV</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      badge: "CHAPTER 04 // ASPIRATIONS",
      shortLabel: "Goals",
      title: "My Interests & Goals",
      subtitle: "Disciplined problem solver driven by engineering impact and continuous growth.",
      icon: <Rocket className="w-4 h-4 text-violet-400" />,
      leftHighlight: {
        tag: "Future Vision",
        metrics: [
          { label: "Objective", value: "Software Engineer", highlight: true },
          { label: "Open For", value: "Internships & Hackathons" },
          { label: "Focus", value: "Scalable Systems" },
          { label: "Mindset", value: "Compounding Skills" }
        ],
        summary: "Targeting engineering opportunities to build scalable, resilient technology solutions."
      },
      rightContent: (
        <div className="space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl glass-card border-violet-500/30">
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-violet-400" />
              Engineering Mindset & Long-Term Ambition
            </h4>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-4">
              My goal is to continuously master advanced software engineering, contribute to impactful open-source codebases, and build scalable systems that solve tangible everyday problems through technology.
            </p>
            
            {/* Action Banner */}
            <div className="flex items-center gap-3 text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 p-3.5 rounded-xl">
              <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Available for engineering internships, technical challenges & open-source collaboration.</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Helper to jump directly to any step (synchronized for scroll & click)
  const jumpToStep = (targetStep: number) => {
    const clamped = Math.min(3, Math.max(0, targetStep));
    setActiveStep(clamped);

    const st = scrollTriggerInstance.current;
    if (st && globalLenis) {
      // Calculate scroll position corresponding to that chapter
      const progress = clamped / 3;
      const targetScroll = st.start + progress * (st.end - st.start);
      globalLenis.scrollTo(targetScroll, { duration: 0.45 });
    }
  };

  // GSAP Pinned Storytelling ScrollTrigger Setup (Desktop: min-width: 1024px)
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!triggerRef.current) return;

      // Distance of 850px gives ~210px per step: exactly 1 wheel gesture or half a scroll flick!
      const st = ScrollTrigger.create({
        trigger: triggerRef.current,
        pin: true,
        start: "top top+=75",
        end: "+=850",
        anticipatePin: 1,
        // Snapping: instantly jumps to the 4 discrete chapter positions
        snap: {
          snapTo: [0, 0.333, 0.666, 1.0],
          duration: { min: 0.2, max: 0.35 },
          delay: 0.04,
          ease: "power2.out"
        },
        onUpdate: (self) => {
          // Discrete calculation: triggers immediate synchronized jump for both left and right
          const step = Math.min(3, Math.max(0, Math.floor(self.progress * 3.99)));
          if (step !== activeStepRef.current) {
            setActiveStep(step);
          }
        }
      });

      scrollTriggerInstance.current = st;
    });

    return () => {
      mm.revert();
      scrollTriggerInstance.current = null;
    };
  }, []);

  const currentChapter = chapters[activeStep];

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="// 01. ABOUT ME"
          title="Engineering Foundations & Drive"
          subtitle="Computer Science student at BMSCE dedicated to clean code, strong algorithmic fundamentals, and impactful software."
        />

        {/* Mobile / Tablet Chapter Navigation Pills (< 1024px) */}
        <div className="flex lg:hidden items-center justify-between gap-1.5 p-1.5 rounded-2xl glass-card mb-8 overflow-x-auto">
          {chapters.map((chap, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={chap.id}
                onClick={() => jumpToStep(idx)}
                className={`flex-1 min-w-[75px] py-2 px-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 text-center flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{chap.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Synchronized Pinned Storytelling Grid */}
        <div ref={triggerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[520px]">
          
          {/* ==========================================================================
              LEFT COLUMN: Synchronized Dynamic Identity, Metrics & Stepper Card
              ========================================================================== */}
          <div className="lg:col-span-5 h-full">
            <Card3D maxTilt={6} className="h-full">
              <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden border border-white/[0.1] shadow-2xl flex flex-col justify-between h-full min-h-[480px]">
                
                {/* 1. Profile Header with Monogram & Name */}
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1.5px] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.35)]">
                        <div className="w-full h-full rounded-[14px] bg-black/90 flex items-center justify-center backdrop-blur-md p-3">
                          <span className="font-mono text-base font-extrabold text-white">TM</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {personalInfo.name}
                        </h3>
                        <p className="text-xs font-mono text-cyan-300">
                          {personalInfo.role}
                        </p>
                      </div>
                    </div>

                    {/* Synchronized Step Number Pill */}
                    <div className="px-3 py-1 rounded-full glass-pill border border-cyan-500/30 font-mono text-xs text-cyan-300 font-semibold shadow-sm">
                      0{activeStep + 1} / 04
                    </div>
                  </div>

                  {/* 2. DYNAMIC CHAPTER FOCUS PANEL (Synchronized with Right Side) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentChapter.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-5 relative overflow-hidden"
                    >
                      {/* Top Tag & Glow accent */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                          {currentChapter.icon}
                          {currentChapter.leftHighlight.tag}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                      </div>

                      {/* Dynamic Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-3">
                        {currentChapter.leftHighlight.metrics.map((m, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-white/[0.05]">
                            <span className="text-slate-500 text-[10px] block mb-0.5">{m.label}</span>
                            <span className={`font-medium truncate block ${m.highlight ? 'text-cyan-300 font-semibold' : 'text-slate-200'}`}>
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Brief Summary Note */}
                      <p className="text-[11px] text-slate-300/80 leading-relaxed italic border-t border-white/[0.06] pt-2.5">
                        {currentChapter.leftHighlight.summary}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 3. Storyline Stepper Navigation (Synchronized Interactive Controller) */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Story Progression
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                      {Math.round(((activeStep + 1) / 4) * 100)}%
                    </span>
                  </div>

                  {/* Linear Progress Bar */}
                  <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden mb-3">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-full"
                      animate={{ width: `${((activeStep + 1) / 4) * 100}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>

                  {/* Clickable Chapter List */}
                  <div className="space-y-1.5">
                    {chapters.map((chap, idx) => {
                      const isActive = activeStep === idx;
                      return (
                        <button
                          key={chap.id}
                          onClick={() => jumpToStep(idx)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono transition-all duration-200 text-left ${
                            isActive
                              ? 'bg-violet-500/20 text-white font-semibold border border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full transition-all duration-200 flex-shrink-0 ${
                            isActive ? 'bg-cyan-400 ring-4 ring-cyan-400/20' : 'bg-white/20'
                          }`}></span>
                          <span className="truncate">{chap.title}</span>
                          {isActive && <ArrowRight className="w-3.5 h-3.5 text-cyan-400 ml-auto flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </Card3D>
          </div>

          {/* ==========================================================================
              RIGHT COLUMN: Synchronized Detailed Narrative Display
              ========================================================================== */}
          <div className="lg:col-span-7 relative min-h-[480px]">
            <Card3D maxTilt={6} className="h-full">
              <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden border border-white/[0.1] shadow-2xl flex flex-col justify-between h-full min-h-[480px]">
                
                {/* Synchronized Chapter Content with AnimatePresence */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentChapter.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col justify-between h-full"
                  >
                    {/* Chapter Header Banner */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-cyan-400 font-semibold px-3 py-1 rounded-full glass-pill inline-flex items-center gap-1.5 shadow-sm">
                          {currentChapter.icon}
                          {currentChapter.badge}
                        </span>

                        {/* Quick Step Jump Arrows */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => jumpToStep(activeStep - 1)}
                            disabled={activeStep === 0}
                            aria-label="Previous Chapter"
                            className="w-8 h-8 rounded-xl glass-card border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white hover:border-violet-500/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => jumpToStep(activeStep + 1)}
                            disabled={activeStep === chapters.length - 1}
                            aria-label="Next Chapter"
                            className="w-8 h-8 rounded-xl glass-card border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 mb-2">
                        {currentChapter.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {currentChapter.subtitle}
                      </p>
                    </div>

                    {/* Chapter Main Interactive Content */}
                    <div className="flex-grow my-2">
                      {currentChapter.rightContent}
                    </div>

                    {/* Chapter Footer Navigation Hint & Dots */}
                    <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono mt-6">
                      <span className="text-slate-500 hidden sm:inline">
                        Scroll or use arrows to jump topics
                      </span>
                      
                      {/* Step Indicator Dots */}
                      <div className="flex items-center gap-2">
                        {chapters.map((chap, idx) => (
                          <button
                            key={chap.id}
                            onClick={() => jumpToStep(idx)}
                            aria-label={`Jump to ${chap.title}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              activeStep === idx 
                                ? 'w-6 bg-cyan-400 shadow-[0_0_10px_#06b6d4]' 
                                : 'w-2 bg-white/20 hover:bg-white/40'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Next Chapter Shortcut button */}
                      {activeStep < chapters.length - 1 ? (
                        <button
                          onClick={() => jumpToStep(activeStep + 1)}
                          className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold group ml-auto sm:ml-0"
                        >
                          <span>Next: {chapters[activeStep + 1].shortLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <a
                          href="#skills"
                          className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-semibold group ml-auto sm:ml-0"
                        >
                          <span>Explore Skills</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </Card3D>
          </div>

        </div>

      </div>
    </section>
  );
};
