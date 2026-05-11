# Aarti Krishan Khatri — Portfolio

A clean, scroll-based personal portfolio built with React and Vite. Features smooth Framer Motion animations, an interactive particle background, and a dark/light theme toggle.

## Live Site

https://aarti-khatri.vercel.app/

## Tech Stack

| Tool | Purpose |
|---|---|
| React + Vite | Component framework and build tool |
| Framer Motion | Scroll-triggered section animations |
| Canvas API | Interactive particle background |

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── main.jsx                    Entry point
├── App.jsx                     App shell — theme state, section order, footer
├── index.css                   Global styles and dark/light CSS variables
├── data/
│   └── portfolio.js            All content lives here — edit to update anything
└── components/
    ├── Navbar.jsx              Fixed nav with theme toggle and mobile menu
    ├── Hero.jsx                Name, tagline, and CTA buttons
    ├── About.jsx               Bio and stat cards (GPA, role, location)
    ├── Highlights.jsx          Quick-glance highlight cards
    ├── Experience.jsx          Vertical timeline with impact badges
    ├── Projects.jsx            Card grid with color-coded tech accents
    ├── Skills.jsx              Icon-based skill cards by category
    ├── Education.jsx           Degree, honors, and coursework
    ├── Conference.jsx          BMES 2025 research presentation
    ├── Contact.jsx             GitHub, LinkedIn, and email links
    ├── ParticleBackground.jsx  Animated canvas particle system
    └── Icons.jsx               Inline SVG icon library

public/
└── assets/
    ├── profile.jpg             Profile photo
    └── docs/                   Resume, BMES poster, project reports
```

## Customization

**Content** — edit `src/data/portfolio.js`. All text, links, dates, and descriptions are centralized there.

**Colors** — CSS variables in `src/index.css` under `:root` (dark theme) and `[data-theme="light"]`.

**Sections** — add, remove, or reorder sections in `src/App.jsx`.
