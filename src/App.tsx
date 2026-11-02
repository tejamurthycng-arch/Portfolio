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
import { DynamicBackground } from './components/DynamicBackground';
import { SmoothScroll } from './components/SmoothScroll';
import { SectionMarquee } from './components/SectionMarquee';
import {
  heroMarqueeItems,
  aboutMarqueeItems,
  skillsMarqueeItems,
  projectsMarqueeItems,
  hackathonsMarqueeItems,
  educationMarqueeItems,
  contactMarqueeItems,
} from './data/marquees';

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
          <SectionMarquee items={heroMarqueeItems} direction="left" speed={24} />

          {/* Section 1: About */}
          <About />
          <SectionMarquee items={aboutMarqueeItems} direction="right" speed={28} />

          {/* Section 2: Skills */}
          <Skills />
          <SectionMarquee items={skillsMarqueeItems} direction="left" speed={26} />

          {/* Section 3: Projects */}
          <Projects />
          <SectionMarquee items={projectsMarqueeItems} direction="right" speed={30} />

          {/* Section 4: Hackathons & Experience */}
          <HackathonsExperience />
          <SectionMarquee items={hackathonsMarqueeItems} direction="left" speed={26} />

          {/* Section 5: Education & Achievements */}
          <Education />
          <SectionMarquee items={educationMarqueeItems} direction="right" speed={28} />
          <Achievements />

          {/* Section 6: Contact */}
          <Contact />
          <SectionMarquee items={contactMarqueeItems} direction="left" speed={24} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;
