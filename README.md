# Tejamurthy M — Personal Developer Portfolio

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)

A premium, dark futuristic developer portfolio with electric blue accents built for **Tejamurthy M**, Computer Science and Engineering student at **BMS College of Engineering (BMSCE)**, Bangalore.

## ✨ Features

- **Dark Futuristic Aesthetic**: Deep navy surfaces (`#030712`), cyber grid textures, glassmorphism, and electric cyan/blue accents (`#00f0ff`).
- **Authentic Profile & Genuine Projects**: All showcased projects were analyzed and verified directly from GitHub profile [`@tejamurthycng-arch`](https://github.com/tejamurthycng-arch).
  - `CivicTracker`: AI Civic Issue Detection & Geospatial Tracking (Python, Flask, YOLOv8).
  - `AI Gym Assistant`: Fitness Habit Tracker & Ecosystem (Streamlit, Pandas, Plotly).
  - `OSCode Website`: Student organization web portal (HTML, CSS, JS).
  - `HTML-CSS-PROJECTS`: High-fidelity Amazon & YouTube UI Clones.
  - `AC Circuit Calculator`: Systems engineering computation utility in C.
  - `Rock-Paper-Scissors`: Algorithmic console engine in C.
- **Strict Conditional Action Buttons**:
  - Genuine GitHub repository links always render.
  - Live Demo buttons render **only** when an active, valid production deployment URL is specified in `src/data/projects.ts` (zero fake or broken demo links).
- **Interactive Cyber Terminal / Code Showcase**: Live tabbed interface (`developer.ts`, `system.sh`, `stack.json`) with syntax highlights and one-click copy.
- **Verified Skills & Technical Categories**: Only verified skills categorized under Languages (C, Python, JS), Frontend (HTML, CSS, React, Tailwind), Backend (Node.js, Express), Database (MongoDB), and Tools (Git, GitHub).
- **Hackathons & Experience Timeline**: Extensible verified timeline structure for hackathons, workshops, internships, and technical events with PDF certificate viewing.
- **Education Section**: BMS College of Engineering (BMSCE), Bangalore — B.E. Computer Science & Engineering (2nd Year).
- **Direct Contact System**: Form with mailto client invocation and direct copy-to-clipboard email with toast notification.
- **Responsive & Accessible**: Fully optimized for desktop, tablet, and mobile with sticky navigation, active section indicators, and mobile drawer.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/tejamurthycng-arch/portfolio.git

# Navigate into project directory
cd portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Architecture

```
├── public/
│   ├── favicon.svg              # Custom TM monogram favicon
│   └── certificates/            # Directory to drop verified hackathon PDF certificates
├── src/
│   ├── components/              # Reusable UI elements
│   │   ├── Navbar.tsx           # Sticky nav with active spy & mobile drawer
│   │   ├── Footer.tsx           # Footer with social links & copyright
│   │   ├── Button.tsx           # Futuristic button with variants
│   │   ├── SectionHeading.tsx   # Modern section heading & badge
│   │   ├── ProjectCard.tsx      # Conditional action buttons (GitHub & Live Demo)
│   │   ├── SkillCard.tsx        # Icon cards with hover glow
│   │   └── HackathonCard.tsx    # Verified experience card with certificate links
│   ├── sections/                # Full portfolio sections
│   │   ├── Hero.tsx             # Dynamic typing role, CTAs & cyber terminal
│   │   ├── About.tsx            # Exact introduction, educational background & pillars
│   │   ├── Skills.tsx           # Categorized tech skills with filters
│   │   ├── Projects.tsx         # Verified GitHub projects with filters
│   │   ├── HackathonsExperience.tsx # Hackathons & experience timeline
│   │   ├── Education.tsx        # BMS College of Engineering card
│   │   ├── Achievements.tsx     # Configurable verified honors
│   │   └── Contact.tsx          # Direct contact form & email copy
│   ├── data/                    # Reusable, configurable data files
│   │   ├── personalInfo.ts      # Contact, bio, links, and resume
│   │   ├── projects.ts          # Authentic GitHub repository records
│   │   ├── skills.ts            # Verified skills list
│   │   ├── hackathons.ts        # Hackathons & experience entries
│   │   ├── education.ts         # Education details
│   │   └── achievements.ts      # Achievements & certifications
│   ├── utils/
│   │   └── cn.ts                # Class merging utility
│   ├── App.tsx                  # Root portfolio application
│   ├── index.css                # Tailwind directives & cyber effects
│   └── main.tsx                 # React entry point
└── tailwind.config.js           # Electric blue palette & custom glow tokens
```

## ⚙️ Configuration & Customization

1. **LinkedIn Profile**: Update `linkedinUrl` in `src/data/personalInfo.ts` when ready.
2. **Uploading Certificates**: Drop PDF certificates into `public/certificates/` and add the entry to `src/data/hackathons.ts`.
3. **Live Demo URLs**: Whenever you deploy a project to Vercel/Netlify, set its `demoUrl` in `src/data/projects.ts` to automatically reveal the Live Demo button.

## 🌐 Deploy to Vercel

This repository is ready for one-click deployment on [Vercel](https://vercel.com):
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

© 2026 Tejamurthy M. All rights reserved.
