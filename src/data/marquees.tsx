import { 
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  Award, 
  CheckCircle, 
  Flame, 
  BookOpen, 
  Mail, 
  Github, 
  Compass, 
  Rocket, 
  FileCode,
  Layers
} from 'lucide-react';
import { MarqueeItem } from '../components/SectionMarquee';

// 1. Marquee after Hero: Identity & Core Capabilities
export const heroMarqueeItems: MarqueeItem[] = [
  { text: 'Tejamurthy M', subtext: 'Aspiring Software Engineer', icon: <Rocket className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: 'BMS College of Engineering', subtext: 'B.E. CSE 2nd Year', icon: <GraduationCap className="w-3.5 h-3.5 text-violet-400" /> },
  { text: 'Bangalore, India', subtext: 'Tech Capital', icon: <MapPin className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: 'Full-Stack Web Engineering', subtext: 'MERN & Python', icon: <Code2 className="w-3.5 h-3.5 text-fuchsia-400" /> },
  { text: 'Problem Solver & Developer', subtext: 'Algorithms', icon: <Cpu className="w-3.5 h-3.5 text-emerald-400" /> },
  { text: 'Open to Technical Roles', subtext: 'Internships', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
];

// 2. Marquee after About: Engineering Pillars & Philosophy
export const aboutMarqueeItems: MarqueeItem[] = [
  { text: 'Engineering Foundations', subtext: 'Core CS Discipline', icon: <Terminal className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: 'Growth Mindset', subtext: 'Continuous Learner', icon: <Compass className="w-3.5 h-3.5 text-violet-400" /> },
  { text: 'Algorithmic Fundamentals', subtext: 'Structured Logic', icon: <Cpu className="w-3.5 h-3.5 text-fuchsia-400" /> },
  { text: 'Technology-Driven Solutions', subtext: 'Real-World Focus', icon: <Rocket className="w-3.5 h-3.5 text-emerald-400" /> },
  { text: 'Clean Architecture', subtext: 'Maintainable Systems', icon: <Layers className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: 'Collaborative Mindset', subtext: 'Team Driven', icon: <Sparkles className="w-3.5 h-3.5 text-violet-400" /> },
];

// 3. Marquee after Skills: 11 Verified Technologies
export const skillsMarqueeItems: MarqueeItem[] = [
  { text: 'C Programming', subtext: 'Low-Level Systems', icon: <Code2 className="w-3.5 h-3.5 text-red-400" /> },
  { text: 'Python', subtext: 'Backend & Intelligent Systems', icon: <Terminal className="w-3.5 h-3.5 text-yellow-400" /> },
  { text: 'JavaScript', subtext: 'Modern ES6+ Engine', icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" /> },
  { text: 'React.js', subtext: 'Component UI Architecture', icon: <Layers className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: 'Node.js & Express.js', subtext: 'RESTful Backends', icon: <Cpu className="w-3.5 h-3.5 text-emerald-400" /> },
  { text: 'MongoDB', subtext: 'NoSQL Document Store', icon: <Database className="w-3.5 h-3.5 text-green-400" /> },
  { text: 'Tailwind CSS', subtext: 'Modern Styling System', icon: <Flame className="w-3.5 h-3.5 text-cyan-300" /> },
  { text: 'Git & GitHub', subtext: 'Version Control', icon: <Github className="w-3.5 h-3.5 text-violet-400" /> },
];

// 4. Marquee after Projects: 6 Authentic Repositories
export const projectsMarqueeItems: MarqueeItem[] = [
  { text: 'civictracker', subtext: 'Civic Issue Resolution Platform', icon: <FileCode className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: 'ai_gym_fitness', subtext: 'Real-Time Pose & Motion Tracker', icon: <Flame className="w-3.5 h-3.5 text-violet-400" /> },
  { text: 'OSCode_Website', subtext: 'Open Source Community Hub', icon: <Github className="w-3.5 h-3.5 text-fuchsia-400" /> },
  { text: 'HTML-CSS-PROJECTS', subtext: 'Modern Responsive UI Suite', icon: <Layers className="w-3.5 h-3.5 text-emerald-400" /> },
  { text: 'ac-calculator', subtext: 'Clean Financial & Engineering Math', icon: <Cpu className="w-3.5 h-3.5 text-amber-400" /> },
  { text: 'rock-paper-scissor', subtext: 'Interactive Game Logic Engine', icon: <Code2 className="w-3.5 h-3.5 text-cyan-300" /> },
  { text: '100% Genuine Codebases', subtext: 'Verified on GitHub', icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> },
];

// 5. Marquee after Hackathons: Verified Participation
export const hackathonsMarqueeItems: MarqueeItem[] = [
  { text: 'The Beginner Hackathon', subtext: 'BMSCE Protocol Club', icon: <Award className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: 'Verified Participant', subtext: 'Official Certificate Backed', icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> },
  { text: 'Rapid Prototyping', subtext: 'Sprint Execution', icon: <Flame className="w-3.5 h-3.5 text-violet-400" /> },
  { text: 'Real-World Problem Solving', subtext: 'Algorithmic Challenge', icon: <Cpu className="w-3.5 h-3.5 text-fuchsia-400" /> },
  { text: 'Collaborative Teamwork', subtext: 'Engineering Agility', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
  { text: 'Dept. of CSE, BMSCE', subtext: 'March 2026', icon: <GraduationCap className="w-3.5 h-3.5 text-cyan-300" /> },
];

// 6. Marquee after Education: Academic Foundations
export const educationMarqueeItems: MarqueeItem[] = [
  { text: 'BMS College of Engineering', subtext: 'Bangalore, India', icon: <GraduationCap className="w-3.5 h-3.5 text-violet-400" /> },
  { text: 'B.E. Computer Science & Engineering', subtext: '2024 – 2028', icon: <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: 'Data Structures & Algorithms', subtext: 'Core Foundation', icon: <Cpu className="w-3.5 h-3.5 text-emerald-400" /> },
  { text: 'Object-Oriented Programming', subtext: 'Software Design', icon: <Code2 className="w-3.5 h-3.5 text-fuchsia-400" /> },
  { text: 'Discrete Mathematical Logic', subtext: 'Theory of Computation', icon: <Terminal className="w-3.5 h-3.5 text-amber-400" /> },
  { text: 'Academic Rigor', subtext: 'BMSCE CSE Dept', icon: <CheckCircle className="w-3.5 h-3.5 text-cyan-300" /> },
];

// 7. Marquee after Contact: Inquiries & Collaboration
export const contactMarqueeItems: MarqueeItem[] = [
  { text: "Let's Build Something Together", subtext: 'Open to Roles', icon: <Rocket className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: 'tejamurthycng@gmail.com', subtext: 'Direct Delivery', icon: <Mail className="w-3.5 h-3.5 text-violet-400" /> },
  { text: 'GitHub: @tejamurthycng-arch', subtext: 'Explore Code', icon: <Github className="w-3.5 h-3.5 text-fuchsia-400" /> },
  { text: 'Bangalore, Karnataka, India', subtext: 'Location Base', icon: <MapPin className="w-3.5 h-3.5 text-emerald-400" /> },
  { text: 'Technical Opportunities', subtext: 'Internships & Projects', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
];
