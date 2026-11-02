import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
          title="Core Technical Repertoire"
          subtitle="Authentic tech stack featuring programming languages, frontend libraries, backend runtimes, databases, and version control tools."
        />

        {/* Category Filter Tabs with Translucent Glass */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                : 'glass-pill text-slate-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            All Technologies ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>

          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-violet-500/20 text-cyan-300 font-semibold border border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.25)] backdrop-blur-md'
                  : 'glass-pill text-slate-400 hover:text-slate-200 hover:bg-white/[0.08]'
              }`}
            >
              {categoryIcons[category.id]}
              <span>{category.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/[0.08] text-slate-300">
                {category.skills.length}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Categories Display */}
        <div className="space-y-14">
          {filteredCategories.map((category: SkillCategory) => (
            <motion.div 
              key={category.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              
              {/* Category Subheading */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-2.5 rounded-2xl glass-pill text-cyan-400 shadow-sm">
                  {categoryIcons[category.id]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {category.shortDesc}
                  </p>
                </div>
              </div>

              {/* Grid of Skill Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
