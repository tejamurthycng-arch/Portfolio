import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FileDown, 
  Github, 
  Linkedin, 
  Mail, 
  Compass,
  Zap
} from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { Button } from '../components/Button';
import { TechIcon } from '../components/TechIcons';

export const Hero: React.FC = () => {
  // Animated role text typing effect
  const roles = [
    "Aspiring Software Engineer",
    "Computer Science Student",
    "Full-Stack Web Enthusiast",
    "Problem Solver & Developer"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, 40);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  // Floating tech nodes with Framer Motion (responsive offsets)
  const techNodes = [
    { name: "C", desktopX: -85, desktopY: -85, mobileX: -65, mobileY: -65, delay: 0 },
    { name: "Python", desktopX: 90, desktopY: -80, mobileX: 68, mobileY: -60, delay: 0.2 },
    { name: "React", desktopX: 105, desktopY: 65, mobileX: 75, mobileY: 55, delay: 0.4 },
    { name: "Node", desktopX: -95, desktopY: 70, mobileX: -70, mobileY: 55, delay: 0.6 },
    { name: "MongoDB", desktopX: 0, desktopY: -125, mobileX: 0, mobileY: -95, delay: 0.8 },
    { name: "Git", desktopX: 0, desktopY: 125, mobileX: 0, mobileY: 95, delay: 1.0 },
  ];

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Role & CTAs with Framer Motion */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
          >
            
            {/* Live Status Pill with Translucent Glass */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-200 w-fit mb-5 sm:mb-6 shadow-[0_0_15px_rgba(244,63,94,0.2)] backdrop-blur-2xl"
            >
              <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-rose-500"></span>
              </span>
              <span className="truncate max-w-[260px] sm:max-w-none">Available for Technical Projects & Roles</span>
            </motion.div>

            {/* Main Greeting Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3 leading-[1.1]">
              Hi, I'm <span className="electric-text-gradient">Tejamurthy M.</span>
            </h1>

            {/* Dynamic Animated Role */}
            <div className="h-9 sm:h-12 flex items-center justify-center lg:justify-start mb-5 sm:mb-6">
              <span className="text-lg sm:text-2xl md:text-3xl font-semibold font-mono text-rose-400">
                {displayedText}
                <span className="inline-block w-2 sm:w-2.5 h-5 sm:h-6 ml-1 bg-rose-500 animate-pulse align-middle shadow-[0_0_10px_#f43f5e]"></span>
              </span>
            </div>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300/90 max-w-xl leading-relaxed mb-8 font-normal">
              {personalInfo.heroBio}
            </p>

            {/* Action Buttons: Responsive Wrap with Translucent Glass */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <Button
                href="#projects"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto text-sm px-7 py-3 justify-center bg-gradient-to-r from-rose-600 to-red-600 shadow-[0_0_20px_rgba(225,29,72,0.35)]"
              >
                View Projects
              </Button>

              <Button
                href="#about"
                variant="secondary"
                size="md"
                icon={<Compass className="w-4 h-4 text-rose-400" />}
                iconPosition="left"
                className="w-full sm:w-auto text-sm px-6 py-3 justify-center bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.1] text-slate-200"
              >
                Explore My Journey
              </Button>

              <Button
                href={personalInfo.resumeUrl}
                external
                variant="outline"
                size="md"
                icon={<FileDown className="w-4 h-4 text-rose-400" />}
                className="w-full sm:w-auto text-sm px-6 py-3 justify-center bg-transparent hover:bg-white/[0.06] border-white/[0.1] text-slate-300"
              >
                Resume
              </Button>
            </div>

            {/* Social Icons & Email */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6 border-t border-white/[0.08] w-full">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Connect:
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white hover:border-rose-500/50 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] backdrop-blur-xl transition-all duration-200"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white hover:border-rose-500/50 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] backdrop-blur-xl transition-all duration-200"
                  aria-label="LinkedIn Profile"
                  title="Configurable LinkedIn URL"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white hover:border-rose-500/50 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] backdrop-blur-xl transition-all duration-200"
                  aria-label="Email Tejamurthy M"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-2 pl-3 sm:pl-4 text-xs font-mono text-slate-400 border-l border-white/[0.08]">
                <span className="text-slate-500">College:</span>
                <span className="text-rose-200 font-medium">BMSCE Bangalore</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Translucent Holographic HUD & Tech Core */}
          <div className="lg:col-span-5 flex items-center justify-center w-full py-4 sm:py-0 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] flex items-center justify-center flex-shrink-0"
            >
              
              {/* Outer Ambient Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-600/25 via-red-500/15 to-transparent blur-2xl sm:blur-3xl animate-pulse-slow"></div>

              {/* Outer Rotating HUD Ring */}
              <div className="absolute inset-2 sm:inset-3 rounded-full border border-dashed border-rose-500/35 animate-spin-slow"></div>
              
              {/* Counter-Rotating Middle HUD Ring */}
              <div className="absolute inset-8 sm:inset-10 rounded-full border border-rose-500/25 animate-spin-reverse">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-400 shadow-[0_0_10px_#f43f5e]"></div>
              </div>

              {/* Inner Concentric Circle with Translucent Glass */}
              <div className="absolute inset-16 sm:inset-20 rounded-full border border-rose-500/40 bg-white/[0.02] backdrop-blur-2xl flex items-center justify-center shadow-inner">
                {/* Radar Sweep Effect */}
                <div className="absolute inset-0 rounded-full radar-sweep opacity-25 animate-radar"></div>
              </div>

              {/* Central Glowing Core Card with Translucent Glass */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl bg-white/[0.04] border-2 border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.3)] flex flex-col items-center justify-center p-2.5 sm:p-3 text-center backdrop-blur-2xl group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform shadow-md backdrop-blur-md">
                  <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-rose-500 animate-pulse" />
                </div>
                <span className="font-display font-extrabold text-white text-xs sm:text-base tracking-tight">
                  Tejamurthy
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-rose-300 font-medium">
                  BMSCE • 2nd Year
                </span>
              </motion.div>

              {/* Floating Orbiting Tech Nodes with Translucent Glass */}
              {techNodes.map((node) => {
                return (
                  <motion.div
                    key={node.name}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      x: [node.mobileX, node.desktopX][window.innerWidth > 640 ? 1 : 0] || node.mobileX, 
                      y: [node.desktopY - 6, node.desktopY + 6, node.desktopY - 6] 
                    }}
                    transition={{ 
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: node.delay
                      },
                      opacity: { duration: 0.6, delay: 0.4 + node.delay },
                    }}
                    whileHover={{ scale: 1.25, zIndex: 30 }}
                    className="absolute z-20 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.1] shadow-glass backdrop-blur-2xl cursor-pointer hover:border-rose-500/80 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all"
                    title={node.name}
                  >
                    <TechIcon name={node.name} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                );
              })}

              {/* Live telemetry micro-badges */}
              <div className="absolute -bottom-3 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] shadow-lg text-[10px] sm:text-[11px] font-mono text-slate-300 flex items-center gap-1.5 sm:gap-2 z-20 backdrop-blur-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
                <span>System Online • Bangalore, IN</span>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
