import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, CheckCircle2 } from 'lucide-react';
import { Project } from '../data/projects';
import { Button } from './Button';
import { Card3D } from './Card3D';

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      <Card3D maxTilt={11} className="h-full">
        <div className="group relative flex flex-col justify-between h-full rounded-2xl glass-card overflow-hidden p-6 sm:p-7 transition-all duration-300 hover:border-violet-500/60 hover:shadow-[0_15px_40px_-5px_rgba(139,92,246,0.35)]">
          {/* Top subtle violet-cyan highlight on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
            {/* Header badges */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-violet-500/10 text-cyan-400 border border-violet-500/20">
                  <Code className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/25 backdrop-blur-md">
                  {project.repoName}
                </span>
              </div>
              {project.featured && (
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-200 border border-violet-500/35">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors duration-200">
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
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
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
                  className="flex-1 text-xs glass-pill hover:bg-white/[0.08] text-slate-200"
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
                  className="flex-1 text-xs shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                >
                  Live Demo
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card3D>
    </motion.div>
  );
};
