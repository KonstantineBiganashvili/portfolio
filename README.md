> Note: This portfolio is a work in progress.

### biganashvili.dev — Interactive 3D Portfolio

Personal portfolio featuring immersive 3D scenes and interactive timeline animations. Experience an animated liquid sphere with dynamic lighting, day/night sky transitions (sun/moon), procedural starfields, and an animated journey timeline with UFO trail effects. All powered by WebGL, custom shaders, and GSAP animations.

Visit: `https://biganashvili.dev`

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19
- **3D/Rendering**: three.js via `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Spring Physics**: `@react-spring/three` for fluid animations
- **Animations**: GSAP with ScrollTrigger for timeline interactions
- **Shaders/GLSL**: Custom materials and utility libs (`gl-noise`, `three-stdlib`, `three-custom-shader-material`)
- **Styling**: CSS Modules with CSS custom properties for theming
- **Dev Tooling**: TypeScript, ESLint, Turbopack

### Getting Started

Prerequisites: Node.js 18+ (or 20+ recommended) and npm.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Features

- **Animated Liquid Sphere**: Dynamic 3D sphere with fluid motion and interactive lighting
- **Dynamic Sky System**: Seamless day/night transitions with sun/moon positioning
- **Animated Timeline**: Scroll-triggered journey timeline with UFO animation and trail effects
- **Procedural Starfield**: Custom star generation with animated brightness and colors
- **Theme Context**: Coordinated theming across 3D scenes and UI components
- **Responsive Design**: Optimized for desktop and mobile experiences

### Project Structure

- `src/app` — Next.js app entry, routing, layout
- `src/components/Landing/Scene/MainCanvas` — Primary 3D scene (liquid sphere, skybox, stars)
- `src/components/Landing/Scene/ThemeCanvas` — Sun/moon theme elements
- `src/components/Landing/MyJourney` — Interactive timeline with UFO animations
- `src/components/common/svgs` — Reusable SVG components (UFO, Dolphin, etc.)
- `src/contexts` — React contexts for theme and skybox state management
- `src/shaders` — GLSL shader modules for stars and effects
- `src/hooks` — Custom hooks for theme CSS variables and utilities
- `public/static` — 3D models (sun/moon `.glb`), textures, and HDR skybox assets

### Scripts

- `dev`: start dev server (Turbopack)
- `build`: production build
- `start`: run production server
- `lint`: run ESLint

### Performance

- **WebGL Optimization**: Efficient shader usage and custom materials
- **Spring Animations**: Smooth fluid motion with @react-spring/three
- **Animation Performance**: GSAP for smooth 60fps scroll-triggered animations
- **Memory Management**: Proper cleanup of Three.js resources

### Credits

**3D Models:**

- Sun by Poly by Google [CC-BY] via [Poly Pizza](https://poly.pizza/m/77wHkzwlpOq)
- Moon by Poly by Google [CC-BY] via [Poly Pizza](https://poly.pizza/m/63c8LKpoXTO)

**SVG Icons:**

- UFO icon from [SVG Repo](https://www.svgrepo.com/) (converted to React component)
- Dolphin icon from [SVG Repo](https://www.svgrepo.com/) (converted to React component)

All assets are used under their respective licenses. Please refer to the original sources above.
