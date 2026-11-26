/* ==========================================================================
   Homepage Renderer — Exact 8-Section Architecture
   - Centered Editorial Hero + Interactive Multi-Tab Figma UI3 Workspace
   - Compact Tabbed Audience Selector + "Let's talk" CTA to #contact
   - Uniform 2-Col Selected Work Grid
   - Conceptzilla-Inspired Vertical Dotted Center Timeline (Design Approach)
   - Interactive Categorized Experience Split View
   - About with Abstract Sculpture
   - Practical Contact with Subtle Mouse-Reactive Dot Field Canvas
   ========================================================================== */

import { getFeaturedProjects } from "../data/projects.js";
import { PROFILE } from "../data/content-en.js";
import { SITE_CONFIG } from "../config.js";
import { renderProjectCard } from "../components/project-card.js";
import { PRINCIPLE_GLYPHS } from "../components/glyphs.js";
import { renderHeroFigmaStage, initHeroFigmaStage } from "../components/hero-figma-stage.js";

/* Curated Flagship Products & Companies in Strategic Impact Order */
const MARQUEE_BRANDS = [
  { name: "DELTAFX", slug: "iranserver", hrefOverride: "#experience", style: "tracked" },
  { name: "FARANO", slug: "farano", style: "tracked" },
  { name: "IranServer", slug: "iranserver", style: "bold" },
  { name: "Signal", slug: "signal", style: "italic" },
  { name: "MADE IN IRAN", slug: "made-in-iran", style: "editorial" },
  { name: "MERAT · ARA", slug: "merat-ara", style: "tracked" },
  { name: "Word+", slug: "word-plus", style: "bold" },
  { name: "PART SOFTWARE", slug: "part-design-system", style: "tracked" },
];

function renderAudiencePanelContent(item, content) {
  const linksHtml = item.links
    .map(
      (link) => `
      <a
        class="audience-quick-link"
        href="${link.href}"
        ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ""}
      >
        <span>${link.label}</span>
        <span aria-hidden="true">${link.external ? "↗" : content.arrow}</span>
      </a>
    `
    )
    .join("");

  const pointsHtml = item.points
    .map(
      (pt) => `
      <li>
        <span class="audience-panel__bullet" aria-hidden="true"></span>
        <span>${pt}</span>
      </li>
    `
    )
    .join("");

  return `
    <div class="audience-panel__grid">
      <div>
        <h3 class="audience-panel__headline">${item.headline}</h3>
        <p class="audience-panel__summary">${item.summary}</p>
        <ul class="audience-panel__points">${pointsHtml}</ul>
        <div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap;">
          <a class="btn btn--primary btn--sm" href="#contact">
            <span>${content.nav.cta}</span>
            <span class="btn__arrow" aria-hidden="true">${content.arrow}</span>
          </a>
        </div>
      </div>
      <div class="audience-panel__aside">
        <div class="audience-panel__aside-label">${content.audience.recommendedLabel}</div>
        <div class="audience-panel__links">${linksHtml}</div>
      </div>
    </div>
  `;
}

