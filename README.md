# Aarti Krishan Khatri — Portfolio

A professional, scroll-based portfolio with dynamic animations, an interactive particle background, and light/dark theme support.

## Live Site

<!-- Add your Vercel link here after deployment -->

## Tech Stack

- **React** + **Vite**
- **Framer Motion** — scroll-triggered section animations
- **Canvas API** — interactive particle background

## Structure

```
src/
  main.jsx              Entry point
  App.jsx               App shell (theme state, navbar, sections, footer)
  index.css             Stylesheet (dark + light theme variables)
  components/
    Navbar.jsx          Fixed navbar with theme toggle and mobile menu
    Hero.jsx            Profile photo, name, tagline, action buttons
    About.jsx           Bio + stat cards (GPA, role, location, graduation)
    Experience.jsx      Vertical timeline with impact badges
    Projects.jsx        2-column card grid with color-coded accents
    Skills.jsx          Icon-based skill cards grouped by category
    Conference.jsx      BMES 2025 research presentation
    Education.jsx       Degree, awards, coursework
    Contact.jsx         GitHub, LinkedIn, email links
    ParticleBackground.jsx  Animated particle system (theme-aware)
    Icons.jsx           Inline SVG icons
  data/
    portfolio.js        All portfolio content (edit to update)
assets/                 ← gitignored (local only)
  profile.jpg           Profile photo
  docs/                 Resume, BMES poster, project reports
```

## Customization

All content lives in `src/data/portfolio.js`. Edit that file to update experiences, projects, skills, etc.

Colors are controlled by CSS variables in `src/index.css` under `:root` (dark) and `[data-theme="light"]`.
