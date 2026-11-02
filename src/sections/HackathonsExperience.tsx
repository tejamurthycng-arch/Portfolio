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
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.07] border border-white/[0.08] backdrop-blur-md'
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
            className="rounded-3xl bg-white/[0.03] border border-white/[0.08] p-8 md:p-12 backdrop-blur-2xl text-center max-w-3xl mx-auto shadow-glass"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-5 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Hackathon Certificate Integration Pipeline
            </h3>

            <p className="text-slate-300/85 text-sm md:text-base leading-relaxed mb-6 max-w-xl mx-auto">
              Per strict portfolio requirements, only verified participation certificates uploaded as PDFs are displayed here. No awards or finalist titles are ever claimed without authentic credential backing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-8 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold mb-1.5">
                  <FileText className="w-4 h-4" />
                  <span>1. Upload PDF</span>
                </div>
                <p className="text-xs text-slate-400">
                  Save your certificate PDF into <code className="text-rose-300">public/certificates/</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>2. Verify Metadata</span>
                </div>
                <p className="text-xs text-slate-400">
                  Extracts event name, organizer, date, and genuine participation status.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>3. Render Card</span>
                </div>
                <p className="text-xs text-slate-400">
                  Displays a verified card with an authentic two-line learning summary and PDF viewer.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-rose-500/30 text-xs font-mono text-rose-300 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-rose-500" />
              <span>Configurable in <code>src/data/hackathons.ts</code></span>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
