import React from 'react';
import { achievementsData, hasVerifiedAchievements } from '../data/achievements';
import { SectionHeading } from '../components/SectionHeading';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '../components/Button';

export const Achievements: React.FC = () => {
  // STRICT RULE: Hide the section when no verified data exists!
  if (!hasVerifiedAchievements || achievementsData.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="// 06. ACHIEVEMENTS"
          title="Verified Achievements & Honors"
          subtitle="Documented academic and technical achievements, verified competitions, and accredited certifications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2.5 rounded-xl bg-navy-800 text-electric border border-cyan-500/20">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {item.issuerOrOrganization}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {item.dateOrYear}
                </span>

                {item.credentialUrl && (
                  <Button
                    href={item.credentialUrl}
                    external
                    variant="ghost"
                    size="sm"
                    icon={<ExternalLink className="w-3 h-3 text-cyan-400" />}
                    className="p-1 text-xs"
                  >
                    Verify
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
