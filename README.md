# Aarti Krishan Khatri — 3D Interactive Portfolio

An immersive 3D portfolio built with React Three Fiber, featuring a floating island workspace with interactive objects.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Deploy to Vercel

```bash
npm run build
```

Push to GitHub and Vercel will auto-deploy from the `dist/` folder. Make sure your Vercel project settings use:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Framework Preset:** Vite

## Tech Stack

- **React** + **Vite** — fast dev and build
- **React Three Fiber** — React renderer for Three.js
- **@react-three/drei** — helpful 3D primitives (OrbitControls, Float, Html, Stars)
- **Framer Motion** — smooth panel animations and transitions
- **GSAP** — camera animations on entry
- **Three.js** — 3D engine

## Structure

```
src/
  main.jsx              Entry point
  App.jsx               App shell (loading → intro → 3D scene)
  index.css             All styles
  components/
    Scene.jsx           Main 3D scene (lights, controls, floating rings)
    FloatingIsland.jsx  Procedural island geometry + grass + rocks
    DeskObjects.jsx     Interactive objects (laptop, coffee, books, trophy, etc.)
    CoffeeParticles.jsx Ambient particle system
    WarmFog.jsx         Volumetric cloud spheres
    HUD.jsx             Navigation overlay
    InfoPanel.jsx       Content panels (about, projects, experience, etc.)
    LoadingScreen.jsx   Loading animation
    IntroOverlay.jsx    "Enter Portfolio" splash
  data/
    portfolio.js        All portfolio content (edit this to update info)
public/
  assets/               Images, PDFs, resume
```
