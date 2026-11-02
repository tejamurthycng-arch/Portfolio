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
          {/* Section 0: Hero */}
          <Hero />

          {/* Core Technical Stack Marquee — Positioned strategically after Hero for maximum impact */}
          <TechMarquee />

          {/* Section 1: About (Cinematic Pinned Storytelling) */}
          <About />

          {/* Section 2: Technical Skills */}
          <Skills />

          {/* Section 3: Verified Projects (Horizontal Pinned Gallery & Timeline) */}
          <Projects />

          {/* Section 4: Hackathons & Experience */}
          <HackathonsExperience />

          {/* Section 5: Education & Academic Foundation */}
          <Education />
          <Achievements />

          {/* Section 6: Contact */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;
