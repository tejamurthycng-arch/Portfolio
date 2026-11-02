export interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'tools';
  description: string;
  iconName: string; // Identifier for Lucide / custom icon rendering
}

export interface SkillCategory {
  id: 'languages' | 'frontend' | 'backend' | 'database' | 'tools';
  title: string;
  shortDesc: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    shortDesc: 'Core programming foundations for systems and algorithms',
    skills: [
      {
        name: 'C',
        category: 'languages',
        description: 'Low-level programming, memory management, algorithmic data structures, and mathematical computation.',
        iconName: 'Terminal'
      },
      {
        name: 'Python',
        category: 'languages',
        description: 'Scripting, backend logic, data processing, and machine learning/computer vision applications.',
        iconName: 'FileCode'
      },
      {
        name: 'JavaScript',
        category: 'languages',
        description: 'Dynamic frontend interactions, asynchronous programming, DOM scripting, and event handling.',
        iconName: 'Code2'
      }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    shortDesc: 'Building responsive, accessible, and structured user interfaces',
    skills: [
      {
        name: 'HTML',
        category: 'frontend',
        description: 'Semantic document structure, web standards, accessibility principles, and SEO fundamentals.',
        iconName: 'Layout'
      },
      {
        name: 'CSS',
        category: 'frontend',
        description: 'Responsive styling, Flexbox, CSS Grid layouts, media queries, and modern animations.',
        iconName: 'Palette'
      },
      {
        name: 'React.js',
        category: 'frontend',
        description: 'Component-driven architectures, state management with hooks, props flow, and reactive web apps.',
        iconName: 'Layers'
      },
      {
        name: 'Tailwind CSS',
        category: 'frontend',
        description: 'Utility-first styling, rapid UI prototyping, responsive design tokens, and customized design systems.',
        iconName: 'Sparkles'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    shortDesc: 'Server-side logic and RESTful API engineering',
    skills: [
      {
        name: 'Node.js',
        category: 'backend',
        description: 'Non-blocking I/O runtime, event loop mechanisms, and server-side JavaScript execution.',
        iconName: 'Server'
      },
      {
        name: 'Express.js',
        category: 'backend',
        description: 'RESTful API routing, middleware chaining, request/response cycles, and server architecture.',
        iconName: 'Cpu'
      }
    ]
  },
  {
    id: 'database',
    title: 'Database Management',
    shortDesc: 'Data persistence and schema design',
    skills: [
      {
        name: 'MongoDB',
        category: 'database',
        description: 'NoSQL document modeling, JSON-like collections, CRUD operations, and data aggregation pipelines.',
        iconName: 'Database'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    shortDesc: 'Modern collaboration and version control workflows',
    skills: [
      {
        name: 'Git',
        category: 'tools',
        description: 'Distributed version control, branching, committing, merging, and codebase history management.',
        iconName: 'GitBranch'
      },
      {
        name: 'GitHub',
        category: 'tools',
        description: 'Remote repository hosting, collaborative open-source workflows, and pull request reviews.',
        iconName: 'Github'
      }
    ]
  }
];
