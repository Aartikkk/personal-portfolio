/* ── HELPERS ── */
const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el && value) el.textContent = value;
};

const setLink = (id, href, label) => {
  const el = document.getElementById(id);
  if (el && href) el.href = href;
  if (el && label) el.textContent = label;
};

/* ── SKILL CATEGORY MAP ── */
const LANG_SKILLS = new Set([
  "Python", "Java", "C", "C++", "SQL", "R", "C#", "JavaScript"
]);
const TOOL_SKILLS = new Set([
  "GitHub", "Git", "Power BI", "JupyterLab", "VS Code", "R Studio",
  "Google Colab", "Opentrons OT-2", "Microsoft Excel"
]);

function skillCat(name) {
  if (LANG_SKILLS.has(name)) return "lang";
  if (TOOL_SKILLS.has(name)) return "tool";
  return "lib";
}

/* ── RENDER ── */
const renderPortfolio = () => {
  if (typeof portfolioData === "undefined") return;

  document.title = portfolioData.siteTitle;

  const brand = document.querySelector(".brand");
  if (brand) brand.textContent = portfolioData.brandName;

  setText("hero-status", portfolioData.hero.status);
  setText("hero-name", portfolioData.hero.name);
  setText("hero-tagline", portfolioData.hero.tagline);
  setText("hero-description", portfolioData.hero.description);
  setLink("hero-github-link", portfolioData.hero.githubUrl, "View GitHub");

  const resumeUrl = portfolioData.hero.resumeUrl;
  ["hero-resume-link", "resume-cta-link"].forEach((id) => {
    const el = document.getElementById(id);
    if (el && resumeUrl) el.href = resumeUrl;
  });

  setText("focus-title", portfolioData.focus.title);
  setText("profile-gpa", portfolioData.profile.gpa);
  setText("profile-role", portfolioData.profile.currentRole);
  setText("profile-grad", portfolioData.profile.expectedGraduation);
  setText("bmes-title", portfolioData.bmes.title);
  setText("bmes-event", portfolioData.bmes.event);
  setText("bmes-summary", portfolioData.bmes.summary);
  setText("bmes-abstract-text", portfolioData.bmes.abstract);

  const portraitFrame = document.getElementById("portrait-frame");
  const profilePhoto = document.getElementById("profile-photo");
  if (portraitFrame && profilePhoto && portfolioData.photo?.src) {
    profilePhoto.src = portfolioData.photo.src;
    profilePhoto.alt = portfolioData.photo.alt || "";
    profilePhoto.addEventListener("load", () => {
      portraitFrame.classList.add("has-image");
    });
  }

  const posterLink = document.getElementById("poster-preview-link");
  const posterImg = document.getElementById("poster-preview-image");
  if (posterLink && posterImg && portfolioData.bmes?.previewImage) {
    posterLink.href = portfolioData.bmes.posterUrl;
    posterImg.src = portfolioData.bmes.previewImage;
  }

  const focusList = document.getElementById("focus-list");
  if (focusList) {
    focusList.innerHTML = portfolioData.focus.items
      .map((item) => `<li>${item}</li>`)
      .join("");
  }

  const aboutGrid = document.getElementById("about-grid");
  if (aboutGrid) {
    aboutGrid.innerHTML = portfolioData.about
      .map((item) => `<p>${item}</p>`)
      .join("");
  }

  const skillList = document.getElementById("skill-list");
  if (skillList) {
    skillList.innerHTML = portfolioData.skills
      .map((s) => `<span data-cat="${skillCat(s)}">${s}</span>`)
      .join("");
  }

  const courseworkList = document.getElementById("coursework-list");
  if (courseworkList) {
    courseworkList.innerHTML = portfolioData.coursework
      .map((c) => `<span>${c}</span>`)
      .join("");
  }

  const projectGrid = document.getElementById("project-grid");
  if (projectGrid) {
    projectGrid.innerHTML = portfolioData.projects
      .map(
        (p) => `
        <article class="project-card">
          <div class="project-card-header">
            <p class="project-tag">${p.tag}</p>
            <h3>${p.title}</h3>
          </div>
          <div class="project-card-body">
            <p>${p.description}</p>
            <div class="project-stack">
              ${p.stack.map((t) => `<span>${t}</span>`).join("")}
            </div>
            <div class="project-actions">
              ${p.liveUrl && p.liveUrl !== "#"
                ? `<a class="button button-secondary" href="${p.liveUrl}" target="_blank" rel="noreferrer">Live Demo</a>`
                : ""}
              ${p.githubUrl
                ? `<a class="button button-primary" href="${p.githubUrl}" target="_blank" rel="noreferrer">GitHub</a>`
                : ""}
            </div>
            ${p.note ? `<p class="project-note">${p.note}</p>` : ""}
          </div>
        </article>`
      )
      .join("");
  }

  const educationList = document.getElementById("education-list");
  if (educationList) {
    educationList.innerHTML = portfolioData.education
      .map(
        (item) => `
        <article class="timeline-item">
          <div class="timeline-period">${item.period}</div>
          <div>
            <h3>${item.school}</h3>
            <h4>${item.title}</h4>
            <p>${item.detail}</p>
          </div>
        </article>`
      )
      .join("");
  }

  const experienceList = document.getElementById("experience-list");
  if (experienceList) {
    experienceList.innerHTML = portfolioData.experience
      .map(
        (item) => `
        <article class="timeline-item">
          <div class="timeline-period">${item.period}</div>
          <div>
            <h3>${item.role}</h3>
            <h4>${item.organization}</h4>
            <p>${item.detail}</p>
          </div>
        </article>`
      )
      .join("");
  }

  const linkGrid = document.getElementById("link-grid");
  if (linkGrid) {
    linkGrid.innerHTML = portfolioData.links
      .map(
        (link) => `
        <a class="link-card" href="${link.url}" target="_blank" rel="noreferrer">
          <p class="project-tag">${link.label}</p>
          <h3>${link.value}</h3>
        </a>`
      )
      .join("");
  }

  const awardList = document.getElementById("award-list");
  if (awardList) {
    awardList.innerHTML = portfolioData.awards
      .map((a) => `<article class="award-item">${a}</article>`)
      .join("");
  }

  const bmesActions = document.getElementById("bmes-actions");
  if (bmesActions) {
    bmesActions.innerHTML = `
      <a class="bmes-action" href="${portfolioData.bmes.posterUrl}" target="_blank" rel="noreferrer">
        <p class="section-kicker">Poster</p>
        <h3>${portfolioData.bmes.posterLabel}</h3>
        <p>Open the poster PDF in the browser or download it.</p>
      </a>
      <a class="bmes-action" href="${portfolioData.bmes.abstractUrl}">
        <p class="section-kicker">Abstract</p>
        <h3>${portfolioData.bmes.abstractLabel}</h3>
        <p>Read the abstract for this research presentation.</p>
      </a>`;
  }

  const bmesHighlights = document.getElementById("bmes-highlights");
  if (bmesHighlights) {
    bmesHighlights.innerHTML = portfolioData.bmes.highlights
      .map((item) => `<article class="bmes-highlight">${item}</article>`)
      .join("");
  }

  const repoGrid = document.getElementById("repo-grid");
  if (repoGrid) {
    repoGrid.innerHTML = portfolioData.githubProjects
      .map(
        (repo) => `
        <a class="repo-card" href="${repo.url}" target="_blank" rel="noreferrer">
          <p class="section-kicker">GitHub Repository</p>
          <h3>${repo.name}</h3>
          <p>${repo.summary}</p>
          <span class="repo-meta">${repo.language}</span>
          ${repo.extraLinks?.length
            ? `<div class="project-actions">${repo.extraLinks
                .map((l) => `<span class="button button-secondary repo-link-chip" data-href="${l.url}">${l.label}</span>`)
                .join("")}</div>`
            : ""}
        </a>`
      )
      .join("");
  }

  setText("contact-text", portfolioData.contact.text);
  setLink("email-link", `mailto:${portfolioData.contact.email}`, "Email Me");
};

