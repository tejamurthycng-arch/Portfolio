export interface Project {
  id: string;
  name: string;
  repoName: string;
  description: string;
  technologies: string[];
  category: 'all' | 'fullstack' | 'frontend' | 'systems' | 'ai';
  githubUrl: string;
  demoUrl?: string | null; // ONLY shown when a valid live deployment URL exists
  featured: boolean;
  dateCreated?: string;
  lastUpdated?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "civictracker",
    name: "CivicTracker - AI Issue Detection & Geospatial Tracking",
    repoName: "civictracker",
    description: "An AI-powered civic issue detection and tracking platform. Leverages a trained YOLOv8 computer vision model to detect potholes and road hazards from user reports, backed by an issue tracking system and interactive geospatial heatmaps.",
    technologies: ["Python", "Flask", "YOLOv8", "Computer Vision", "HTML", "SQLite"],
    category: "fullstack",
    githubUrl: "https://github.com/tejamurthycng-arch/civictracker",
    demoUrl: null, // No live deployment URL published yet
    featured: true,
    lastUpdated: "March 2026",
    highlights: [
      "YOLOv8 deep learning model integration for automated pothole detection",
      "Interactive geospatial heatmap to visualize road defect clusters",
      "Administrative dashboard and community reporting pipeline"
    ]
  },
  {
    id: "ai_gym_fitness",
    name: "AI Gym Assistant & Fitness Ecosystem",
    repoName: "ai_gym_fitness",
    description: "A data-driven fitness intelligence dashboard and workout assistant built with Streamlit and Python. Features automated habit tracking, performance analytics with Plotly, exercise guidance, and personalized fitness recommendations.",
    technologies: ["Python", "Streamlit", "Pandas", "Plotly", "NumPy"],
    category: "ai",
    githubUrl: "https://github.com/tejamurthycng-arch/ai_gym_fitness",
    demoUrl: null, // No live deployment URL published yet
    featured: true,
    lastUpdated: "March 2026",
    highlights: [
      "Interactive habit tracking and behavioral analytics with Plotly",
      "Modular AI modules: Habit Tracker, Gym Trainer, Dietician & Gym Recommender",
      "Wide-layout Streamlit application with intuitive sidebar navigation"
    ]
  },
  {
    id: "oscode_website",
    name: "OSCode Community Platform",
    repoName: "OSCode_Website",
    description: "The official web presence built for the OSCode student organization. Features showcase pages for technical workshops, event posters, responsive layout design, and interactive DOM manipulation.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "frontend",
    githubUrl: "https://github.com/tejamurthycng-arch/OSCode_Website",
    demoUrl: null, // No live deployment URL published yet
    featured: true,
    lastUpdated: "May 2026",
    highlights: [
      "Clean semantic HTML structure with custom CSS design tokens",
      "Responsive event promotion cards and interactive poster displays",
      "Optimized client-side scripts with minimal external dependencies"
    ]
  },
  {
    id: "html_css_projects",
    name: "Modern Frontend Clones (Amazon & YouTube)",
    repoName: "HTML-CSS-PROJECTS",
    description: "A comprehensive deep dive into foundational web development featuring pixel-accurate desktop and responsive UI clones of Amazon e-commerce and YouTube video streaming platforms.",
    technologies: ["HTML", "CSS", "Responsive Design"],
    category: "frontend",
    githubUrl: "https://github.com/tejamurthycng-arch/HTML-CSS-PROJECTS",
    demoUrl: null, // No live deployment URL published yet
    featured: false,
    lastUpdated: "March 2026",
    highlights: [
      "Pixel-precise Amazon header, multi-card shopping grid, and product categories",
      "YouTube video gallery layout with sidebar navigation and channel metadata",
      "Pure CSS responsive layouts utilizing Flexbox and CSS Grid"
    ]
  },
  {
    id: "ac_calculator",
    name: "AC Circuit Electrical Calculator",
    repoName: "ac-calculator",
    description: "A C-based engineering calculation tool designed to compute key alternating current parameters: inductive reactance (XL), capacitive reactance (XC), total circuit impedance (Z), resonant frequency (Fr), and circuit power factor (Pf).",
    technologies: ["C", "Mathematical Modeling", "CLI"],
    category: "systems",
    githubUrl: "https://github.com/tejamurthycng-arch/ac-calculator",
    demoUrl: null, // CLI application, no web demo
    featured: false,
    lastUpdated: "December 2025",
    highlights: [
      "Formulates mathematical equations using math.h in standard C",
      "Fast, deterministic AC electrical circuit analysis",
      "Clean command-line input and formatted numerical output"
    ]
  },
  {
    id: "rock_paper_scissor",
    name: "Rock-Paper-Scissors Algorithmic Game",
    repoName: "rock-paper-scissor",
    description: "A classic interactive console application programmed in C. Implements pseudo-random selection using time-seeded rand(), conditional game state evaluation, robust choice validation, and score tracking.",
    technologies: ["C", "Algorithms", "CLI"],
    category: "systems",
    githubUrl: "https://github.com/tejamurthycng-arch/rock-paper-scissor",
    demoUrl: null, // CLI application, no web demo
    featured: false,
    lastUpdated: "December 2025",
    highlights: [
      "Seeded pseudo-random number generation via time(NULL)",
      "Strict input boundary checking and user input validation",
      "Modular control flow and score evaluation logic"
    ]
  }
];
