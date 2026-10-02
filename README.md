# Aarti Krishan Khatri — Portfolio

A personal portfolio set like a research journal: paper and ink, one vermilion accent, oversized serif type, and structure shown through hairline rules, numbered sections, and ruled tables instead of cards. Built with React and Vite, with restrained Framer Motion reveals and a paper/ink theme toggle.

## Live Site

https://aarti-khatri.vercel.app/

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + Vite 5 | Component framework and build tool |
| Framer Motion | Heading slide-in, scroll reveals, project row expand (all respect `prefers-reduced-motion`) |
| Instrument Serif + Hanken Grotesk + IBM Plex Mono | Typography via Google Fonts |

## Design

- **Palette** — warm paper (`#f1ece2`) and near-black ink with a single vermilion accent. Dark mode ("Ink") inverts the same system. The theme follows the visitor's OS setting on first load and is remembered afterwards.
- **Type** — Instrument Serif for display and key figures, Hanken Grotesk for body text, IBM Plex Mono for labels, dates, and metadata.
- **Structure** — numbered sections (§ 01–07) on a 12-column grid, with a sticky section label on the left. No cards, shadows, glows, or background effects.
- **Content layout** — Experience is a ruled ledger with the measured result in the right-hand column; Projects is an expandable index; Skills and Education are typeset lists; the BMES poster is a framed figure.

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
├── index.css                   Design tokens, layout, dark theme, responsive rules
├── data/
│   └── portfolio.js            All content — edit to update anything
└── components/
    ├── Navbar.jsx              Fixed top bar, theme toggle, mobile menu
    ├── Hero.jsx                Oversized name, intro, headline metrics, photo figure
    ├── Section.jsx             Shared numbered section shell (§ label + title)
    ├── Reveal.jsx              Scroll-reveal wrapper (skipped for reduced motion)
    ├── About.jsx               Bio and fact list
    ├── Experience.jsx          Ruled ledger with a result column
    ├── Projects.jsx            Expandable project index
    ├── Skills.jsx              Typeset skill columns and domains
    ├── Conference.jsx          BMES 2025 poster figure, abstract, and results
    ├── Education.jsx           Degree, honors, and coursework
    └── Contact.jsx             Email and profile links

public/
└── assets/
    ├── profile.jpg             Profile photo
    └── docs/                   Resume, BMES poster, project reports
```

## Customization

**Content** — edit `src/data/portfolio.js`. All text, links, dates, and descriptions are centralized there. Each experience entry has a `metric` and `metricLabel` that appear in the ledger and the hero.

**Colors** — CSS variables at the top of `src/index.css` under `:root` (paper) and `[data-theme='dark']` (ink). `--accent` is the only accent colour.

**Sections** — add, remove, or reorder sections in `src/App.jsx`, and keep the `NAV_ITEMS` list in `Navbar.jsx` in sync.
