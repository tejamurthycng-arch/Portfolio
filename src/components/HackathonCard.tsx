import React from 'react';
import { Award, Calendar, FileText, CheckCircle, ExternalLink, Building2 } from 'lucide-react';
import { HackathonExperience } from '../data/hackathons';
import { Button } from './Button';

interface HackathonCardProps {
  item: HackathonExperience;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({ item }) => {
  return (
    <div className="relative p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-electric-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-lg bg-navy-800 text-electric border border-cyan-500/20">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-white hover:text-electric transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                {item.organizer}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {item.dateOrYear}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Participation Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
            <CheckCircle className="w-3 h-3 text-electric" />
            {item.participationStatus}
          </span>
        </div>
      </div>

      {item.themeOrProblem && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-navy-850/60 border border-slate-800/80 text-xs text-slate-300">
          <span className="font-semibold text-cyan-400">Theme / Focus: </span>
          {item.themeOrProblem}
        </div>
      )}

      {/* Professional two-line description of learning */}
      <div className="mb-4 text-sm text-slate-300 leading-relaxed space-y-1">
        {item.learningDescription.split('\n').map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-300 border border-slate-700/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Verified Certificate Link */}
      {item.certificatePdfUrl && (
        <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-cyan-400" />
            Verified Participation Certificate
          </span>
          <Button
            href={item.certificatePdfUrl}
            external
            variant="outline"
            size="sm"
            icon={<ExternalLink className="w-3 h-3" />}
            className="text-xs py-1"
          >
            View Certificate
          </Button>
        </div>
      )}
    </div>
  );
};
