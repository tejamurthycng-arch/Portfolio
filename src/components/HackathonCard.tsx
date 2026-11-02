import React from 'react';
import { Award, Calendar, FileText, CheckCircle, ExternalLink, Building2 } from 'lucide-react';
import { HackathonExperience } from '../data/hackathons';
import { Button } from './Button';

interface HackathonCardProps {
  item: HackathonExperience;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({ item }) => {
  return (
    <div className="relative p-6 sm:p-7 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:shadow-crimson-sm backdrop-blur-md group overflow-hidden">
      {/* Top subtle crimson highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3.5">
          <span className="p-3 rounded-xl bg-navy-800 text-crimson-DEFAULT border border-red-500/25 flex-shrink-0 group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-950/60 border border-red-500/30 text-rose-300 font-semibold">
                {item.eventCategory}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-crimson-DEFAULT transition-colors">
              {item.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1.5">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-rose-400" />
                {item.organizer}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                {item.dateOrYear}
              </span>
            </div>
          </div>
        </div>

        {/* Participation Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-red-950/80 border border-red-500/40 text-rose-200 self-start sm:self-auto shadow-sm">
          <CheckCircle className="w-3.5 h-3.5 text-crimson-DEFAULT" />
          Verified {item.participationStatus}
        </span>
      </div>

      {item.themeOrProblem && (
        <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-navy-850/80 border border-slate-800/80 text-xs text-slate-300">
          <span className="font-semibold text-rose-400">Event Focus: </span>
          {item.themeOrProblem}
        </div>
      )}

      {/* Professional two-line description of learning */}
      <div className="mb-5 text-sm text-slate-300/90 leading-relaxed space-y-1.5">
        {item.learningDescription.split('\n').map((line, idx) => (
          <p key={idx} className="flex items-start gap-2">
            <span className="text-crimson-DEFAULT font-bold">•</span>
            <span>{line}</span>
          </p>
        ))}
      </div>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-navy-800 text-slate-300 border border-slate-700/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Verified Certificate Link */}
      {item.certificatePdfUrl && (
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-400 flex items-center gap-2">
            <FileText className="w-4 h-4 text-crimson-DEFAULT" />
            Official Participation Certificate Issued by BMSCE Protocol Club
          </span>
          <Button
            href={item.certificatePdfUrl}
            external
            variant="primary"
            size="sm"
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            View Certificate (PDF)
          </Button>
        </div>
      )}
    </div>
  );
};
