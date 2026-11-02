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
  { label: 'Experience', href: '#experience' },
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
      const scrollPosition = window.scrollY + 140;

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
          ? 'bg-black/75 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 sm:py-4 shadow-2xl shadow-black/80'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 sm:gap-3 text-white font-display text-lg sm:text-2xl font-bold tracking-wider"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/[0.04] border-2 border-violet-500/40 flex items-center justify-center text-violet-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.45)] group-hover:scale-105 transition-all duration-300 backdrop-blur-xl shadow-glass">
              <span className="font-mono text-sm sm:text-base font-extrabold text-white group-hover:text-cyan-300">TM</span>
            </div>
            <span className="font-display font-bold tracking-tight text-white group-hover:text-violet-300 transition-colors">
              Tejamurthy<span className="text-cyan-400">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation for Laptops & Desktops (lg: 1024px+) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-white/[0.03] border border-white/[0.1] px-3.5 xl:px-5 py-1.5 xl:py-2 rounded-full backdrop-blur-2xl shadow-glass">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600/35 to-cyan-600/25 text-white shadow-sm border border-violet-500/50 font-semibold backdrop-blur-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Resume Button for Laptops & Desktops */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href={personalInfo.resumeUrl}
              external
              variant="primary"
              size="md"
              icon={<ExternalLink className="w-4 h-4" />}
              className="text-xs xl:text-sm px-4 xl:px-6 py-2 xl:py-2.5 font-semibold"
            >
              Resume
            </Button>
          </div>

          {/* Mobile & Tablet Menu Hamburger Button (<1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white hover:border-violet-500/50 backdrop-blur-xl transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-violet-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (<1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-black/95 backdrop-blur-3xl px-5 pt-3 pb-8 animate-fadeIn mt-2 shadow-2xl">
          <nav className="flex flex-col gap-1.5 mb-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-violet-600/25 text-white border border-violet-500/40 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
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
            size="lg"
            icon={<FileDown className="w-5 h-5" />}
            className="w-full justify-center text-base py-3"
          >
            View Official Resume
          </Button>
        </div>
      )}
    </header>
  );
};
