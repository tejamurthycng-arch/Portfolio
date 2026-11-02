import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  Code2, 
  BrainCircuit, 
  MapPin, 
  Sparkles,
  ArrowRight,
  User,
  Compass,
  Rocket
} from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { SectionHeading } from '../components/SectionHeading';
import { Card3D } from '../components/Card3D';

gsap.registerPlugin(ScrollTrigger);

interface StoryChapter {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const storyContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const chapters: StoryChapter[] = [
    {
      id: 0,
      badge: "CHAPTER 01 // IDENTITY",
      title: "Who I Am",
      subtitle: "Aspiring software engineer exploring technology-driven solutions.",
      icon: <User className="w-5 h-5 text-cyan-400" />,
      content: (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl glass-card relative overflow-hidden border-violet-500/30">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-violet-500 via-indigo-500 to-cyan-400"></div>
            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed italic pl-3">
              "{personalInfo.aboutIntro}"
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl glass-pill">
              <span className="text-slate-500 block mb-1">Status</span>
              <span className="text-cyan-300 font-semibold">2nd Year Undergrad</span>
            </div>
            <div className="p-3.5 rounded-xl glass-pill">
              <span className="text-slate-500 block mb-1">Location</span>
              <span className="text-violet-300 font-semibold">{personalInfo.location}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      badge: "CHAPTER 02 // ACADEMICS",
      title: "My Education",
      subtitle: "BMS College of Engineering, Department of Computer Science & Engineering.",
      icon: <GraduationCap className="w-5 h-5 text-violet-400" />,
      content: (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl glass-card border-violet-500/30">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-white">BMSCE, Bangalore</h4>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-violet-500/15 text-violet-200 border border-violet-500/30">
                2024 – 2028
              </span>
            </div>
            <p className="text-sm text-cyan-300 font-medium mb-3">
              Bachelor of Engineering in Computer Science and Engineering
            </p>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed">
              Immersed in core computer science curriculum emphasizing structured programming in C, object-oriented paradigms, discrete structures, and algorithmic complexity analysis.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg glass-pill text-slate-300">Data Structures</span>
            <span className="px-3 py-1.5 rounded-lg glass-pill text-slate-300">C & Python</span>
            <span className="px-3 py-1.5 rounded-lg glass-pill text-slate-300">Algorithmic Logic</span>
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: "CHAPTER 03 // CRAFT",
      title: "My Developer Journey",
      subtitle: "Bridging fundamental logic with modern interactive systems.",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      content: (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl glass-card border-cyan-500/30">
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Full-Stack & Intelligent Systems
            </h4>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-4">
              I develop responsive, user-first web applications using React, Tailwind CSS, Node.js, and MongoDB. Beyond traditional web tools, I explore real-time computer vision systems and interactive user experiences.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2 border-t border-white/[0.08]">
              <div>
                <span className="text-slate-500 block mb-0.5">Frontend Architecture</span>
                <span className="text-white">React.js, Modern CSS</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Backend Execution</span>
                <span className="text-white">Node.js, Express, REST</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      badge: "CHAPTER 04 // ASPIRATIONS",
      title: "My Interests & Goals",
      subtitle: "Disciplined problem solver driven by continuous growth.",
      icon: <Rocket className="w-5 h-5 text-violet-400" />,
      content: (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl glass-card border-violet-500/30">
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-violet-400" />
              Engineering Mindset & Ambition
            </h4>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-4">
              My goal is to continuously master advanced software engineering, contribute to impactful open-source codebases, and build scalable systems that solve tangible everyday problems through technology.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 px-3 py-2 rounded-xl">
              <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Seeking engineering internships, technical challenges & collaborations</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // GSAP Pinned Storytelling ScrollTrigger Setup (Desktop: min-width: 1024px)
  useEffect(() => {
    // Only enable GSAP pin on desktop screens (>=1024px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!triggerRef.current || !storyContainerRef.current) return;

      const storyCards = gsap.utils.toArray<HTMLElement>('.story-step-card');
      
      // Hide all except first
      gsap.set(storyCards.slice(1), { opacity: 0, y: 35, pointerEvents: 'none' });
      gsap.set(storyCards[0], { opacity: 1, y: 0, pointerEvents: 'auto' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          start: "top top+=75",
          end: "+=1700",
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const step = Math.min(3, Math.floor(self.progress * 4));
            setActiveStep(step);
          }
        }
      });

      // Step 1 to Step 2
      tl.to(storyCards[0], { opacity: 0, y: -25, pointerEvents: 'none', duration: 0.5 })
        .to(storyCards[1], { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.5 }, "-=0.2");

      // Step 2 to Step 3
      tl.to(storyCards[1], { opacity: 0, y: -25, pointerEvents: 'none', duration: 0.5 })
        .to(storyCards[2], { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.5 }, "-=0.2");

      // Step 3 to Step 4
      tl.to(storyCards[2], { opacity: 0, y: -25, pointerEvents: 'none', duration: 0.5 })
        .to(storyCards[3], { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.5 }, "-=0.2");
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-24 relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="// 01. ABOUT ME"
          title="Engineering Foundations & Drive"
          subtitle="Computer Science student at BMSCE dedicated to clean code, strong algorithmic fundamentals, and impactful software."
        />

        {/* Pinned Storytelling Container */}
        <div ref={triggerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[520px]">
          
          {/* Left Column: Fixed Identity & Progress Stepper Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Card3D maxTilt={8} className="h-full">
              <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden border border-white/[0.1] shadow-2xl">
                
                {/* Header Profile / Monogram */}
                <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/[0.08]">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1.5px] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.35)]">
                    <div className="w-full h-full rounded-[14px] bg-black/90 flex items-center justify-center backdrop-blur-md">
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

                {/* Quick Info Grid */}
                <div className="space-y-3 text-xs font-mono mb-6">
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

                {/* Interactive Story Chapter Stepper (Desktop) */}
                <div className="hidden lg:block pt-4 border-t border-white/[0.08]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-3">
                    Storyline Navigation
                  </span>
                  <div className="space-y-2">
                    {chapters.map((chap, idx) => {
                      const isActive = activeStep === idx;
                      return (
                        <div
                          key={chap.id}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                            isActive
                              ? 'bg-violet-500/20 text-white font-semibold border border-violet-500/40 shadow-sm'
                              : 'text-slate-500'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 animate-pulse' : 'bg-white/20'}`}></span>
                          <span>{chap.title}</span>
                          {isActive && <ArrowRight className="w-3 h-3 text-cyan-400 ml-auto" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </Card3D>
          </div>

          {/* Right Column: Progressive Pinned Narrative Display */}
          <div ref={storyContainerRef} className="lg:col-span-7 relative min-h-[460px]">
            
            {/* Desktop Pinned Overlaid Cards (Stacked absolutely in place for scrub transitions) */}
            <div className="hidden lg:block relative w-full h-full min-h-[460px]">
              {chapters.map((chap, idx) => (
                <div
                  key={chap.id}
                  className={`story-step-card absolute inset-0 w-full flex flex-col justify-center ${
                    idx === 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="mb-4">
                    <span className="text-xs font-mono text-cyan-400 font-semibold px-3 py-1 rounded-full glass-pill inline-flex items-center gap-1.5 mb-2">
                      {chap.icon}
                      {chap.badge}
                    </span>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight mt-2 mb-1">
                      {chap.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {chap.subtitle}
                    </p>
                  </div>

                  {chap.content}
                </div>
              ))}
            </div>

            {/* Mobile / Tablet Fluid Sequential Flow (<1024px) */}
            <div className="lg:hidden space-y-8">
              {chapters.map((chap) => (
                <div key={chap.id} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg glass-pill">
                      {chap.icon}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      {chap.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {chap.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {chap.subtitle}
                  </p>
                  {chap.content}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
