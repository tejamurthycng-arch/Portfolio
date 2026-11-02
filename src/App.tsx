import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { HackathonsExperience } from './sections/HackathonsExperience';
import { Education } from './sections/Education';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-electric selection:text-navy-950">
      {/* Top ambient glow lights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-7xl h-40 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl pointer-events-none z-0"></div>

      <Navbar />

      <main className="flex-grow z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <HackathonsExperience />
        <Education />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
