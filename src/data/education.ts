export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  branch: string;
  currentYear: string;
  location: string;
  duration: string;
  description: string;
  coursework: string[];
  keyFocus: string[];
}

export const educationData: EducationItem[] = [
  {
    id: "bmsce-cse",
    institution: "BMS College of Engineering (BMSCE)",
    degree: "Bachelor of Engineering (B.E.)",
    branch: "Computer Science and Engineering",
    currentYear: "2nd Year",
    location: "Bangalore, Karnataka, India",
    duration: "2024 – Present",
    description: "Pursuing rigorous computer science fundamentals, algorithm design, software development paradigms, and systems engineering at one of premier engineering institutions in Karnataka.",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Computer Organization & Architecture",
      "Discrete Mathematics",
      "Database Management Systems",
      "Operating Systems Fundamentals"
    ],
    keyFocus: [
      "Systems Programming with C",
      "Full-Stack Web Architectures",
      "Algorithmic Problem Solving",
      "Software Design Principles"
    ]
  }
];
