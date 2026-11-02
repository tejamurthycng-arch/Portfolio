import React, { useState } from 'react';
import { skillCategories, SkillCategory } from '../data/skills';
import { SkillCard } from '../components/SkillCard';
import { SectionHeading } from '../components/SectionHeading';
import { Code, Layout, Server, Database, Wrench } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  languages: <Code className="w-4 h-4 text-cyan-400" />,
  frontend: <Layout className="w-4 h-4 text-cyan-400" />,
  backend: <Server className="w-4 h-4 text-cyan-400" />,
  database: <Database className="w-4 h-4 text-cyan-400" />,
  tools: <Wrench className="w-4 h-4 text-cyan-400" />,
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter(c => c.id === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="// 02. TECHNICAL SKILLS"
          title="Verified Core Competencies"
          subtitle="A structured overview of the programming languages, full-stack technologies, databases, and developer tools in my active technical repertoire."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-3 border-b border-slate-800">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-electric text-navy-950 font-bold shadow-electric-sm'
                : 'bg-navy-900/60 text-slate-300 hover:text-white hover:bg-navy-850 border border-slate-800'
            }`}
          >
            All Categories ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>

          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-cyan-500/20 text-electric font-semibold border border-cyan-500/40 shadow-sm'
                  : 'bg-navy-900/40 text-slate-400 hover:text-slate-200 hover:bg-navy-850 border border-slate-800/80'
              }`}
            >
              {categoryIcons[category.id]}
              <span>{category.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-navy-800 text-slate-400">
                {category.skills.length}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Categories Display */}
        <div className="space-y-12">
          {filteredCategories.map((category: SkillCategory) => (
            <div key={category.id} className="relative">
              
              {/* Category Subheading */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-navy-900 border border-cyan-500/20">
                  {categoryIcons[category.id]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {category.shortDesc}
                  </p>
                </div>
              </div>

              {/* Grid of Skill Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
