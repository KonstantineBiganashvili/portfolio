# biganashvili.dev — Interactive 3D Portfolio

> **Live Portfolio**: [https://biganashvili.dev](https://biganashvili.dev)

## 🚀 About Me

**Software Engineer & DevOps Engineer** with 6+ years in tech, specializing in modern web applications and cloud infrastructure. I hold dual master's degrees in Computer Science and DevOps Engineering, with 3+ years of hands-on experience building scalable applications using Next.js, React, and NestJS, plus extensive experience managing AWS and GCP environments.

**Current Focus**: Creating visually stunning, highly performant applications that bridge the gap between design and functionality.

**Location**: Tbilisi, Georgia  
**Contact**: [contact@biganashvili.dev](mailto:contact@biganashvili.dev)

## 🛠️ Tech Stack

### Frontend & UI

- **Framework**: Next.js 15.1.6 (App Router)
- **UI Library**: React 19
- **Styling**: CSS Modules with CSS custom properties
- **Animations**: GSAP with ScrollTrigger
- **Icons**: Lucide React

### 3D Graphics & WebGL

- **3D Rendering**: Three.js via `@react-three/fiber`
- **3D Utilities**: `@react-three/drei`, `@react-three/postprocessing`
- **Custom Shaders**: GLSL with `three-custom-shader-material`

### Development & Tooling

- **Language**: TypeScript 5
- **Build Tool**: Turbopack (Next.js)
- **Linting**: ESLint 9
- **Package Manager**: npm

### External Services

- **Calendar Integration**: Calendly (react-calendly)
- **Contact Forms**: FormSubmit.co
- **Utilities**: react-use, clsx

## 📋 Features

### 🌟 Core Portfolio Sections

- **Interactive Introduction**: Dynamic hero section with animated elements
- **About Me**: Professional background, skills showcase, and highlight cards
- **Recent Works**: Curated project showcase with detailed descriptions
- **Journey Timeline**: Interactive scroll-triggered timeline with UFO animations
- **Contact Section**: Multiple contact methods with availability status

### 🎨 3D Graphics & Animations

- **Animated Liquid Sphere**: Dynamic 3D sphere with fluid motion and interactive lighting
- **Procedural Starfield**: Custom star generation with animated brightness and colors
- **Custom Shaders**: GLSL shaders for ocean effects and stellar animations

### 🔧 Technical Features

- **Theme System**: Coordinated theming across 3D scenes and UI components
- **Responsive Design**: Optimized for desktop, tablet, and mobile experiences
- **Performance Optimized**: Efficient WebGL usage and memory management
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Contact Integration**: Contact forms, Calendly scheduling, and resume download

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout with theme providers
│   └── page.tsx                 # Home page component
├── components/
│   ├── AppShell/                # Application shell components
│   │   ├── Header/              # Navigation header
│   │   ├── Footer/              # Site footer
│   │   ├── LayoutClient.tsx     # Client-side layout wrapper
│   │   └── ProjectModal/        # Project details modal
│   ├── Landing/                 # Main portfolio sections
│   │   ├── Introduction/        # Hero section
│   │   ├── AboutMe/             # About section with skills
│   │   ├── RecentWorks/         # Project showcase
│   │   ├── MyJourney/           # Animated timeline
│   │   ├── ContactMe/           # Contact section with forms
│   │   └── Scene/               # 3D scene components
│   │       └── MainCanvas/      # Primary 3D canvas
│   │           ├── LiquidSphere/ # Animated sphere
│   │           ├── Skybox/      # HDR skybox
│   │           └── Stars/       # Procedural starfield
│   └── common/                  # Reusable UI components
│       ├── Badge/               # Skill badges
│       ├── ContactButton/       # Contact action buttons
│       ├── Modal/               # Modal wrapper
│       ├── Progress/            # Progress indicators
│       ├── ThemeSwitch/         # Theme toggle
│       └── svgs/                # Custom SVG components
├── constants/                   # Static data and configuration
│   ├── aboutMe.ts              # Skills and highlights data
│   ├── journey.ts              # Timeline data
│   ├── projects.ts             # Portfolio projects
│   └── introduction.ts         # Hero section content
├── contexts/                   # React Context providers
│   ├── ThemeContext.tsx        # Theme state management
│   └── SkyboxContext.tsx       # 3D scene state
├── hooks/                      # Custom React hooks
│   └── useThemeCSS.ts         # Theme CSS variable management
├── shaders/                    # GLSL shader code
│   ├── ocean/                  # Ocean surface shaders
│   └── stars/                  # Starfield shaders
├── styles/                     # Global stylesheets
│   └── theme.css              # CSS custom properties
├── types/                      # TypeScript definitions
│   ├── theme.ts               # Theme types
│   └── stars.ts               # 3D scene types
└── utils/                      # Utility functions
    ├── cameraUtils.ts         # 3D camera helpers
    ├── cssVariables.ts        # CSS variable utilities
    └── stars.ts               # Star generation utilities
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18+ (20+ recommended)
- **npm**: Latest version

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KonstantineBiganashvili/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📞 Contact & Availability

### Available For

- ✅ Full-time Software Engineering roles
- ✅ Full-time DevOps Engineering positions
- ✅ Freelance/Contract projects
- ✅ Technical consulting

### Get In Touch

- **Email**: [contact@biganashvili.dev](mailto:contact@biganashvili.dev)
- **Schedule a Call**: [Calendly](https://calendly.com/konstantine-biganashvili/30min)
- **LinkedIn**: [Konstantine Biganashvili](https://www.linkedin.com/in/konstantine-biganashvili-553a20246/)
- **GitHub**: [KonstantineBiganashvili](https://github.com/KonstantineBiganashvili)

## ⚡ Performance Features

- **WebGL Optimization**: Efficient shader usage and custom materials
- **Animation Performance**: 60fps scroll-triggered animations with GSAP
- **Memory Management**: Proper cleanup of Three.js resources
- **Responsive Loading**: Progressive enhancement for mobile devices
- **Code Splitting**: Optimized bundle sizes with Next.js

## 🎯 Development Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Create production build
npm start        # Run production server
npm run lint     # Run ESLint checks
```