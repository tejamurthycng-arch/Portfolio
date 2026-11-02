import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, CheckCircle2 } from 'lucide-react';
import { Project } from '../data/projects';
import { Button } from './Button';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  // STRICT CONDITIONAL LOGIC:
  // Render Live Demo ONLY if demoUrl is a non-empty string and not null
  const hasLiveDemo = Boolean(project.demoUrl && project.demoUrl.trim().length > 0);
  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col justify-between h-full rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-rose-500/50 hover:bg-white/[0.06] transition-all duration-300 hover:shadow-[0_10px_35px_-5px_rgba(244,63,94,0.25)] overflow-hidden p-6 sm:p-7 backdrop-blur-xl shadow-glass"
    >
      {/* Top subtle crimson highlight on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div>
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-white/[0.05] text-rose-400 border border-white/[0.08]">
              <Code className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono text-rose-300 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/25 backdrop-blur-md">
              {project.repoName}
            </span>
          </div>
          {project.featured && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/35">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-rose-400 transition-colors duration-200">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-300/85 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Highlights if present */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-5 space-y-1.5 pt-3 border-t border-white/[0.06]">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* Technology Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6 pt-3 border-t border-white/[0.06]">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.07]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons with Strict Conditional Logic */}
        <div className="flex items-center gap-3 pt-2">
          {hasGithub && (
            <Button
              href={project.githubUrl}
              external
              variant="secondary"
              size="sm"
              icon={<Github className="w-3.5 h-3.5" />}
              iconPosition="left"
              className="flex-1 text-xs bg-white/[0.04] hover:bg-white/[0.09] border-white/[0.1] text-slate-200"
            >
              GitHub Repo
            </Button>
          )}

          {/* Render ONLY if a valid live demo deployment URL actually exists */}
          {hasLiveDemo && (
            <Button
              href={project.demoUrl!}
              external
              variant="primary"
              size="sm"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="flex-1 text-xs bg-gradient-to-r from-rose-600 to-red-600 shadow-md"
            >
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