function renderExperienceDetail(item, isFreelanceGroup, content) {
  if (isFreelanceGroup) {
    return `
      <div class="exp-detail__head">
        <div>
          <h3 class="exp-detail__company">${content.lang === "fa" ? "پروژه‌های فریلنسری و موازی" : "Freelance & Remote Engagements"}</h3>
          <div class="exp-detail__role">${content.experience.additionalNote}</div>
        </div>
      </div>
      <div class="exp-freelance-stack">
        ${content.experience.freelanceEntries
          .map(
            (f) => `
          <div class="exp-freelance-item">
            <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:4px;">
              <strong>${f.company}</strong>
              <span style="font-size:0.82rem;color:var(--ink-subtle);">${f.period}</span>
            </div>
            <div style="font-size:0.84rem;color:var(--primary-text-on-soft);margin-bottom:6px;">${f.role} · ${f.domain}</div>
            <p style="font-size:0.88rem;color:var(--ink-muted);margin-bottom:8px;">${f.summary}</p>
            <span class="pill" style="font-size:0.75rem;">${f.overlapNote}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  return `
    <div class="exp-detail__head">
      <div>
        <h3 class="exp-detail__company">${item.company}</h3>
        <div class="exp-detail__role">${item.role}</div>
      </div>
      <div class="exp-detail__meta">
        <span class="pill pill--blue">${item.period}</span>
        <span class="exp-detail__loc">${item.domain} · ${item.location}</span>
      </div>
    </div>
    <ul class="exp-detail__list">
      ${item.highlights
        .map(
          (h) => `
        <li>
          <span class="audience-panel__bullet" aria-hidden="true"></span>
          <span>${h}</span>
        </li>
      `
        )
        .join("")}
    </ul>
  `;
}

export function renderHomePage(content) {
  const prefix = `/${content.lang}`;
  const isFa = content.lang === "fa";
  const featured = getFeaturedProjects();
  const initialAudience = content.audience.items[0];
  const initialExp = content.experience.entries[0];

  return `
    <!-- Section 02A — Full-Viewport Symbol Studio Opening Fold + Bliss Fluid Blue Aurora Canvas -->
    <section class="hero hero--bliss" aria-labelledby="hero-title">
      <div class="hero-bliss-bg" aria-hidden="true">
        <canvas class="hero-bliss-canvas" id="hero-bliss-canvas"></canvas>
      </div>

      <div class="hero-fold">
        <div class="container hero-opening-meta">
          <p class="hero-opening-bio">${content.hero.intro[0]}</p>
          <a class="hero-scroll-cue" href="#figma-showcase">
            <span>${isFa ? "اسکرول کنید تا وارد فضای زنده فیگما و پروژه‌ها شوید ↓" : "Scroll down to explore the live Figma workspace & work ↓"}</span>
          </a>
        </div>

        <!-- Giant Anchor Display Wordmark (Symbol Studio opening rhythm) -->
        <div class="hero-giant-strip" dir="ltr" aria-hidden="true">
          <div class="hero-giant-track">
            <span>ALIREZA FARSHCHI <i class="hero-giant-dot"></i> PRODUCT DESIGNER <i class="hero-giant-dot"></i></span>
            <span>ALIREZA FARSHCHI <i class="hero-giant-dot"></i> PRODUCT DESIGNER <i class="hero-giant-dot"></i></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02B — Dedicated Full-Width Interactive Figma UI3 Workspace -->
    <section class="figma-showcase-section" id="figma-showcase" aria-label="${isFa ? "فضای کار زنده فیگما" : "Interactive Figma workspace"}">
      <div class="container">
        <div class="figma-showcase-head reveal">
          <div class="eyebrow">
            <span class="eyebrow__dot" aria-hidden="true"></span>
            <span>${isFa ? "فایل زنده فیگما · قابل تعامل با موس شما" : "LIVE FIGMA WORKSPACE · INTERACTIVE MULTIPLAYER"}</span>
          </div>
          <p class="figma-showcase-hint">
            ${isFa ? "موس را روی بوم ببرید تا به‌عنوان Guest وارد شوید، روی کارت‌ها کلیک کنید یا بین تب‌های پروژه‌ها جابه‌جا شوید." : "Hover the canvas to join as Guest, click any component to inspect it, or switch project tabs above."}
          </p>
        </div>
        <div class="hero__visual reveal">
          ${renderHeroFigmaStage(content.lang)}
        </div>
      </div>
    </section>

    <!-- Bliss-Style Curated Flagship Marquee (Seamless, No Harsh Divider) -->
    <div class="brand-marquee-band" dir="ltr" aria-label="${isFa ? "شرکت‌ها و محصولات منتخب" : "Selected companies and flagship products"}">
      <div class="brand-marquee-track">
        ${[...MARQUEE_BRANDS, ...MARQUEE_BRANDS, ...MARQUEE_BRANDS]
          .map(
            (b) => `
          <a class="brand-wordmark brand-wordmark--${b.style}" href="${b.hrefOverride || `${prefix}/work/${b.slug}/`}">
            <span class="brand-wordmark__glyph" aria-hidden="true"></span>
            <span>${b.name}</span>
          </a>
        `
          )
          .join("")}
      </div>
    </div>

    <!-- Section 03 — Orchid-Style Stacked Card Deck Audience Selector -->
    <section class="section" id="audience" aria-labelledby="audience-heading">
      <div class="container">
        <div class="section-header reveal">
          <div class="eyebrow">${content.audience.eyebrow}</div>
          <h2 class="section-title" id="audience-heading">${content.audience.heading}</h2>
          <p class="section-desc">${content.audience.supporting}</p>
        </div>

        <div class="audience-tabs reveal" role="tablist" aria-label="${content.audience.heading}">
          ${content.audience.items
            .map(
              (item, idx) => `
            <button
              type="button"
              role="tab"
              class="audience-tab"
              data-audience-id="${item.id}"
              data-audience-index="${idx}"
              aria-selected="${idx === 0 ? "true" : "false"}"
            >
              <span class="audience-tab__num">0${idx + 1}</span>
              <span>${item.title}</span>
            </button>
          `
            )
            .join("")}
        </div>

        <div class="orchid-stack reveal" id="orchid-stack">
          <div class="orchid-stack__layer orchid-stack__layer--back2" aria-hidden="true"></div>
          <div class="orchid-stack__layer orchid-stack__layer--back1" aria-hidden="true"></div>
          <div class="audience-panel orchid-stack__front" id="audience-panel" aria-live="polite">
            <div class="orchid-card-badge" id="orchid-card-num">01 · ${initialAudience.title}</div>
            ${renderAudiencePanelContent(initialAudience, content)}
          </div>
        </div>
      </div>
    </section>

    <!-- Section 04 — Selected Work -->
    <section class="section section--bordered section--surface-band" id="selected-work" aria-labelledby="work-heading">
      <div class="container">
        <div class="section-header reveal">
          <div class="eyebrow">${content.selectedWork.eyebrow}</div>
          <h2 class="section-title" id="work-heading">${content.selectedWork.heading}</h2>
          <p class="section-desc">${content.selectedWork.description}</p>
        </div>

        <div class="projects-grid">
          ${featured.map((proj, idx) => renderProjectCard(proj, content, idx)).join("")}
        </div>

        <div class="section-footer-cta reveal">
          <a class="btn btn--secondary btn--lg" href="${prefix}/work/">
            <span>${content.selectedWork.closingCta}</span>
            <span class="btn__arrow" aria-hidden="true">${content.arrow}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Section 05 — Design Approach (Conceptzilla Vertical Dotted Center Timeline) -->
    <section class="section section--bordered" id="approach" aria-labelledby="approach-heading">
      <div class="container">
        <div class="section-header section-header--center reveal">
          <div class="eyebrow">${content.approach.eyebrow}</div>
          <h2 class="section-title" id="approach-heading">${content.approach.heading}</h2>
          <p class="section-desc">${content.approach.description}</p>
        </div>

        <div class="cz-timeline" id="cz-timeline">
          <div class="cz-timeline__spine" aria-hidden="true"></div>
          <div class="cz-timeline__progress" id="cz-timeline-progress" aria-hidden="true"></div>
          ${content.approach.principles
            .map(
              (p, i) => `
            <div class="cz-step ${i % 2 === 0 ? "cz-step--right" : "cz-step--left"}" data-cz-step="${i}">
              <span class="cz-step__dot" aria-hidden="true"></span>
              <article class="cz-card">
                <div class="cz-card__icon" aria-hidden="true">${PRINCIPLE_GLYPHS[i]}</div>
                <p class="cz-card__body">
                  <strong>${p.title}.</strong> ${p.description}
                </p>
              </article>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- Section 06 — Interactive Categorized Experience Split View -->
    <section class="section section--bordered" id="experience" aria-labelledby="experience-heading">
      <div class="container">
        <div class="section-header reveal">
          <div class="eyebrow">${content.experience.eyebrow}</div>
          <h2 class="section-title" id="experience-heading">${content.experience.heading}</h2>
          <p class="section-desc">${content.experience.description}</p>
        </div>

        <div class="exp-split reveal">
          <div class="exp-nav" role="tablist" aria-label="${content.experience.heading}">
            ${content.experience.entries
              .map(
                (entry, idx) => `
              <button
                type="button"
                role="tab"
                class="exp-nav__item"
                data-exp-index="${idx}"
                aria-selected="${idx === 0 ? "true" : "false"}"
              >
                <span class="exp-nav__company">${entry.company}</span>
                <span class="exp-nav__meta">${entry.role} · ${entry.period}</span>
              </button>
            `
              )
              .join("")}
            <button
              type="button"
              role="tab"
              class="exp-nav__item"
              data-exp-index="freelance"
              aria-selected="false"
            >
              <span class="exp-nav__company">${isFa ? "فریلنسری و موازی" : "Freelance & Remote"}</span>
              <span class="exp-nav__meta">${isFa ? "کانون قضایی · هلو و پارمیس · بجاتو" : "Kanon Ghazaei · Accounting · Bejatoo"}</span>
            </button>
          </div>

          <div class="exp-detail" id="exp-detail-panel" aria-live="polite">
            ${renderExperienceDetail(initialExp, false, content)}
          </div>
        </div>

        <div class="section-footer-cta reveal">
          <a class="btn btn--secondary" href="${PROFILE.resumeUrl}" target="_blank" rel="noopener noreferrer">
            <span>${content.experience.cta}</span>
            <span class="btn__arrow" aria-hidden="true">${content.arrow}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Section 07 — Elevated Bento About Me -->
    <section class="section section--bordered" id="about" aria-labelledby="about-heading">
      <div class="container about-grid">
        <div class="about-body reveal">
          <div class="about-portrait-chip">
            <img src="/assets/alireza-portrait.jpg" alt="${PROFILE.name}" width="48" height="48" loading="lazy" />
            <div>
              <div style="font-weight:700;font-size:0.92rem;color:var(--ink);">
                ${isFa ? "علیرضا محمدزاده فرشچی" : PROFILE.name}
              </div>
              <div style="font-size:0.78rem;color:var(--ink-muted);">
                ${isFa ? "طراح ارشد محصول در DeltaFX · +۵ سال تجربه" : "Senior Product Designer at DeltaFX · 5+ Years"}
              </div>
            </div>
          </div>

          <div class="eyebrow">${content.about.eyebrow}</div>
          <h2 class="section-title" id="about-heading">${content.about.heading}</h2>
          <p>${content.about.paragraphs[0]}</p>
          <p>${content.about.paragraphs[1]}</p>

          <div class="about-bento-stats">
            <div class="about-stat-card">
              <strong>5+</strong>
              <span>${isFa ? "سال تجربه طراحی محصول و سیستم" : "Years in Product & Systems"}</span>
            </div>
            <div class="about-stat-card">
              <strong>20+</strong>
              <span>${isFa ? "محصول منتشرشده در فینتک، ابر و بازی" : "Shipped Products & Systems"}</span>
            </div>
            <div class="about-stat-card">
              <strong>IBM · Part</strong>
              <span>${isFa ? "مدرس UI/UX و منتور طراحان" : "Certified & UI/UX Instructor"}</span>
            </div>
          </div>

          <div style="margin-top:24px;">
            <a class="btn btn--secondary" href="${prefix}/about/">
              <span>${content.about.moreCta}</span>
              <span class="btn__arrow" aria-hidden="true">${content.arrow}</span>
            </a>
          </div>
        </div>

        <div class="reveal">
          <div class="about-visual-card">
            <div class="sculpture-frame sculpture-frame--landscape">
              <img
                src="/assets/sculpture-about.jpg"
                alt="${content.about.sculptureAlt}"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="about-visual-caption">
              <span>${isFa ? "تفکر سیستمی · تحقیق کاربر · گردش‌کار هوشمند AI" : "Systems Thinking · User Research · AI Workflows"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 08 — Bliss Agency-Inspired Contact Section (Companies Only + Fixed Form) -->
    <section class="section section--bordered" id="contact" aria-labelledby="contact-heading">
      <div class="container">
        <div class="bliss-contact reveal" id="contact-box">
          <canvas class="contact-dots-canvas" id="contact-dots-canvas" aria-hidden="true"></canvas>

          <div class="bliss-contact__left">
            <div class="eyebrow">${isFa ? "همکاری جدید" : "NEW COLLABORATIONS"}</div>
            <h2 class="bliss-contact__title" id="contact-heading">${content.contact.heading}</h2>
            <p class="bliss-contact__desc">${content.contact.body}</p>

            <div class="bliss-contact__meta">
              <div class="bliss-contact__label">${isFa ? "شرکت‌هایی که با آن‌ها همکاری داشته‌ام" : "Companies I've worked with"}</div>
              <div class="bliss-contact__logos">
                <span>DeltaFX</span>
                <span>Farano</span>
                <span>IranServer</span>
                <span>Made In Iran</span>
                <span>Part Software Group</span>
                <span>Kanon Ghazaei</span>
                <span>Bejatoo</span>
              </div>
            </div>

            <div class="bliss-contact__direct">
              <button type="button" class="btn btn--secondary btn--sm" id="copy-email-btn" data-email="${PROFILE.email}">
                <span id="copy-email-label">${PROFILE.email}</span>
              </button>
              <a class="btn btn--secondary btn--sm" href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a class="btn btn--secondary btn--sm" href="${PROFILE.resumeUrl}" target="_blank" rel="noopener noreferrer">${content.nav.resume} ↗</a>
            </div>
          </div>

          <form class="bliss-form-card" id="bliss-contact-form">
            <div class="bliss-form-row">
              <div class="bliss-field">
                <label for="bf-name">${isFa ? "نام و نام خانوادگی" : "Full name"}</label>
                <input id="bf-name" type="text" required placeholder="${isFa ? "نام شما" : "Your name"}" />
              </div>
              <div class="bliss-field">
                <label for="bf-contact">${isFa ? "ایمیل یا تلگرام" : "Email or Telegram"}</label>
                <input id="bf-contact" type="text" required placeholder="${isFa ? "ایمیل یا @آیدی" : "you@mail.com / @id"}" />
              </div>
            </div>

            <div class="bliss-field">
              <label for="bf-role">${isFa ? "موضوع همکاری" : "What brings you here?"}</label>
              <select id="bf-role">
                <option value="Hiring / Product Role">${isFa ? "فرصت شغلی / استخدام" : "Hiring / Product Role"}</option>
                <option value="Design Systems / Consulting">${isFa ? "سیستم طراحی / مشاوره" : "Design Systems / Consulting"}</option>
                <option value="Freelance Project">${isFa ? "پروژه فریلنسری" : "Freelance Project"}</option>
                <option value="General Chat">${isFa ? "گفت‌وگو و شبکه‌سازی" : "General Conversation"}</option>
              </select>
            </div>

            <div class="bliss-field">
              <label for="bf-msg">${isFa ? "پیام شما" : "The floor is yours"}</label>
              <textarea id="bf-msg" rows="4" required placeholder="${isFa ? "درباره پروژه یا مسئله‌ای که می‌خواهید حل کنید بنویسید..." : "Tell me about the product challenge or opportunity..."}"></textarea>
            </div>

            <div class="bliss-form-status" id="bf-status" role="status"></div>

            <button type="submit" class="bliss-submit-btn" id="bf-submit">
              <span>${isFa ? "ارسال مستقیم به تلگرام علیرضا" : "Send message to Alireza"}</span>
              <span class="bliss-submit-circle" aria-hidden="true">${content.arrow}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}

function initHeroBlissCanvas() {
  const canvas = document.getElementById("hero-bliss-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Low-res offscreen grid upscaled smoothly by CSS blur = silky 60fps & <1% CPU!
  const W = 260;
  const H = 160;
  canvas.width = W;
  canvas.height = H;

  const blobs = [
    { x: 0.22, y: 0.28, r: 0.56, sx: 0.00055, sy: 0.00042, ph: 0.0, color: "rgba(22, 94, 246, 0.72)" },
    { x: 0.78, y: 0.24, r: 0.54, sx: 0.00048, sy: 0.00062, ph: 2.1, color: "rgba(87, 193, 255, 0.62)" },
    { x: 0.50, y: 0.62, r: 0.58, sx: 0.00038, sy: 0.00051, ph: 4.0, color: "rgba(18, 66, 196, 0.58)" },
    { x: 0.36, y: 0.44, r: 0.42, sx: 0.00066, sy: 0.00036, ph: 1.2, color: "rgba(185, 200, 255, 0.45)" },
  ];

  let lastFrame = 0;
  function render(now) {
    if (now - lastFrame < 32) {
      if (!prefersReduced) requestAnimationFrame(render);
      return;
    }
    lastFrame = now;

    ctx.clearRect(0, 0, W, H);
    const t = prefersReduced ? 0 : now;

    for (const b of blobs) {
      const cx = (b.x + Math.sin(t * b.sx + b.ph) * 0.16) * W;
      const cy = (b.y + Math.cos(t * b.sy + b.ph) * 0.14) * H;
      const rad = b.r * Math.max(W, H);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grad.addColorStop(0, b.color);
      grad.addColorStop(1, "rgba(22, 94, 246, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    if (!prefersReduced) requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function initConceptzillaTimeline() {
  const timeline = document.getElementById("cz-timeline");
  const progress = document.getElementById("cz-timeline-progress");
  const steps = timeline?.querySelectorAll("[data-cz-step]");
  if (!timeline || !progress || !steps?.length) return;

  const onScroll = () => {
    const rect = timeline.getBoundingClientRect();
    const viewMid = window.innerHeight * 0.68;
    const raw = (viewMid - rect.top) / Math.max(1, rect.height);
    const pct = Math.min(1, Math.max(0, raw));
    progress.style.height = `${(pct * 100).toFixed(2)}%`;

    steps.forEach((step) => {
      const sRect = step.getBoundingClientRect();
      step.classList.toggle("is-active", sRect.top < window.innerHeight * 0.78);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initContactStarfieldCanvas() {
  const box = document.getElementById("contact-box");
  const canvas = document.getElementById("contact-dots-canvas");
  if (!box || !canvas) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];
  const mouse = { x: -9999, y: -9999, active: false };

  function buildField() {
    const rect = box.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(110, Math.max(48, Math.floor((width * height) / 7200)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: 0.9 + Math.random() * 1.2,
      alpha: 0.14 + Math.random() * 0.26,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    const baseRgb = "235, 240, 255";

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!prefersReduced) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 120 && d > 0.1) {
            const f = (1 - d / 120) * 1.3;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseRgb}, ${p.alpha.toFixed(3)})`;
      ctx.fill();
    }

    if (!prefersReduced) requestAnimationFrame(tick);
  }

  box.addEventListener("pointermove", (e) => {
    const rect = box.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  box.addEventListener("pointerleave", () => {
    mouse.active = false;
  });

  window.addEventListener("resize", buildField, { passive: true });
  buildField();
  tick();
}

export function initHomePage(content) {
  // 1. Orchid-Style Stacked Card Deck Audience Selector
  const audienceTabs = document.querySelectorAll("[data-audience-id]");
  const audiencePanel = document.getElementById("audience-panel");
  const orchidStack = document.getElementById("orchid-stack");
  if (audienceTabs.length && audiencePanel) {
    let currentId = content.audience.items[0].id;
    audienceTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const nextId = tab.getAttribute("data-audience-id");
        const nextIdx = Number(tab.getAttribute("data-audience-index")) || 0;
        if (!nextId || nextId === currentId) return;
        const nextItem = content.audience.items.find((i) => i.id === nextId);
        if (!nextItem) return;

        currentId = nextId;
        audienceTabs.forEach((t) =>
          t.setAttribute("aria-selected", String(t.getAttribute("data-audience-id") === nextId))
        );
        orchidStack?.classList.add("is-stacking");
        window.setTimeout(() => {
          audiencePanel.innerHTML = `
            <div class="orchid-card-badge">0${nextIdx + 1} · ${nextItem.title}</div>
            ${renderAudiencePanelContent(nextItem, content)}
          `;
          orchidStack?.classList.remove("is-stacking");
        }, 180);
      });
    });
  }

  // 2. Interactive Categorized Experience Split View
  const expTabs = document.querySelectorAll("[data-exp-index]");
  const expPanel = document.getElementById("exp-detail-panel");
  if (expTabs.length && expPanel) {
    expTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-exp-index");
        expTabs.forEach((b) =>
          b.setAttribute("aria-selected", String(b.getAttribute("data-exp-index") === key))
        );

        expPanel.classList.add("is-switching");
        window.setTimeout(() => {
          if (key === "freelance") {
            expPanel.innerHTML = renderExperienceDetail(null, true, content);
          } else {
            const entry = content.experience.entries[Number(key)];
            if (entry) expPanel.innerHTML = renderExperienceDetail(entry, false, content);
          }
          expPanel.classList.remove("is-switching");
        }, 140);
      });
    });
  }

  // 3. Copy Email Button
  const copyBtn = document.getElementById("copy-email-btn");
  const copyLabel = document.getElementById("copy-email-label");
  if (copyBtn && copyLabel) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email") || PROFILE.email;
      const orig = copyLabel.textContent;
      try {
        await navigator.clipboard.writeText(email);
        copyLabel.textContent = content.lang === "fa" ? "کپی شد ✓" : "Copied ✓";
        window.setTimeout(() => {
          copyLabel.textContent = orig;
        }, 2000);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // 4. Bliss Contact Form -> Live Telegram Worker Delivery
  const blissForm = document.getElementById("bliss-contact-form");
  const bfStatus = document.getElementById("bf-status");
  if (blissForm && bfStatus) {
    blissForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("bf-name")?.value.trim() || "";
      const role = document.getElementById("bf-role")?.value || "";
      const contact = document.getElementById("bf-contact")?.value.trim() || "";
      const msg = document.getElementById("bf-msg")?.value.trim() || "";
      if (!name || !contact || !msg) return;

      const isFa = content.lang === "fa";
      bfStatus.textContent = isFa ? "در حال ارسال به تلگرام علیرضا..." : "Sending directly to Alireza's Telegram...";
      bfStatus.className = "bliss-form-status is-info";

      let sessionId = "af_form";
      try {
        sessionId = localStorage.getItem("af-live-chat-session-v1") || "af_" + Date.now().toString(36);
        localStorage.setItem("af-live-chat-session-v1", sessionId);
      } catch {
        // ignore
      }

      if (SITE_CONFIG.WORKER_URL) {
        try {
          const res = await fetch(`${SITE_CONFIG.WORKER_URL.replace(/\/$/, "")}/api/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              sender: `${name} (${role} · ${contact})`,
              text: msg,
              page: window.location.pathname,
            }),
          });
          if (res.ok) {
            blissForm.reset();
            bfStatus.textContent = isFa
              ? "✓ پیام مستقیماً به تلگرام علیرضا ارسال شد! می‌توانید گفت‌وگو را در چت زنده هم ادامه دهید."
              : "✓ Sent directly to Alireza's Telegram! You can also continue live in the chat widget.";
            bfStatus.className = "bliss-form-status is-ok";
            return;
          }
        } catch {
          // fallback below
        }
      }

      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`${role} — ${name}`)}&body=${encodeURIComponent(`${msg}\n\nContact: ${contact}`)}`;
    });
  }

  // 5. Initialize Bliss Fluid Hero Canvas, Figma UI3 Workspace, Conceptzilla Timeline & Contact Starfield
  initHeroBlissCanvas();
  initHeroFigmaStage();
  initConceptzillaTimeline();
  initContactStarfieldCanvas();
}
