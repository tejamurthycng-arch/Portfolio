import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { hackathonsAndExperience, hasVerifiedHackathons } from '../data/hackathons';
import { HackathonCard } from '../components/HackathonCard';
import { SectionHeading } from '../components/SectionHeading';
import { Award, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const HackathonsExperience: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredItems = selectedType === 'all'
    ? hackathonsAndExperience
    : hackathonsAndExperience.filter(item => item.type === selectedType);

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="// 04. VERIFIED EXPERIENCES"
          title="Hackathons & Experience"
          subtitle="Documented timeline of technical hackathons, coding sprints, and engineering experiences backed by verified participation credentials."
        />

        {/* Experience Category Tabs with Translucent Glass */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/[0.08]">
          {[
            { id: 'all', label: 'All Experiences' },
            { id: 'hackathon', label: 'Hackathons' },
            { id: 'workshop', label: 'Workshops' },
            { id: 'internship', label: 'Internships' },
            { id: 'technical_event', label: 'Technical Events' },
            { id: 'research', label: 'Research Work' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                selectedType === tab.id
                  ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold shadow-[0_0_18px_rgba(139,92,246,0.4)]'
                  : 'glass-pill text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        {hasVerifiedHackathons && filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <HackathonCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Certificate Pipeline & Ready-to-Verify State */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl glass-card p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-violet-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-5 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Hackathon Certificate Integration Pipeline
            </h3>

            <p className="text-slate-300/85 text-sm md:text-base leading-relaxed mb-6 max-w-xl mx-auto">
              Per strict portfolio requirements, only verified participation certificates uploaded as PDFs are displayed here. No awards or finalist titles are ever claimed without authentic credential backing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-8 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl glass-pill">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold mb-1.5">
                  <FileText className="w-4 h-4" />
                  <span>1. Upload PDF</span>
                </div>
                <p className="text-xs text-slate-400">
                  Save your certificate PDF into <code className="text-violet-300">public/certificates/</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-pill">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>2. Verify Metadata</span>
                </div>
                <p className="text-xs text-slate-400">
                  Extracts event name, organizer, date, and genuine participation status.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-pill">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>3. Render Card</span>
                </div>
                <p className="text-xs text-slate-400">
                  Displays a verified card with an authentic two-line learning summary and PDF viewer.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border-violet-500/30 text-xs font-mono text-violet-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Configurable in <code>src/data/hackathons.ts</code></span>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
