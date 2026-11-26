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

const MARQUEE_BRANDS = [
  { name: "FARANO", slug: "farano", style: "tracked" },
  { name: "IranServer", slug: "iranserver", style: "bold" },
  { name: "MADE IN IRAN", slug: "made-in-iran", style: "editorial" },
  { name: "PART SOFTWARE", slug: "part-design-system", style: "tracked" },
  { name: "Signal", slug: "signal", style: "italic" },
  { name: "MERAT · ARA", slug: "merat-ara", style: "tracked" },
  { name: "Word+", slug: "word-plus", style: "bold" },
  { name: "Kanon Ghazaei", slug: "kanon-ghazaei", style: "editorial" },
  { name: "DadeNegar", slug: "dade-negar", style: "bold" },
  { name: "Val-e-Asr", slug: "val-e-asr", style: "editorial" },
  { name: "PULSE", slug: "pulse", style: "tracked" },
  { name: "Avanegar", slug: "avanegar-avasho", style: "italic" },
  { name: "Freedom Park", slug: "freedom-park", style: "editorial" },
  { name: "Khiaar", slug: "khiaar", style: "bold" },
  { name: "Nevise Negar", slug: "nevise-negar", style: "editorial" },
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
    <!-- Section 02A — Full-Viewport Symbol Studio Opening Fold + Bliss Blue Backdrop -->
    <section class="hero hero--bliss" aria-labelledby="hero-title">
      <div class="hero-bliss-bg" aria-hidden="true">
        <div class="hero-bliss-orb hero-bliss-orb--1"></div>
        <div class="hero-bliss-orb hero-bliss-orb--2"></div>
        <div class="hero-bliss-orb hero-bliss-orb--3"></div>
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

    <!-- Bliss-Style Minimal Clickable Companies & Products Marquee -->
    <div class="brand-marquee-band" dir="ltr" aria-label="${isFa ? "شرکت‌ها و محصولاتی که روی آن‌ها کار کرده‌ام" : "Companies and products I have worked on"}">
      <div class="brand-marquee-track">
        ${[...MARQUEE_BRANDS, ...MARQUEE_BRANDS]
          .map(
            (b) => `
          <a class="brand-wordmark brand-wordmark--${b.style}" href="${prefix}/work/${b.slug}/">
            <span class="brand-wordmark__glyph" aria-hidden="true"></span>
            <span>${b.name}</span>
          </a>
        `
          )
          .join("")}
      </div>
    </div>

    <!-- Section 03 — Compact Tabbed Audience Selector (Billy Sweeney-inspired) -->
    <section class="section section--bordered" id="audience" aria-labelledby="audience-heading">
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
              aria-selected="${idx === 0 ? "true" : "false"}"
            >
              <span class="audience-tab__dot" aria-hidden="true"></span>
              <span>${item.title}</span>
            </button>
          `
            )
            .join("")}
        </div>

        <div class="audience-panel reveal" id="audience-panel" aria-live="polite">
          ${renderAudiencePanelContent(initialAudience, content)}
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

    <!-- Section 07 — About -->
    <section class="section section--bordered" id="about" aria-labelledby="about-heading">
      <div class="container about-grid">
        <div class="about-body reveal">
          <div class="eyebrow">${content.about.eyebrow}</div>
          <h2 class="section-title" id="about-heading">${content.about.heading}</h2>
          ${content.about.paragraphs.map((p) => `<p>${p}</p>`).join("")}
          <div style="margin-top:26px;">
            <a class="btn btn--secondary" href="${prefix}/about/">
              <span>${content.about.moreCta}</span>
              <span class="btn__arrow" aria-hidden="true">${content.arrow}</span>
            </a>
          </div>
        </div>

        <div class="reveal">
          <div class="sculpture-frame sculpture-frame--landscape">
            <img
              src="/assets/sculpture-about.jpg"
              alt="${content.about.sculptureAlt}"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Section 08 — Bliss Agency-Inspired Contact Section (Starfield + Live Telegram Form) -->
    <section class="section section--bordered" id="contact" aria-labelledby="contact-heading">
      <div class="container">
        <div class="bliss-contact reveal" id="contact-box">
          <canvas class="contact-dots-canvas" id="contact-dots-canvas" aria-hidden="true"></canvas>

          <div class="bliss-contact__left">
            <div class="eyebrow">${isFa ? "همکاری جدید" : "NEW COLLABORATIONS"}</div>
            <h2 class="bliss-contact__title" id="contact-heading">${content.contact.heading}</h2>
            <p class="bliss-contact__desc">${content.contact.body}</p>

            <div class="bliss-contact__meta">
              <div class="bliss-contact__label">${isFa ? "تجربه همکاری با تیم‌ها و محصولات" : "Worked with teams & products"}</div>
              <div class="bliss-contact__logos">
                <span>Farano</span>
                <span>IranServer</span>
                <span>Made In Iran</span>
                <span>Part Software</span>
                <span>Signal</span>
                <span>Word+</span>
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
                <label for="bf-contact">${isFa ? "ایمیل یا آیدی تلگرام" : "Work email or Telegram"}</label>
                <input id="bf-contact" type="text" required placeholder="${isFa ? "name@company.com یا @username" : "name@company.com or @username"}" />
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
  // 1. Compact Tabbed Audience Selector
  const audienceTabs = document.querySelectorAll("[data-audience-id]");
  const audiencePanel = document.getElementById("audience-panel");
  if (audienceTabs.length && audiencePanel) {
    let currentId = content.audience.items[0].id;
    audienceTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const nextId = tab.getAttribute("data-audience-id");
        if (!nextId || nextId === currentId) return;
        const nextItem = content.audience.items.find((i) => i.id === nextId);
        if (!nextItem) return;

        currentId = nextId;
        audienceTabs.forEach((t) =>
          t.setAttribute("aria-selected", String(t.getAttribute("data-audience-id") === nextId))
        );
        audiencePanel.classList.add("is-switching");
        window.setTimeout(() => {
          audiencePanel.innerHTML = renderAudiencePanelContent(nextItem, content);
          audiencePanel.classList.remove("is-switching");
        }, 150);
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

  // 5. Initialize Figma UI3 Workspace, Conceptzilla Scroll Timeline & Contact Starfield
  initHeroFigmaStage();
  initConceptzillaTimeline();
  initContactStarfieldCanvas();
}
