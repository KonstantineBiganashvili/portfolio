> Note: This portfolio is a work in progress.

### biganashvili.dev — 3D Portfolio

Personal portfolio showcasing interactive 3D scenes on the web: animated ocean, boats, dynamic sky (sun/moon), and starfields powered by WebGL and shaders. Built with Next.js and React Three Fiber.

Visit: `https://biganashvili.dev`

### Tech Stack

- **Framework**: Next.js (App Router)
- **UI**: React 19
- **3D/Rendering**: three.js via `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Physics**: `@react-three/rapier`
- **Shaders/GLSL**: custom materials and utility libs (`gl-noise`, `three-stdlib`, `three-custom-shader-material`)
- **Dev tooling**: TypeScript, ESLint

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

### Project Structure

- `src/app` — Next.js app entry, routing, layout
- `src/components/Landing/Scene/MainCanvas` — primary 3D scene (ocean, skybox, boats, stars)
- `src/components/Landing/Scene/ThemeCanvas` — sun/moon theme elements
- `src/shaders` — GLSL shader modules for ocean and stars
- `public/static` — models (`.glb`), textures (e.g., ocean normals), and HDR skybox

### Scripts

- `dev`: start dev server (Turbopack)
- `build`: production build
- `start`: run production server
- `lint`: run ESLint

### Credits

- Sun by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/77wHkzwlpOq)
- Moon by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/63c8LKpoXTO)
- Ship by Kenney (https://poly.pizza/m/SPxFN3Oazd)
- Boat by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/1ZuSXvhkRg_)
- Boat by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/84-DYhLzxNq)
- Boat by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/c2SYxaiPfF3)
- Cruiseship by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/7j5X_ALVzlk)

3D assets are used under their respective licenses. Please refer to the original sources above.