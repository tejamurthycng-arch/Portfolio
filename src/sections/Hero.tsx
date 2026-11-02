import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  FileDown, 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Copy, 
  Check, 
  Compass
} from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { Button } from '../components/Button';

export const Hero: React.FC = () => {
  // Animated role text typing/cycle effect
  const roles = [
    "Aspiring Software Engineer",
    "Computer Science Student",
    "Full-Stack Web Enthusiast",
    "Problem Solver & Developer"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'system' | 'stack'>('profile');

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

  const codeSnippet = `const developer: DeveloperProfile = {
  name: "Tejamurthy M",
  role: "Aspiring Software Engineer",
  institution: "BMS College of Engineering",
  degree: "B.E. Computer Science & Engineering",
  currentYear: "2nd Year",
  location: "Bangalore, India",
  coreSkills: {
    languages: ["C", "Python", "JavaScript"],
    frontend: ["HTML", "CSS", "React.js", "Tailwind CSS"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB"],
    tools: ["Git", "GitHub"]
  },
  availableForImpact: true
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background cyber grid & glow effects */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-40"></div>
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-600/15 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Heading & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 w-fit mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric"></span>
              </span>
              <span>Available for Technical Projects & Collaboration</span>
            </div>

            {/* Main Greeting Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3">
              Hi, I'm <span className="electric-text-gradient">Tejamurthy M.</span>
            </h1>

            {/* Dynamic Animated Role */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold font-mono text-cyan-400">
                {displayedText}
                <span className="inline-block w-2.5 h-6 ml-1 bg-electric animate-pulse align-middle"></span>
              </span>
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8 font-normal">
              {personalInfo.heroBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <Button
                href="#projects"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View Projects
              </Button>

              <Button
                href="#about"
                variant="secondary"
                size="md"
                icon={<Compass className="w-4 h-4 text-cyan-400" />}
                iconPosition="left"
              >
                Explore My Journey
              </Button>

              <Button
                href={personalInfo.resumeUrl}
                external
                variant="outline"
                size="md"
                icon={<FileDown className="w-4 h-4 text-cyan-400" />}
              >
                Resume
              </Button>
            </div>

            {/* Social Icons & Email */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Connect:
              </span>

              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-electric hover:border-cyan-500/40 hover:bg-navy-850 transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-electric hover:border-cyan-500/40 hover:bg-navy-850 transition-all duration-200"
                aria-label="LinkedIn Profile"
                title="Configurable LinkedIn URL"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-electric hover:border-cyan-500/40 hover:bg-navy-850 transition-all duration-200"
                aria-label="Email Tejamurthy M"
              >
                <Mail className="w-4 h-4" />
              </a>

              <div className="hidden sm:flex items-center gap-2 pl-3 text-xs font-mono text-slate-400 border-l border-slate-800">
                <span className="text-slate-500">College:</span>
                <span className="text-slate-300 font-medium">BMSCE Bangalore</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal Component */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-navy-900/90 border border-cyan-500/30 shadow-electric-sm backdrop-blur-md overflow-hidden">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-navy-950 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-navy-900 px-2 py-0.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-cyan-500/20 text-electric font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    developer.ts
                  </button>
                  <button
                    onClick={() => setActiveTab('system')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'system'
                        ? 'bg-cyan-500/20 text-electric font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    system.sh
                  </button>
                  <button
                    onClick={() => setActiveTab('stack')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'stack'
                        ? 'bg-cyan-500/20 text-electric font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    stack.json
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={copyCode}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Copy snippet"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-5 font-mono text-xs overflow-x-auto min-h-[320px]">
                {activeTab === 'profile' && (
                  <div className="space-y-1 text-slate-300">
                    <div><span className="text-cyan-400">const</span> developer: <span className="text-amber-300">DeveloperProfile</span> = &#123;</div>
                    <div className="pl-4">name: <span className="text-emerald-300">"Tejamurthy M"</span>,</div>
                    <div className="pl-4">role: <span className="text-emerald-300">"Aspiring Software Engineer"</span>,</div>
                    <div className="pl-4">institution: <span className="text-emerald-300">"BMSCE, Bangalore"</span>,</div>
                    <div className="pl-4">degree: <span className="text-emerald-300">"B.E. Computer Science"</span>,</div>
                    <div className="pl-4">year: <span className="text-cyan-400">"2nd Year"</span>,</div>
                    <div className="pl-4">location: <span className="text-emerald-300">"Bangalore, India"</span>,</div>
                    <div className="pl-4">focus: [</div>
                    <div className="pl-8 text-cyan-300">"Full-Stack Web Architectures",</div>
                    <div className="pl-8 text-cyan-300">"Computer Vision & AI Systems",</div>
                    <div className="pl-8 text-cyan-300">"Algorithmic Problem Solving"</div>
                    <div className="pl-4">],</div>
                    <div className="pl-4">verifiedProjects: <span className="text-cyan-400">6</span>,</div>
                    <div className="pl-4">status: <span className="text-emerald-300">"Available for opportunities"</span></div>
                    <div>&#125;;</div>
                  </div>
                )}

                {activeTab === 'system' && (
                  <div className="space-y-2 text-slate-300">
                    <p className="text-slate-500"># System Environment</p>
                    <p><span className="text-cyan-400">$</span> whoami</p>
                    <p className="text-emerald-300 pl-4">tejamurthy-m@bmsce:~$ Aspiring Software Engineer</p>
                    <p><span className="text-cyan-400">$</span> cat /etc/education</p>
                    <p className="text-slate-300 pl-4">College: BMS College of Engineering, Bangalore</p>
                    <p className="text-slate-300 pl-4">Degree: B.E. Computer Science & Engineering (2nd Year)</p>
                    <p><span className="text-cyan-400">$</span> git log --oneline -n 3</p>
                    <p className="text-cyan-300 pl-4">7a3f89d (HEAD) feat: civic issue detection with YOLOv8</p>
                    <p className="text-cyan-300 pl-4">c82e11a feat: Streamlit fitness habit tracker dashboard</p>
                    <p className="text-cyan-300 pl-4">4b190f2 feat: OSCode community web portal launch</p>
                  </div>
                )}

                {activeTab === 'stack' && (
                  <div className="space-y-1 text-slate-300">
                    <div>&#123;</div>
                    <div className="pl-4">"<span className="text-cyan-300">languages</span>": [<span className="text-emerald-300">"C"</span>, <span className="text-emerald-300">"Python"</span>, <span className="text-emerald-300">"JavaScript"</span>],</div>
                    <div className="pl-4">"<span className="text-cyan-300">frontend</span>": [<span className="text-emerald-300">"HTML"</span>, <span className="text-emerald-300">"CSS"</span>, <span className="text-emerald-300">"React.js"</span>, <span className="text-emerald-300">"Tailwind CSS"</span>],</div>
                    <div className="pl-4">"<span className="text-cyan-300">backend</span>": [<span className="text-emerald-300">"Node.js"</span>, <span className="text-emerald-300">"Express.js"</span>],</div>
                    <div className="pl-4">"<span className="text-cyan-300">database</span>": [<span className="text-emerald-300">"MongoDB"</span>],</div>
                    <div className="pl-4">"<span className="text-cyan-300">developerTools</span>": [<span className="text-emerald-300">"Git"</span>, <span className="text-emerald-300">"GitHub"</span>]</div>
                    <div>&#125;</div>
                  </div>
                )}
              </div>

              {/* Terminal Footer status */}
              <div className="px-4 py-2.5 bg-navy-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>bash • utf-8</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Ready to deploy
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
