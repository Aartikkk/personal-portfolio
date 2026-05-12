# Aarti Krishan Khatri — Portfolio

A personal portfolio with a warm, editorial aesthetic. Built with React and Vite, featuring orchestrated Framer Motion animations, a bento-grid project layout, and a dark/light theme toggle.

## Live Site

https://aarti-khatri.vercel.app/

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + Vite 5 | Component framework and build tool |
| Framer Motion | Orchestrated entrance animations, clip-path reveals, perspective tilt |
| Fraunces + Outfit + JetBrains Mono | Typography via Google Fonts |

## Design

The site uses a warm charcoal and cream palette with burnt orange, sage green, and gold accents. Background texture comes from an SVG noise grain filter and radial glows rather than canvas particles. Animations are scroll-triggered and orchestrated per section — word-by-word hero reveal, clip-path wipes on headings, staggered card entrances, and mouse-tracking 3D tilt on project cards.

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
├── index.css                   Global styles, dark/light CSS variables, responsive
├── data/
│   └── portfolio.js            All content — edit to update anything
└── components/
    ├── Navbar.jsx              Fixed nav with theme toggle and mobile menu
    ├── Hero.jsx                Asymmetric grid with word-by-word reveal and SVG underline
    ├── About.jsx               Bio and stat cards (GPA, role, location)
    ├── Highlights.jsx          Scrolling tech marquee strip
    ├── Experience.jsx          Horizontal scroll cards with impact stats
    ├── Projects.jsx            Bento grid with featured card and 3D tilt hover
    ├── Skills.jsx              Three-column layout with accent borders
    ├── Education.jsx           Degree, honors, and coursework chips
    ├── Conference.jsx          BMES 2025 research presentation
    ├── Contact.jsx             GitHub, LinkedIn, and email links
    ├── SectionHeading.jsx      Reusable clip-path wipe-in heading component
    ├── ParticleBackground.jsx  SVG grain filter + radial glow layers
    └── Icons.jsx               Inline SVG icon library

public/
└── assets/
    ├── profile.jpg             Profile photo
    └── docs/                   Resume, BMES poster, project reports
```

## Customization

**Content** — edit `src/data/portfolio.js`. All text, links, dates, and descriptions are centralized there.

**Colors** — CSS variables in `src/index.css` under `:root` (dark) and `[data-theme="light"]`. The palette uses warm earth tones: burnt orange (`--accent-violet`), warm tan (`--accent-purple`), sage green (`--accent-green`), terra cotta (`--accent-pink`), and gold (`--accent-gold`).

**Sections** — add, remove, or reorder sections in `src/App.jsx`.
