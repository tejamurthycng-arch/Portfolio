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
import { StarfieldBackground } from './components/StarfieldBackground';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050207] text-slate-100 flex flex-col selection:bg-rose-600 selection:text-white overflow-x-hidden">
      {/* Motion Graphics Miniature Stars & Ambient Cosmic Space Background */}
      <StarfieldBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content with Layered Glassmorphic Depth */}
      <main className="flex-grow z-10 relative">
        <Hero />
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
  );
};

export default App;