renderPortfolio();

/* ── THEME SYSTEM ── */
function initTheme() {
  const html = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  const saved = localStorage.getItem("portfolio-theme");
  if (saved) html.dataset.theme = saved;

  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const next = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
  });
}

/* ── 3D ICOSAHEDRON CANVAS ── */
function initCanvas3D() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H;
  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  // Icosahedron: 12 vertices, 30 edges
  const PHI = (1 + Math.sqrt(5)) / 2;
  const SCALE = 170;
  const rawV = [
    [0,1,PHI],[0,-1,PHI],[0,1,-PHI],[0,-1,-PHI],
    [1,PHI,0],[-1,PHI,0],[1,-PHI,0],[-1,-PHI,0],
    [PHI,0,1],[-PHI,0,1],[PHI,0,-1],[-PHI,0,-1],
  ];
  const verts = rawV.map(([x,y,z]) => {
    const len = Math.sqrt(x*x+y*y+z*z);
    return [x/len*SCALE, y/len*SCALE, z/len*SCALE];
  });
  const edges = [
    [0,1],[0,4],[0,5],[0,8],[0,9],
    [1,6],[1,7],[1,8],[1,9],
    [2,3],[2,4],[2,5],[2,10],[2,11],
    [3,6],[3,7],[3,10],[3,11],
    [4,5],[4,8],[4,10],
    [5,9],[5,11],
    [6,7],[6,8],[6,10],
    [7,9],[7,11],
    [8,10],[9,11],
  ];

  // Starfield
  const N = 190;
  const stars = Array.from({ length: N }, () => ({
    x: (Math.random() - 0.5) * 1800,
    y: (Math.random() - 0.5) * 1400,
    z: Math.random() * 1000,
    speed: Math.random() * 0.7 + 0.2,
  }));

  let rotX = 0, rotY = 0, tgtX = 0, tgtY = 0, t = 0;

  window.addEventListener("mousemove", (e) => {
    tgtX = (e.clientY / window.innerHeight - 0.5) * 0.7;
    tgtY = (e.clientX / window.innerWidth - 0.5) * 1.0;
  }, { passive: true });

  const ry = (v, a) => {
    const c = Math.cos(a), s = Math.sin(a);
    return [v[0]*c + v[2]*s, v[1], -v[0]*s + v[2]*c];
  };
  const rx = (v, a) => {
    const c = Math.cos(a), s = Math.sin(a);
    return [v[0], v[1]*c - v[2]*s, v[1]*s + v[2]*c];
  };
  const project = (v) => {
    const FL = 500;
    const z = v[2] + 550;
    const s = FL / z;
    return [W/2 + v[0]*s, H/2 + v[1]*s, s, z];
  };

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.004;
    rotX += (tgtX - rotX) * 0.04;
    rotY += (tgtY - rotY) * 0.04;

    const isDark = document.documentElement.dataset.theme !== "light";
    const starC  = isDark ? "155,135,255" : "80,60,160";
    const lineC  = isDark ? "124,111,224" : "80,60,180";
    const dotC   = isDark ? "140,120,255" : "80,60,180";
    const accentC = isDark ? "0,210,255" : "0,150,200";
    const starAlpha = isDark ? 0.6 : 0.28;
    const lineAlpha = isDark ? 0.55 : 0.28;

    // Draw starfield (particles flying toward viewer)
    for (const s of stars) {
      s.z -= s.speed;
      if (s.z <= 1) {
        s.z = 1000;
        s.x = (Math.random() - 0.5) * 1800;
        s.y = (Math.random() - 0.5) * 1400;
      }
      const FL = 500;
      const sc = FL / (s.z + 20);
      const sx = W/2 + s.x * sc;
      const sy = H/2 + s.y * sc;
      if (sx < -10 || sx > W+10 || sy < -10 || sy > H+10) continue;
      const size = Math.min(2.5, sc * 1.6);
      const a = (1 - s.z / 1000) * starAlpha;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.3, size), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${starC},${a})`;
      ctx.fill();
    }

    // Draw icosahedron
    const angleY = t * 0.35 + rotY;
    const angleX = t * 0.2 + rotX;
    const proj = verts.map(v => project(rx(ry(v, angleY), angleX)));

    ctx.lineWidth = 0.85;
    for (const [a, b] of edges) {
      const pa = proj[a], pb = proj[b];
      const avgZ = (pa[3] + pb[3]) / 2;
      const alpha = Math.max(0, (1 - avgZ / 740)) * lineAlpha;
      if (alpha < 0.01) continue;

      const g = ctx.createLinearGradient(pa[0], pa[1], pb[0], pb[1]);
      g.addColorStop(0, `rgba(${lineC},${alpha})`);
      g.addColorStop(0.5, `rgba(${accentC},${alpha * 0.7})`);
      g.addColorStop(1, `rgba(${lineC},${alpha})`);
      ctx.beginPath();
      ctx.strokeStyle = g;
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
      ctx.stroke();
    }

    // Icosahedron vertex dots
    for (const p of proj) {
      const size = Math.max(0.5, p[2] * 5);
      const alpha = Math.max(0.08, (1 - p[3] / 740)) * (isDark ? 0.9 : 0.55);
      ctx.beginPath();
      ctx.arc(p[0], p[1], size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dotC},${alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* ── 3D CARD TILT ── */
function initCardTilt() {
  const cards = document.querySelectorAll(".project-card, .stat-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 80ms ease-out, box-shadow 80ms ease-out";
    });

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rX = ((y - cy) / cy) * -7;
      const rY = ((x - cx) / cx) * 7;
      card.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 450ms cubic-bezier(0.16,1,0.3,1), box-shadow 450ms ease";
      card.style.transform = "";
    });
  });
}

/* ── SCROLL PROGRESS BAR ── */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = docH > 0 ? `${(scrollTop / docH) * 100}%` : "0%";
    },
    { passive: true }
  );
}

/* ── STAGGER ANIMATION ── */
function initStagger() {
  const staggerContainers = document.querySelectorAll(
    ".timeline, .award-list, .link-grid, .repo-grid, .project-grid, .skill-list"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const children = Array.from(entry.target.children);
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 70}ms`;
          child.classList.add("is-visible");
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  staggerContainers.forEach((el) => {
    Array.from(el.children).forEach((child) => {
      child.classList.add("stagger-child");
    });
    observer.observe(el);
  });
}

/* ── SECTION REVEAL ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".hero, .section").forEach((el) => {
  revealObserver.observe(el);
});

/* ── CURSOR GLOW ── */
const cursorGlow = document.querySelector(".cursor-glow");
if (cursorGlow) {
  window.addEventListener("pointermove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

/* ── REPO LINK CHIPS ── */
document.addEventListener("click", (e) => {
  const chip = e.target.closest(".repo-link-chip");
  if (chip) {
    e.preventDefault();
    e.stopPropagation();
    window.open(chip.dataset.href, "_blank", "noreferrer");
  }
});

/* ── INIT ── */
// Scripts at bottom of <body> run after HTML is fully parsed, so no need to wait
initTheme();
initCanvas3D();
initScrollProgress();
initCardTilt();
initStagger();
