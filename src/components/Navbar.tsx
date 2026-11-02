import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { Button } from './Button';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Hackathons & Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="group flex items-center gap-2 text-white font-display text-xl font-bold tracking-wider"
          >
            <div className="w-10 h-10 rounded-xl bg-navy-900 border border-cyan-500/30 flex items-center justify-center text-electric group-hover:border-electric group-hover:shadow-electric-sm transition-all duration-300">
              <span className="font-mono text-sm font-extrabold text-cyan-400 group-hover:text-electric">TM</span>
            </div>
            <span className="hidden sm:inline-block font-sans font-bold tracking-tight text-slate-100 group-hover:text-electric transition-colors">
              Tejamurthy<span className="text-electric">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-navy-900/60 border border-slate-800/80 px-4 py-1.5 rounded-full backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/15 text-electric shadow-sm border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Resume */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              href={personalInfo.resumeUrl}
              external
              variant="outline"
              size="sm"
              icon={<ExternalLink className="w-3.5 h-3.5 text-cyan-400" />}
              className="text-xs"
            >
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/30"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-electric" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-navy-950/95 backdrop-blur-xl px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col gap-1.5 mb-5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-950/50 text-electric border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-navy-900'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <Button
            href={personalInfo.resumeUrl}
            external
            variant="primary"
            size="md"
            icon={<FileDown className="w-4 h-4" />}
            className="w-full justify-center"
          >
            View Official Resume
          </Button>
        </div>
      )}
    </header>
  );
};
