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
      className="relative p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-rose-500/50 hover:bg-white/[0.05] transition-all duration-300 hover:shadow-[0_12px_40px_-5px_rgba(244,63,94,0.25)] backdrop-blur-2xl shadow-glass group overflow-hidden"
    >
      {/* Top subtle crimson highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3.5">
          <span className="p-3 rounded-2xl bg-white/[0.05] text-rose-400 border border-white/[0.1] flex-shrink-0 group-hover:scale-105 transition-transform backdrop-blur-md shadow-sm">
            <Award className="w-6 h-6" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold backdrop-blur-md">
                {item.eventCategory}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
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
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-rose-500/15 border border-rose-500/40 text-rose-200 self-start sm:self-auto shadow-sm backdrop-blur-md">
          <CheckCircle className="w-3.5 h-3.5 text-rose-500" />
          Verified {item.participationStatus}
        </span>
      </div>

      {item.themeOrProblem && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300 backdrop-blur-md">
          <span className="font-semibold text-rose-400">Event Focus: </span>
          {item.themeOrProblem}
        </div>
      )}

      {/* Professional two-line description of learning */}
      <div className="mb-5 text-sm text-slate-300/85 leading-relaxed space-y-1.5">
        {item.learningDescription.split('\n').map((line, idx) => (
          <p key={idx} className="flex items-start gap-2">
            <span className="text-rose-500 font-bold">•</span>
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
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.03] text-slate-300 border border-white/[0.07]"
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
            <FileText className="w-4 h-4 text-rose-400" />
            Official Participation Certificate Issued by BMSCE Protocol Club
          </span>
          <Button
            href={item.certificatePdfUrl}
            external
            variant="primary"
            size="sm"
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            className="text-xs bg-gradient-to-r from-rose-600 to-red-600 shadow-md"
          >
            View Certificate (PDF)
          </Button>
        </div>
      )}
    </motion.div>
  );
};
