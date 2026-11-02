export interface PersonalInfo {
  name: string;
  role: string;
  email: string;
  location: string;
  college: string;
  collegeShort: string;
  degree: string;
  currentYear: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string; // Configurable
  resumeUrl: string;
  heroBio: string;
  aboutIntro: string;
  aboutDetailed: {
    background: string;
    interests: string;
    aspirations: string;
    learningMindset: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "Tejamurthy M",
  role: "Aspiring Software Engineer",
  email: "tejamurthycng@gmail.com",
  location: "Bangalore, India",
  college: "BMS College of Engineering (BMSCE), Bangalore",
  collegeShort: "BMSCE, Bangalore",
  degree: "B.E. Computer Science and Engineering",
  currentYear: "2nd Year",
  githubUsername: "tejamurthycng-arch",
  githubUrl: "https://github.com/tejamurthycng-arch",
  linkedinUrl: "https://linkedin.com/in/tejamurthy-m", // Configurable placeholder
  resumeUrl: "https://drive.google.com/file/d/1TJCA6Sl-jbGbgP9Vf_mdMv4UYGBUK6b2/view?usp=sharing",
  heroBio: "Passionate about building digital experiences, exploring modern technologies and solving real-world problems through code.",
  aboutIntro: "I'm Tejamurthy M, a Computer Science and Engineering student at BMS College of Engineering, Bangalore, passionate about software development and building technology-driven solutions. I enjoy exploring modern web technologies, developing full-stack applications, and continuously improving my programming and problem-solving skills.",
  aboutDetailed: {
    background: "Currently in my 2nd year pursuing Computer Science and Engineering at BMS College of Engineering, I have cultivated a strong academic foundation in core computer science, systems programming, and algorithmic reasoning.",
    interests: "My technical curiosity spans full-stack web architectures, responsive user interfaces, and practical AI integrations. I enjoy bridging backend logic with responsive, accessible user interfaces.",
    aspirations: "I aspire to become a versatile Software Engineer contributing to high-impact products, building resilient systems, and collaborating with cross-functional engineering teams.",
    learningMindset: "I approach every technical challenge with curiosity and discipline. Whether diving deep into C memory and data structures, building full-stack web applications, or training vision models for civic impact, I prioritize clean code and continuous growth."
  }
};
