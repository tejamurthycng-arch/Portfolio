import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { TechMarquee } from './components/TechMarquee';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { HackathonsExperience } from './sections/HackathonsExperience';
import { Education } from './sections/Education';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { DynamicBackground } from './components/DynamicBackground';
import { SmoothScroll } from './components/SmoothScroll';

export const App: React.FC = () => {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-black text-slate-100 flex flex-col selection:bg-violet-600 selection:text-white overflow-x-hidden">
        {/* Interactive 60fps Dynamic Background Engine with Preset Switcher */}
        <DynamicBackground />

        {/* Navigation */}
        <Navbar />

        {/* Main Content with Layered Glassmorphic Depth */}
        <main className="flex-grow z-10 relative">
          <Hero />
          {/* Infinite Animated Tech Stack & Engineering Marquee */}
          <TechMarquee />
          <About />
          <Skills />
          <Projects />
          <HackathonsExperience />
          <Education />
          <Achievements />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;
