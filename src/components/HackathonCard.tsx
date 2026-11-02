import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, FileText, CheckCircle, ExternalLink, Building2 } from 'lucide-react';
import { HackathonExperience } from '../data/hackathons';
import { Button } from './Button';

interface HackathonCardProps {
  item: HackathonExperience;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({ item }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="relative p-6 sm:p-7 rounded-2xl glass-card group overflow-hidden"
    >
      {/* Top subtle violet-cyan highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3.5">
          <span className="p-3 rounded-2xl bg-violet-500/10 text-cyan-400 border border-violet-500/20 flex-shrink-0 group-hover:scale-105 transition-transform backdrop-blur-md shadow-sm">
            <Award className="w-6 h-6" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-200 font-semibold backdrop-blur-md">
                {item.eventCategory}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              {item.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1.5">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                {item.organizer}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                {item.dateOrYear}
              </span>
            </div>
          </div>
        </div>

        {/* Participation Badge */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 self-start sm:self-auto shadow-sm backdrop-blur-md">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          Verified {item.participationStatus}
        </span>
      </div>

      {item.themeOrProblem && (
        <div className="mb-4 px-4 py-3 rounded-xl glass-pill text-xs text-slate-300">
          <span className="font-semibold text-cyan-400">Event Focus: </span>
          {item.themeOrProblem}
        </div>
      )}

      {/* Professional two-line description of learning */}
      <div className="mb-5 text-sm text-slate-300/85 leading-relaxed space-y-1.5">
        {item.learningDescription.split('\n').map((line, idx) => (
          <p key={idx} className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">•</span>
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
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.07]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Verified Certificate Link */}
      {item.certificatePdfUrl && (
        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-400 flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            Official Participation Certificate Issued by BMSCE Protocol Club
          </span>
          <Button
            href={item.certificatePdfUrl}
            external
            variant="primary"
            size="sm"
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            className="text-xs shadow-[0_0_15px_rgba(139,92,246,0.35)]"
          >
            View Certificate (PDF)
          </Button>
        </div>
      )}
    </motion.div>
  );
};
