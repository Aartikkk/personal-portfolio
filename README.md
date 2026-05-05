# Aarti Krishan Khatri — Personal Portfolio

A fully custom static portfolio site built with plain HTML, CSS, and JavaScript — no build tools, no frameworks, no npm. Designed with a dark/light glassmorphism aesthetic, 3D canvas animation, and smooth scroll-driven interactions.

## Stack

- `index.html` — page structure and semantic markup
- `styles.css` — design system, responsive layout, all animations
- `portfolio-data.js` — all personal content (name, links, projects, experience, skills) in one place
- `script.js` — rendering, 3D canvas, all interactive behaviors

## Features

- **3D icosahedron** — rotating wireframe with mouse-reactive tilt and constellation particle network
- **Particle constellation** — stars connect with lines when nearby, forming a living mesh
- **Floating geometry** — fixed decorative shapes (hex, rings, squares, diamond) with independent animations
- **Hero stagger entrance** — each element of the hero cascades in with offset delays
- **Animated counters** — numeric stats count up on first scroll into view
- **Magnetic buttons** — primary buttons pull toward the cursor
- **Scroll parallax** — background orbs drift at different speeds as you scroll
- **3D card tilt** — project and stat cards tilt toward the mouse in real time
- **Skill filter** — tabs filter skills by category (Languages / Libraries / Tools)
- **Typewriter tagline** — hero role cycles through options with a blinking cursor
- **Scrollspy nav** — active section highlighted in the navigation bar
- **Dark / light theme** — persisted to localStorage, smooth 400ms transition
- **Scroll progress bar** — gradient bar across the top of the viewport
- **Copy-to-clipboard email** — click email button copies address and shows a toast
- **Timeline expand/collapse** — long descriptions truncated with read-more toggle
- **Responsive** — works from 320px mobile to wide desktop

## Personalizing

Edit `portfolio-data.js` — it is the single source of truth for all content:

- `hero` — name, tagline, GitHub and resume links
- `photo` — profile image path
- `about` — bio paragraphs
- `education` / `experience` — timeline entries
- `projects` / `githubProjects` — project cards and repo cards
- `skills` / `coursework` — chip lists
- `awards` — award list
- `bmes` — conference section (poster, abstract, highlights)
- `links` / `contact` — social links and email

To add a profile photo, place it at `assets/profile.jpg` and set `photo.src` in `portfolio-data.js`.

## Deploying

1. Push this repository to GitHub.
2. Go to **Settings → Pages** in the repo.
3. Set source to `main` branch, root folder.
4. GitHub Pages will publish the site at `https://<username>.github.io/<repo>`.
