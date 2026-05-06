# Aarti Krishan Khatri — Personal Portfolio

A fully custom static portfolio site built with plain HTML, CSS, and JavaScript — no build tools, no frameworks, no npm. Designed with a coffee/espresso aesthetic, immersive 3D canvas animation, depth-layered hero section, and scroll-driven interactions.

## Stack

- `index.html` — page structure and semantic markup
- `styles.css` — design system, responsive layout, all animations
- `portfolio-data.js` — all personal content (name, links, projects, experience, skills) in one place
- `script.js` — rendering, 3D canvas, all interactive behaviors

## Features

### 3D & Canvas
- **Dual icosahedra** — large rotating wireframe (primary) + smaller ambient secondary, both mouse-reactive with amber gradient edges
- **Floating 3D rings** — three tilted ambient rings orbiting at screen-anchored positions, each spinning on its own axis with Z-drift breathing
- **Constellation network** — stars connect with lines when nearby, forming a living mesh across the canvas
- **Steam wisps** — warm cream particles rising from the bottom of the canvas
- **Hero depth scene** — portrait at `Z = 60px`, text content at `Z = 16px` inside a `perspective: 1300px` container, creating genuine binocular parallax on mouse move

### Animations & Interactions
- **Section perspective entrances** — every section rotates in from `rotateX(-16deg) scale(0.95)`, like 3D planes tipping up toward the viewer on scroll
- **Card specular highlight** — project and stat cards show a mouse-tracked radial light blob (`::after` with CSS variable `--mx`/`--my`) at ±18° tilt and `translateZ(28px)`
- **Hero stagger entrance** — each hero element cascades in with offset delays
- **Animated counters** — numeric stats count up on first scroll into view
- **Magnetic buttons** — primary buttons pull toward the cursor
- **Typewriter tagline** — hero role cycles through options with a blinking cursor
- **Hero scroll scale** — hero section gently shrinks as you scroll past it

### Navigation & UX
- **Scrollspy nav** — active section highlighted in the navigation bar
- **Scroll progress bar** — amber gradient bar across the top of the viewport
- **Dark / light theme** — espresso dark / café latte light, persisted to localStorage with 400ms transitions
- **Copy-to-clipboard email** — clicking the email button copies the address and shows a toast
- **Timeline expand/collapse** — long descriptions truncated with read-more toggle
- **Skill filter tabs** — filter skills by category (Languages / Libraries / Tools)

### Visual Polish
- **Film grain texture** — animated SVG `feTurbulence` overlay for warmth and texture
- **Coffee-themed geometry** — floating rings, bean shape, hex, squares, and diamond with amber animations
- **Section heading accent lines** — 42px amber gradient underline on every section title
- **Warm ambient body glow** — radial gradient light source at the top of the page
- **Background orb parallax** — three colored orbs drift at different speeds on scroll

## Personalizing

Edit `portfolio-data.js` — it is the single source of truth for all content:

- `hero` — name, tagline, GitHub and resume links
- `photo` — profile image path
- `about` — bio paragraphs
- `education` / `experience` — timeline entries
- `projects` — project cards (supports `tag`, `stack`, `githubUrl`, `liveUrl`, `extraLinks`)
- `skills` / `coursework` — chip lists
- `awards` — award list
- `bmes` — conference section (poster, abstract, highlights)
- `links` / `contact` — social links and email

To add a profile photo, place it at `assets/profile.jpg` and set `photo.src` in `portfolio-data.js`.

## Local Development

```bash
python -m http.server 3000
# open http://localhost:3000
```

No build step required.

## Deploying

Deployed via **Vercel** — push to `main` and the site updates automatically within ~60 seconds.
