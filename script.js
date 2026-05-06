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
  if (brand) brand.textContent = portfolioData.brandName.split(" ")[0];

  setText("hero-status",      portfolioData.hero.status);
  setText("hero-name",        portfolioData.hero.name);
  setText("hero-tagline",     portfolioData.hero.tagline);
  setText("hero-description", portfolioData.hero.description);
  setLink("hero-github-link", portfolioData.hero.githubUrl, "View GitHub");

  const resumeUrl = portfolioData.hero.resumeUrl;
  ["hero-resume-link", "resume-cta-link"].forEach((id) => {
    const el = document.getElementById(id);
    if (el && resumeUrl) el.href = resumeUrl;
  });

  setText("profile-gpa",  portfolioData.profile.gpa);
  setText("profile-role", portfolioData.profile.currentRole);
  setText("profile-grad", portfolioData.profile.expectedGraduation);

  setText("bmes-title",         portfolioData.bmes.title);
  setText("bmes-event",         portfolioData.bmes.event);
  setText("bmes-summary",       portfolioData.bmes.summary);
  setText("bmes-abstract-text", portfolioData.bmes.abstract);

  const portraitFrame = document.getElementById("portrait-frame");
  const profilePhoto  = document.getElementById("profile-photo");
  if (portraitFrame && profilePhoto && portfolioData.photo?.src) {
    profilePhoto.src = portfolioData.photo.src;
    profilePhoto.alt = portfolioData.photo.alt || "";
    profilePhoto.addEventListener("load", () => {
      portraitFrame.classList.add("has-image");
    });
  }

  const posterLink = document.getElementById("poster-preview-link");
  const posterImg  = document.getElementById("poster-preview-image");
  if (posterLink && posterImg && portfolioData.bmes?.previewImage) {
    posterLink.href = portfolioData.bmes.posterUrl;
    posterImg.src   = portfolioData.bmes.previewImage;
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
              ${(p.extraLinks || []).map(l =>
                `<a class="button button-secondary" href="${l.url}" target="_blank" rel="noreferrer">${l.label}</a>`
              ).join("")}
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
  const html   = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const saved  = localStorage.getItem("portfolio-theme");
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
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    steamParticles = null;
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  const PHI   = (1 + Math.sqrt(5)) / 2;
  const SCALE = 245;
  const rawV  = [
    [0,1,PHI],[0,-1,PHI],[0,1,-PHI],[0,-1,-PHI],
    [1,PHI,0],[-1,PHI,0],[1,-PHI,0],[-1,-PHI,0],
    [PHI,0,1],[-PHI,0,1],[PHI,0,-1],[-PHI,0,-1],
  ];
  const verts = rawV.map(([x,y,z]) => {
    const len = Math.sqrt(x*x+y*y+z*z);
    return [x/len*SCALE, y/len*SCALE, z/len*SCALE];
  });
  const SCALE2 = 84;
  const verts2 = rawV.map(([x,y,z]) => {
    const len = Math.sqrt(x*x+y*y+z*z);
    return [x/len*SCALE2, y/len*SCALE2, z/len*SCALE2];
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

  const N     = 220;
  const stars = Array.from({ length: N }, () => ({
    x:     (Math.random() - 0.5) * 1800,
    y:     (Math.random() - 0.5) * 1400,
    z:     Math.random() * 1000,
    speed: Math.random() * 0.7 + 0.2,
  }));

  let rotX = 0, rotY = 0, tgtX = 0, tgtY = 0, t = 0;
  let steamParticles = null;

  function buildSteam() {
    steamParticles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: H * 0.55 + Math.random() * H * 0.45,
      vy: -(Math.random() * 0.55 + 0.22),
      phase: Math.random() * Math.PI * 2,
      life: Math.random(),
      size: Math.random() * 1.6 + 0.5,
    }));
  }

  window.addEventListener("mousemove", (e) => {
    tgtX = (e.clientY / window.innerHeight - 0.5) * 0.7;
    tgtY = (e.clientX / window.innerWidth  - 0.5) * 1.0;
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
    const FL = 500, z = v[2] + 550, s = FL / z;
    return [W/2 + v[0]*s, H/2 + v[1]*s, s, z];
  };

  // ── 3D FLOATING RINGS ─────────────────────────────────────────
  // Each ring is a tilted circle in screen-anchored 3D space.
  // sx/sy = screen anchor (fraction of W/H), r = world radius,
  // btx/bty = base tilt angles, ph = drift phase, spin = rotation speed
  const RING_SEGS = 72;
  const ringDefs = [
    { sx: 0.10, sy: 0.20, r: 148, btx:  0.58, bty:  0.32, ph: 0.0, spin:  0.00024 },
    { sx: 0.90, sy: 0.58, r: 118, btx: -0.40, bty:  0.65, ph: 2.1, spin: -0.00017 },
    { sx: 0.30, sy: 0.84, r:  90, btx:  0.22, bty: -0.48, ph: 4.3, spin:  0.00031 },
  ];
  // Pre-bake base tilt so draw() only applies spin + camera
  ringDefs.forEach(rd => {
    rd.verts = Array.from({ length: RING_SEGS }, (_, i) => {
      const θ = (i / RING_SEGS) * Math.PI * 2;
      let v = [Math.cos(θ) * rd.r, Math.sin(θ) * rd.r, 0];
      v = rx(v, rd.btx);
      v = ry(v, rd.bty);
      return v;
    });
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t    += 0.004;
    rotX += (tgtX - rotX) * 0.04;
    rotY += (tgtY - rotY) * 0.04;

    const isDark  = document.documentElement.dataset.theme !== "light";
    const starC   = isDark ? "220,185,130" : "140,80,20";
    const lineC   = isDark ? "196,134,52"  : "160,90,30";
    const dotC    = isDark ? "210,160,70"  : "140,80,20";
    const accentC = isDark ? "238,198,110" : "180,110,40";
    const sAlpha  = isDark ? 0.58 : 0.52;
    const lAlpha  = isDark ? 0.60 : 0.64;

    // Project all visible stars and cache screen coords
    const vis = [];
    for (const s of stars) {
      s.z -= s.speed;
      if (s.z <= 1) { s.z = 1000; s.x = (Math.random()-0.5)*1800; s.y = (Math.random()-0.5)*1400; }
      const sc = 500 / (s.z + 20);
      const sx = W/2 + s.x * sc, sy = H/2 + s.y * sc;
      if (sx < -10 || sx > W+10 || sy < -10 || sy > H+10) continue;
      vis.push({ x: sx, y: sy, size: Math.min(2.5, sc * 1.6), a: (1 - s.z / 1000) * sAlpha });
    }

    // Constellation: batch-draw lines between nearby particles
    const CONN_SQ = 115 * 115;
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = `rgba(${starC},${(0.20 * sAlpha).toFixed(3)})`;
    ctx.beginPath();
    for (let i = 0; i < vis.length; i++) {
      for (let j = i + 1; j < vis.length; j++) {
        const dx = vis[i].x - vis[j].x, dy = vis[i].y - vis[j].y;
        if (dx * dx + dy * dy > CONN_SQ) continue;
        ctx.moveTo(vis[i].x, vis[i].y);
        ctx.lineTo(vis[j].x, vis[j].y);
      }
    }
    ctx.stroke();

    // Star dots rendered on top of constellation lines
    for (const p of vis) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.3, p.size), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${starC},${p.a})`;
      ctx.fill();
    }

    // Steam wisps — warm cream particles rising from below
    if (!steamParticles) buildSteam();
    for (const p of steamParticles) {
      p.y += p.vy;
      p.x += Math.sin(t * 1.4 + p.phase) * 0.38;
      p.life += 0.0032;
      if (p.life >= 1 || p.y < -24) {
        p.y = H * 0.6 + Math.random() * H * 0.4;
        p.x = Math.random() * W;
        p.life = 0;
      }
      const sa = Math.sin(p.life * Math.PI) * (isDark ? 0.22 : 0.13);
      if (sa < 0.015) continue;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.4, p.size + p.life * 0.9), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,210,160,${sa.toFixed(3)})`;
      ctx.fill();
    }

    // ── Ambient 3D rings ──────────────────────────────────────────
    const rAlphaBase = isDark ? 0.115 : 0.085;
    for (const rd of ringDefs) {
      const spinA = t * rd.spin * Math.PI * 2;
      const drift  = Math.sin(t * 0.28 + rd.ph) * 34;
      const ax = W * rd.sx;
      const ay = H * rd.sy;

      ctx.beginPath();
      let first = true;
      let zSum = 0, zCount = 0;
      for (const v of rd.verts) {
        // Slow own spin + small camera coupling for parallax feel
        let p = ry(v, spinA + rotY * 0.14);
        p     = rx(p, spinA * 0.7 + rotX * 0.10);
        const z = p[2] + drift + 460;
        if (z < 5) { first = true; continue; }
        zSum += z; zCount++;
        const s  = 420 / z;
        const sx = ax + p[0] * s;
        const sy = ay + p[1] * s;
        if (first) { ctx.moveTo(sx, sy); first = false; }
        else        ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      const avgRZ   = zCount > 0 ? zSum / zCount : 460;
      const depthFade = Math.max(0, 1 - (avgRZ - 300) / 600);
      ctx.strokeStyle = `rgba(${lineC},${(rAlphaBase * depthFade).toFixed(3)})`;
      ctx.lineWidth   = isDark ? 0.9 : 1.15;
      ctx.stroke();
    }

    const angleY = t * 0.35 + rotY;
    const angleX = t * 0.20 + rotX;
    const proj   = verts.map((v) => project(rx(ry(v, angleY), angleX)));

    ctx.lineWidth = isDark ? 1.1 : 1.5;
    for (const [a, b] of edges) {
      const pa = proj[a], pb = proj[b];
      const avgZ  = (pa[3] + pb[3]) / 2;
      const alpha = Math.max(0, (1 - avgZ / 740)) * lAlpha;
      if (alpha < 0.01) continue;
      const g = ctx.createLinearGradient(pa[0], pa[1], pb[0], pb[1]);
      g.addColorStop(0,   `rgba(${lineC},${alpha})`);
      g.addColorStop(0.5, `rgba(${accentC},${isDark ? alpha * 0.7 : alpha * 0.92})`);
      g.addColorStop(1,   `rgba(${lineC},${alpha})`);
      ctx.beginPath();
      ctx.strokeStyle = g;
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
      ctx.stroke();
    }

    for (const p of proj) {
      const size  = Math.max(0.5, p[2] * (isDark ? 5 : 6.5));
      const alpha = Math.max(0.08, (1 - p[3] / 740)) * (isDark ? 0.9 : 0.85);
      ctx.beginPath();
      ctx.arc(p[0], p[1], size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dotC},${alpha})`;
      ctx.fill();
    }

    // Second smaller icosahedron — lower-right, reverse rotation, more ambient
    const ox2 = W * 0.76, oy2 = H * 0.70;
    const project2 = (v) => {
      const FL = 500, z = v[2] + 620, s = FL / z;
      return [ox2 + v[0]*s, oy2 + v[1]*s, s, z];
    };
    const aY2 = -t * 0.19 - rotY * 0.32;
    const aX2 =  t * 0.13 - rotX * 0.32;
    const proj2 = verts2.map((v) => project2(rx(ry(v, aY2), aX2)));

    ctx.lineWidth = isDark ? 0.65 : 0.9;
    for (const [a, b] of edges) {
      const pa = proj2[a], pb = proj2[b];
      const avgZ  = (pa[3] + pb[3]) / 2;
      const alpha = Math.max(0, (1 - avgZ / 740)) * lAlpha * 0.44;
      if (alpha < 0.01) continue;
      const g2 = ctx.createLinearGradient(pa[0], pa[1], pb[0], pb[1]);
      g2.addColorStop(0,   `rgba(${lineC},${alpha})`);
      g2.addColorStop(0.5, `rgba(${accentC},${isDark ? alpha*0.7 : alpha*0.92})`);
      g2.addColorStop(1,   `rgba(${lineC},${alpha})`);
      ctx.beginPath();
      ctx.strokeStyle = g2;
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
      ctx.stroke();
    }
    for (const p of proj2) {
      const size  = Math.max(0.3, p[2] * (isDark ? 3.5 : 4.5));
      const alpha = Math.max(0.05, (1 - p[3] / 740)) * (isDark ? 0.65 : 0.60);
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
      const x  = e.clientX - rect.left;
      const y  = e.clientY - rect.top;
      const rX = ((y - rect.height / 2) / (rect.height / 2)) * -18;
      const rY = ((x - rect.width  / 2) / (rect.width  / 2)) *  18;
      card.style.transform = `perspective(800px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(28px)`;
      // Specular highlight follows cursor like a real light source
      card.style.setProperty("--mx", `${(x / rect.width  * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(y / rect.height * 100).toFixed(1)}%`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms ease";
      card.style.transform  = "";
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
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
  const containers = document.querySelectorAll(
    ".timeline, .award-list, .link-grid, .repo-grid, .project-grid, .skill-list, .about-grid"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        Array.from(entry.target.children).forEach((child, i) => {
          child.style.transitionDelay = `${i * 70}ms`;
          child.classList.add("is-visible");
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  containers.forEach((el) => {
    Array.from(el.children).forEach((child) => child.classList.add("stagger-child"));
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
    cursorGlow.style.top  = `${e.clientY}px`;
  }, { passive: true });
}

/* ── SCROLLSPY ── */
function initScrollspy() {
  const navLinks   = document.querySelectorAll('.site-nav a[href^="#"]');
  const sectionMap = [];

  navLinks.forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) sectionMap.push({ el, link });
  });

  if (!sectionMap.length) return;

  function update() {
    const threshold = window.scrollY + window.innerHeight * 0.3;
    let active = null;

    for (const item of sectionMap) {
      if (item.el.offsetTop <= threshold) active = item;
    }

    navLinks.forEach((l) => l.classList.remove('nav-active'));
    if (active) active.link.classList.add('nav-active');
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── SKILL FILTER TABS ── */
function initSkillFilter() {
  const section = document.getElementById('skills');
  const list    = document.getElementById('skill-list');
  if (!section || !list) return;

  const CATS = [
    { key: 'all',  label: 'All' },
    { key: 'lang', label: 'Languages' },
    { key: 'lib',  label: 'Libraries' },
    { key: 'tool', label: 'Tools' },
  ];

  const bar = document.createElement('div');
  bar.className = 'skill-filter';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Filter skills by category');

  CATS.forEach(({ key, label }) => {
    const btn       = document.createElement('button');
    btn.className   = 'skill-filter-btn' + (key === 'all' ? ' active' : '');
    btn.textContent = label;
    btn.dataset.filter = key;

    btn.addEventListener('click', () => {
      bar.querySelectorAll('.skill-filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      list.querySelectorAll('span').forEach((chip) => {
        const cat     = chip.dataset.cat || 'lib';
        const visible = key === 'all' || cat === key;
        chip.classList.toggle('skill-hidden', !visible);

        if (visible) {
          chip.style.animation = 'none';
          chip.offsetHeight;
          chip.style.animation = 'chipIn 220ms ease forwards';
        }
      });
    });

    bar.appendChild(btn);
  });

  list.parentElement.insertBefore(bar, list);
}

/* ── COPY EMAIL + TOAST ── */
function showToast(msg) {
  document.querySelector('.toast')?.remove();
  const t     = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('toast-show')));
  setTimeout(() => {
    t.classList.remove('toast-show');
    setTimeout(() => t.remove(), 300);
  }, 2200);
}

function initCopyEmail() {
  const link = document.getElementById('email-link');
  if (!link) return;

  link.title = 'Click to copy · or open email client';

  link.addEventListener('click', (e) => {
    const email = portfolioData?.contact?.email;
    if (!email || !navigator.clipboard) return;

    e.preventDefault();
    navigator.clipboard.writeText(email)
      .then(() => showToast('✓  Copied to clipboard'))
      .catch(() => { window.location.href = link.href; });
  });
}

/* ── TYPEWRITER TAGLINE ── */
function initTypewriter() {
  const el = document.getElementById('hero-tagline');
  if (!el) return;

  const roles = [
    'ML Researcher',
    'Software Builder',
    'Data Engineer',
    'CS Honors Student',
  ];

  // Replace element content with typed span + blinking cursor
  el.innerHTML = '<span class="tw-text"></span><span class="tw-cursor" aria-hidden="true"></span>';
  const textEl = el.querySelector('.tw-text');

  let roleIdx    = 0;
  let charIdx    = 0;
  let isDeleting = false;

  function tick() {
    const word = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      textEl.textContent = word.slice(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx    = (roleIdx + 1) % roles.length;
        setTimeout(tick, 380);
        return;
      }
      setTimeout(tick, 38);
    } else {
      charIdx++;
      textEl.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) {
        isDeleting = true;
        setTimeout(tick, 1900); // pause on full word
        return;
      }
      setTimeout(tick, 72);
    }
  }

  tick();
}

/* ── TIMELINE READ MORE / LESS ── */
function initTimelineExpand() {
  const LIMIT = 118; // chars before truncating

  document.querySelectorAll('.timeline-item p').forEach((p) => {
    const full = p.textContent.trim();
    if (full.length <= LIMIT) return;

    const cutAt = full.lastIndexOf(' ', LIMIT);
    const short = full.slice(0, cutAt > 0 ? cutAt : LIMIT) + '…';

    p.innerHTML =
      `<span class="tl-short">${short}</span>` +
      `<span class="tl-full" hidden>${full}</span>`;

    const btn = document.createElement('button');
    btn.className = 'tl-toggle';
    btn.textContent = 'Read more';
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      p.querySelector('.tl-short').hidden = !expanded;
      p.querySelector('.tl-full').hidden  =  expanded;
      btn.textContent = expanded ? 'Read more' : 'Read less';
      btn.setAttribute('aria-expanded', String(!expanded));
    });

    p.after(btn);
  });
}

/* ── PARALLAX ORBS ── */
function initParallax() {
  const orbs = [
    { el: document.querySelector('.orb-one'),   speed: 0.07 },
    { el: document.querySelector('.orb-two'),   speed: 0.05 },
    { el: document.querySelector('.orb-three'), speed: 0.11 },
  ];
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      orbs.forEach(({ el, speed }) => {
        if (el) el.style.transform = `translateY(${y * speed}px)`;
      });
      ticking = false;
    });
  }, { passive: true });
}

/* ── ANIMATED COUNTERS ── */
function initCounters() {
  document.querySelectorAll('.hqs-item strong, .stat-card h3').forEach(el => {
    const text  = el.textContent.trim();
    const match = text.match(/^(\d+\.?\d*)([\s\S]*)/);
    if (!match) return;

    const end    = parseFloat(match[1]);
    const suffix = match[2];
    const dec    = match[1].includes('.') ? match[1].split('.')[1].length : 0;
    let done = false;

    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || done) return;
      done = true;
      obs.disconnect();

      const duration = 1300;
      const t0 = performance.now();
      (function step(now) {
        const p     = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (end * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    }, { threshold: 0.6 });

    obs.observe(el);
  });
}

/* ── MAGNETIC BUTTONS ── */
function initMagneticButtons() {
  document.querySelectorAll('.button-primary, .button-resume, .button-resume-big').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 80ms ease-out, box-shadow 80ms ease-out';
    });
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.3;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.3;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 450ms cubic-bezier(0.16,1,0.3,1), box-shadow 450ms ease';
      btn.style.transform  = '';
    });
  });
}

/* ── HERO MOUSE PARALLAX (depth layers) ── */
function initHeroParallax() {
  const photoCol    = document.querySelector('.hero-photo-col');
  const heroContent = document.querySelector('.hero-content');
  if (!photoCol || !heroContent) return;

  let tx = 0, ty = 0, mx = 0, my = 0;

  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  (function frame() {
    tx += (mx - tx) * 0.055;
    ty += (my - ty) * 0.055;
    // Z components create genuine depth — photo is 60px closer to viewer than text
    photoCol.style.transform    = `translate3d(${tx * 20}px, ${ty * 12}px, 60px)`;
    heroContent.style.transform = `translate3d(${tx * 7}px,  ${ty * 4}px,  16px)`;
    requestAnimationFrame(frame);
  })();
}

/* ── HERO SCROLL SCALE (depth as you leave hero) ── */
function initHeroScrollScale() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const scale = Math.max(0.93, 1 - y * 0.00011);
    if (hero.classList.contains('is-visible')) {
      hero.style.transform = `scale(${scale})`;
    }
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
initTheme();
initCanvas3D();
initScrollProgress();
initCardTilt();
initStagger();
initScrollspy();
initSkillFilter();
initCopyEmail();
initTypewriter();
initTimelineExpand();
initParallax();
initCounters();
initMagneticButtons();
initHeroParallax();
initHeroScrollScale();
