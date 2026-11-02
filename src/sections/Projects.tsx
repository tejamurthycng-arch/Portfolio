import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, Project } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { Github, Filter } from 'lucide-react';
import { Button } from '../components/Button';
import { personalInfo } from '../data/personalInfo';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fullstack' | 'ai' | 'frontend' | 'systems'>('all');

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'fullstack', label: 'Full-Stack & Computer Vision', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'ai', label: 'AI & Data Ecosystems', count: projects.filter(p => p.category === 'ai').length },
    { id: 'frontend', label: 'Frontend & UI', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'systems', label: 'Systems & C', count: projects.filter(p => p.category === 'systems').length },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeading
            badge="// 03. VERIFIED PROJECTS"
            title="Featured Engineering Work"
            subtitle="Authentic repositories analyzed directly from my GitHub profile. No fictional projects, mock metrics, or synthetic claims."
            className="mb-0"
          />

          <Button
            href={personalInfo.githubUrl}
            external
            variant="outline"
            size="sm"
            icon={<Github className="w-4 h-4 text-cyan-400" />}
            className="w-fit glass-pill hover:bg-white/[0.08] text-slate-200"
          >
            Explore All on GitHub
          </Button>
        </div>

        {/* Filter Navigation with Translucent Glass */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 mr-2 text-xs font-mono text-slate-500">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filter:</span>
          </div>

          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-2 ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold shadow-[0_0_18px_rgba(139,92,246,0.4)]'
                  : 'glass-pill text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === tab.id ? 'bg-black/25 text-white font-bold' : 'bg-white/[0.08] text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: Project, index: number) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Note on Authenticity with Translucent Glass */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-4 rounded-2xl glass-panel text-center text-xs text-slate-400 font-mono"
        >
          <span>🔒 All codebases are authenticated with <span className="text-cyan-400 font-semibold">@{personalInfo.githubUsername}</span> on GitHub. Live Demo buttons are rendered strictly when active production deployments exist.</span>
        </motion.div>

      </div>
    </section>
  );
};
