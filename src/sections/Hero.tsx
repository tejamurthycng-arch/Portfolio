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

  // Floating tech nodes with Framer Motion
  const techNodes = [
    { name: "C", x: -90, y: -90, delay: 0 },
    { name: "Python", x: 95, y: -80, delay: 0.2 },
    { name: "React", x: 110, y: 70, delay: 0.4 },
    { name: "Node", x: -100, y: 75, delay: 0.6 },
    { name: "MongoDB", x: 0, y: -130, delay: 0.8 },
    { name: "Git", x: 0, y: 130, delay: 1.0 },
  ];

  return (
    <section id="home" className="relative min-h-[94vh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background cyber grid & glow effects in Crimson Red */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-40"></div>
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-rose-600/15 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Role & CTAs with Framer Motion */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            
            {/* Live Status Pill in Crimson Red */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-red-950/60 border border-red-500/35 text-xs font-mono text-rose-200 w-fit mb-6 shadow-crimson-sm backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span>Available for Technical Projects & Engineering Roles</span>
            </motion.div>

            {/* Main Greeting Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3">
              Hi, I'm <span className="electric-text-gradient">Tejamurthy M.</span>
            </h1>

            {/* Dynamic Animated Role */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold font-mono text-rose-400">
                {displayedText}
                <span className="inline-block w-2.5 h-6 ml-1 bg-red-500 animate-pulse align-middle shadow-crimson-sm"></span>
              </span>
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8 font-normal">
              {personalInfo.heroBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button
                href="#projects"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="text-sm px-7 py-3"
              >
                View Projects
              </Button>

              <Button
                href="#about"
                variant="secondary"
                size="md"
                icon={<Compass className="w-4 h-4 text-rose-400" />}
                iconPosition="left"
                className="text-sm px-6 py-3"
              >
                Explore My Journey
              </Button>

              <Button
                href={personalInfo.resumeUrl}
                external
                variant="outline"
                size="md"
                icon={<FileDown className="w-4 h-4 text-rose-400" />}
                className="text-sm px-6 py-3"
              >
                Resume
              </Button>
            </div>

            {/* Social Icons & Email */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-800/90">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Connect:
              </span>

              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-500/50 hover:bg-navy-850 hover:shadow-crimson-sm transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-500/50 hover:bg-navy-850 hover:shadow-crimson-sm transition-all duration-200"
                aria-label="LinkedIn Profile"
                title="Configurable LinkedIn URL"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-500/50 hover:bg-navy-850 hover:shadow-crimson-sm transition-all duration-200"
                aria-label="Email Tejamurthy M"
              >
                <Mail className="w-4 h-4" />
              </a>

              <div className="hidden sm:flex items-center gap-2 pl-4 text-xs font-mono text-slate-400 border-l border-slate-800">
                <span className="text-slate-500">College:</span>
                <span className="text-rose-200 font-medium">BMSCE Bangalore</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-End Framer Motion Holographic HUD & Tech Core */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
            >
              
              {/* Outer Ambient Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600/20 via-rose-500/10 to-transparent blur-3xl animate-pulse-slow"></div>

              {/* Outer Rotating HUD Ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-red-500/30 animate-spin-slow"></div>
              
              {/* Counter-Rotating Middle HUD Ring */}
              <div className="absolute inset-10 rounded-full border border-red-500/20 animate-spin-reverse">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 shadow-crimson"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rose-400 shadow-crimson"></div>
              </div>

              {/* Inner Concentric Circle */}
              <div className="absolute inset-20 rounded-full border border-red-500/40 bg-navy-950/60 backdrop-blur-md flex items-center justify-center shadow-inner">
                {/* Radar Sweep Effect */}
                <div className="absolute inset-0 rounded-full radar-sweep opacity-25 animate-radar"></div>
              </div>

              {/* Central Glowing Core Card */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-20 w-36 h-36 rounded-3xl bg-navy-900/90 border-2 border-red-500/60 shadow-crimson flex flex-col items-center justify-center p-3 text-center backdrop-blur-xl group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 mb-2 group-hover:scale-110 transition-transform shadow-md">
                  <Zap className="w-6 h-6 text-red-500 animate-pulse" />
                </div>
                <span className="font-display font-extrabold text-white text-base tracking-tight">
                  Tejamurthy
                </span>
                <span className="text-[10px] font-mono text-rose-300 font-medium">
                  BMSCE • 2nd Year
                </span>
              </motion.div>

              {/* Floating Orbiting Tech Nodes */}
              {techNodes.map((node) => (
                <motion.div
                  key={node.name}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 1, 
                    x: node.x, 
                    y: [node.y - 6, node.y + 6, node.y - 6] 
                  }}
                  transition={{ 
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: node.delay
                    },
                    opacity: { duration: 0.6, delay: 0.4 + node.delay },
                    x: { duration: 0.8, delay: 0.3 + node.delay }
                  }}
                  whileHover={{ scale: 1.25, zIndex: 30 }}
                  className="absolute z-20 p-2.5 rounded-2xl bg-navy-900/95 border border-red-500/35 shadow-crimson-sm backdrop-blur-md cursor-pointer hover:border-red-500 hover:shadow-crimson transition-all"
                  title={node.name}
                >
                  <TechIcon name={node.name} className="w-6 h-6" />
                </motion.div>
              ))}

              {/* Live telemetry micro-badges */}
              <div className="absolute -bottom-2 px-4 py-1.5 rounded-full bg-navy-900/95 border border-red-500/30 shadow-lg text-[11px] font-mono text-slate-300 flex items-center gap-2 z-20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>System Online • Bangalore, IN</span>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
