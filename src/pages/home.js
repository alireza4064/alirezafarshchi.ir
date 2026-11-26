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
    <div class="exp-detail__footer">
      <div class="exp-detail__tags">
        <span>${item.domain}</span>
        <span>${item.location}</span>
      </div>
      <a class="exp-detail__resume-link" href="${PROFILE.resumeUrl}" target="_blank" rel="noopener noreferrer">
        <span>${content.experience.cta}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  `;
}

export function renderHomePage(content) {
  const prefix = `/${content.lang}`;
  const isFa = content.lang === "fa";
  const featured = getFeaturedProjects();
  const initialAudience = content.audience.items[0];
  const initialExp = content.experience.entries[0];

  return `
    <!-- Section 02A — Full-Viewport Symbol Studio Opening Fold + Bliss WebGL Blue Silk Shader -->
    <section class="hero hero--bliss" aria-labelledby="hero-title">
      <div class="hero-bliss-bg" id="hero-bliss-bg" aria-hidden="true">
        <canvas class="hero-bliss-canvas" id="hero-bliss-canvas"></canvas>
      </div>
      <div class="hero-bliss-veil" aria-hidden="true"></div>

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
            ${isFa ? "موس را روی بوم ببرید، بین تب‌ها جابه‌جا شوید، با دست (H) بوم را بکشید، کامنت (C) بگذارید یا Dev Mode (&lt;/&gt;) را فعال کنید." : "Switch tabs, drag with Hand (H), zoom 75–125%, drop a Comment (C), or toggle Dev Mode (&lt;/&gt;) to inspect CSS tokens."}
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

        <div class="orchid-deck reveal" id="orchid-deck" data-active-index="0">
          ${content.audience.items
            .map(
              (item, idx) => `
            <article
              class="audience-panel orchid-card ${idx === 0 ? "is-active" : "is-future"}"
              data-orchid-card="${idx}"
              aria-hidden="${idx === 0 ? "false" : "true"}"
            >
              <div class="orchid-card__head">
                <span class="orchid-card-badge">0${idx + 1} · ${item.title}</span>
              </div>
              ${renderAudiencePanelContent(item, content)}
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- Section 04 — Selected Work (Editorial Staggered Grid + Scroll-Linked Motion) -->
    <section class="section section--ambient-band" id="selected-work" aria-labelledby="work-heading">
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
    <section class="section section--surface-band" id="experience" aria-labelledby="experience-heading">
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

    <!-- Section 07 — Clean Swiss Editorial Bento About Me -->
    <section class="section section--bordered" id="about" aria-labelledby="about-heading">
      <div class="container">
        <div class="section-header reveal">
          <div class="eyebrow">${content.about.eyebrow}</div>
          <h2 class="section-title" id="about-heading">${content.about.heading}</h2>
        </div>

        <div class="about-bento reveal">
          <!-- Primary Editorial Story Card -->
          <div class="about-bento__story">
            <div class="about-role-bar">
              <span class="about-role-dot" aria-hidden="true"></span>
              <span>${isFa ? "طراح ارشد محصول در DeltaFX · +۵ سال تجربه" : "Senior Product Designer at DeltaFX · 5+ Years"}</span>
            </div>

            <p class="about-bento__lead">${content.about.paragraphs[0]}</p>
            <p class="about-bento__copy">${content.about.paragraphs[1]}</p>

            <div class="about-pillars">
              <span>Design Systems</span>
              <span>Product Architecture</span>
              <span>User Research</span>
              <span>AI-Assisted Workflows</span>
            </div>

            <div class="about-bento__actions">
              <a class="btn btn--primary" href="${prefix}/about/">
                <span>${content.about.moreCta}</span>
                <span class="btn__arrow" aria-hidden="true">${content.arrow}</span>
              </a>
              <a class="btn btn--secondary" href="${PROFILE.resumeUrl}" target="_blank" rel="noopener noreferrer">
                <span>${content.nav.resume} ↗</span>
              </a>
            </div>
          </div>

          <!-- Right Visual + Metrics Column -->
          <div class="about-bento__side">
            <div class="about-bento__visual">
              <img
                src="/assets/sculpture-about.jpg"
                alt="${content.about.sculptureAlt}"
                loading="lazy"
                decoding="async"
              />
              <div class="about-bento__visual-tag">
                <img class="about-mini-avatar" src="/assets/alireza-portrait.jpg" alt="${PROFILE.name}" width="32" height="32" loading="lazy" />
                <div>
                  <strong>${isFa ? "علیرضا محمدزاده فرشچی" : "Alireza Farshchi"}</strong>
                  <span>${isFa ? "مشهد / ریموت · طراحی محصول" : "Product & Systems · Remote"}</span>
                </div>
              </div>
            </div>

            <div class="about-bento-stats">
              <div class="about-stat-card">
                <strong>5+</strong>
                <span>${isFa ? "سال تجربه محصول" : "Years Experience"}</span>
              </div>
              <div class="about-stat-card">
                <strong>20+</strong>
                <span>${isFa ? "محصول و سیستم" : "Shipped Products"}</span>
              </div>
              <div class="about-stat-card">
                <strong>IBM · Part</strong>
                <span>${isFa ? "مدرس و منتور UI/UX" : "Certified & Mentor"}</span>
              </div>
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
  const wrapper = document.getElementById("hero-bliss-bg");
  if (!canvas || !wrapper) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });

  if (!gl) {
    // Lightweight fallback if WebGL is unavailable
    wrapper.style.background =
      "radial-gradient(ellipse 85% 65% at 74% 18%, rgba(87,193,255,0.48) 0%, rgba(22,94,246,0.34) 36%, #02040a 78%)";
    wrapper.classList.add("is-ready");
    return;
  }

  const vsSource = `
    attribute vec2 a_pos;
    void main() {
      gl_Position = vec4(a_pos, 0.0, 1.0);
    }
  `;

  const fsSource = `
    precision highp float;
    uniform vec2 u_res;
    uniform float u_time;
    uniform float u_dpr;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.55;
      mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
      for (int i = 0; i < 3; i++) {
        v += a * noise(p);
        p = rot * p * 1.92;
        a *= 0.48;
      }
      return v;
    }

    // Evaluates Bliss-style sweeping volumetric silk light ribbons anchored toward upper-right
    vec2 silkField(vec2 p, float t) {
      // Rotate ~32deg so primary light folds fan diagonally from upper-right to left/mid
      mat2 R = mat2(0.848, -0.530, 0.530, 0.848);
      vec2 q = R * (p - vec2(0.24, 0.28));

      // Slow, broad, fluid organic undulation
      float warp1 = fbm(q * 1.15 + vec2(t * 0.11, -t * 0.08));
      float warp2 = fbm(q * 1.55 - vec2(t * 0.07, t * 0.12) + warp1 * 0.75);

      // Ribbon 1: Sweeping bright upper-diagonal caustic crest (upper-right -> mid-left)
      float d1 = q.y + 0.12 * sin(q.x * 2.1 - t * 0.36) + (warp1 - 0.5) * 0.62;
      float crest1 = exp(-abs(d1) * 4.6);
      float glow1  = exp(-abs(d1) * 1.55);

      // Ribbon 2: Secondary curving veil fanning down toward center-right
      vec2 q2 = mat2(0.45, 0.89, -0.89, 0.45) * (p - vec2(0.32, 0.18));
      float d2 = q2.y + 0.15 * cos(q2.x * 1.85 + t * 0.28) + (warp2 - 0.5) * 0.72;
      float crest2 = exp(-abs(d2) * 3.5);
      float glow2  = exp(-abs(d2) * 1.25);

      // Ribbon 3: Broad upper-right atmospheric fan
      float d3 = (q.y - 0.34) + (warp2 - 0.5) * 0.55;
      float glow3 = exp(-abs(d3) * 2.0) * 0.68;

      // Spotlight falloff anchored at upper-right so lower-left & bottom stay deep obsidian
      float falloff = smoothstep(1.62, 0.06, length((p - vec2(0.36, 0.44)) * vec2(0.86, 1.08)));
      float bottomDark = smoothstep(-0.78, 0.24, p.y);

      float intensity = (glow1 * 0.68 + glow2 * 0.56 + glow3 * 0.48) * falloff * (0.28 + 0.72 * bottomDark);
      float hotCore   = (crest1 * 0.82 + crest2 * 0.66) * falloff * (0.35 + 0.65 * bottomDark);

      return vec2(intensity, hotCore);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);

      float t = u_time;

      // Subtle prismatic / chromatic dispersion along the ribbon folds
      vec2 disp = vec2(0.014, -0.010);
      vec2 fR = silkField(p + disp * 1.05, t);
      vec2 fG = silkField(p, t);
      vec2 fB = silkField(p - disp * 1.15, t);

      // Portfolio Blue Spectrum Ramp:
      // Deep Void (#02040A) -> Sapphire (#0B2A78) -> Cobalt (#165EF6) -> Sky (#57C1FF) -> Periwinkle (#B9C8FF) -> Ice Core (#EEF7FF)
      vec3 cVoid       = vec3(0.008, 0.016, 0.042);
      vec3 cSapphire   = vec3(0.043, 0.165, 0.470);
      vec3 cCobalt     = vec3(0.086, 0.369, 0.965);
      vec3 cSky        = vec3(0.341, 0.757, 1.000);
      vec3 cPeriwinkle = vec3(0.690, 0.765, 1.000);
      vec3 cIceWhite   = vec3(0.935, 0.972, 1.000);

      vec3 col = cVoid;
      // Rich volumetric blue layers with chromatic fringe
      col += cSapphire   * smoothstep(0.04, 0.78, fB.x) * 1.05;
      col += cCobalt     * smoothstep(0.14, 0.92, fG.x) * 1.12;
      col += cPeriwinkle * smoothstep(0.24, 0.98, fR.x) * 0.42;
      col += cSky        * pow(clamp(fB.y, 0.0, 1.0), 1.45) * 0.78;

      // Radiant white-ice caustic core at peak intersections
      float core = pow(clamp(fG.y * 0.88 + fR.y * 0.32, 0.0, 1.0), 2.35);
      col = mix(col, cIceWhite, clamp(core * 0.88, 0.0, 0.92));

      // Signature Bliss Agency diagonal micro-dot halftone / screen-print texture (~2.6px pitch)
      float s = 0.70710678;
      vec2 rotCoord = vec2(
        gl_FragCoord.x * s - gl_FragCoord.y * s,
        gl_FragCoord.x * s + gl_FragCoord.y * s
      );
      float pitch = 2.65 * u_dpr;
      vec2 cell = fract(rotCoord / pitch) - 0.5;
      float dotMask = smoothstep(0.47, 0.15, length(cell));

      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      // Strongest tactile micro-dot grain across mid-tones & silk folds, clean in deep void
      float halftoneAmt = smoothstep(0.02, 0.24, lum) * (1.0 - smoothstep(0.82, 1.08, lum) * 0.45);
      col *= mix(1.0, mix(0.74, 1.20, dotMask), halftoneAmt * 0.64);

      // Subtle micro-dither to eliminate 8-bit gradient banding
      col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0;

      // Soft bottom vignette melt
      col *= smoothstep(0.0, 0.22, uv.y) * 0.92 + 0.08;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  const vs = compile(gl.VERTEX_SHADER, vsSource);
  const fs = compile(gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) {
    wrapper.classList.add("is-ready");
    return;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    wrapper.classList.add("is-ready");
    return;
  }

  gl.useProgram(prog);

  // Single oversized triangle covering clip-space (fastest possible fullscreen quad)
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const locPos = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(locPos);
  gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "u_res");
  const uTime = gl.getUniformLocation(prog, "u_time");
  const uDpr = gl.getUniformLocation(prog, "u_dpr");

  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = wrapper.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  let isVisible = true;
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "120px" }
    );
    io.observe(wrapper);
  }

  const start = performance.now();
  function draw(now) {
    if (isVisible && !document.hidden) {
      const elapsed = prefersReduced ? 4.2 : (now - start) * 0.001 + 4.2;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uDpr, dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    if (!prefersReduced) {
      requestAnimationFrame(draw);
    }
  }

  // Render first frame immediately & trigger smooth Bliss fade-in
  draw(start);
  requestAnimationFrame(() => wrapper.classList.add("is-ready"));
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
  // 1. True Progressive Orchid Stacked Card Deck (01 = 1 card, 02 = 1 behind, 03 = 2 behind, 04 = 3 behind!)
  const audienceTabs = document.querySelectorAll("[data-audience-id]");
  const orchidDeck = document.getElementById("orchid-deck");
  const orchidCards = orchidDeck?.querySelectorAll("[data-orchid-card]");
  if (audienceTabs.length && orchidDeck && orchidCards?.length) {
    let activeIdx = 0;

    const applyDeckState = (nextIdx) => {
      activeIdx = nextIdx;
      orchidDeck.setAttribute("data-active-index", String(activeIdx));
      audienceTabs.forEach((t, i) => t.setAttribute("aria-selected", String(i === activeIdx)));

      orchidCards.forEach((card, idx) => {
        card.classList.remove("is-active", "is-past-1", "is-past-2", "is-past-3", "is-future");
        if (idx === activeIdx) {
          card.classList.add("is-active");
          card.setAttribute("aria-hidden", "false");
        } else if (idx < activeIdx) {
          const depth = activeIdx - idx; // 1 = directly behind, 2 = two behind, 3 = three behind
          card.classList.add(`is-past-${Math.min(3, depth)}`);
          card.setAttribute("aria-hidden", "true");
        } else {
          card.classList.add("is-future");
          card.setAttribute("aria-hidden", "true");
        }
      });
    };

    audienceTabs.forEach((tab, idx) => {
      tab.addEventListener("click", () => {
        if (idx === activeIdx) return;
        applyDeckState(idx);
      });
    });

    // Clicking any peeking stacked card behind brings it back to front!
    orchidCards.forEach((card, idx) => {
      card.addEventListener("click", () => {
        if (idx < activeIdx) applyDeckState(idx);
      });
    });

    applyDeckState(0);
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

  // 5. Initialize Bliss Fluid Hero Canvas, Figma UI3 Workspace, Conceptzilla Timeline, Selected Work Parallax & Contact Starfield
  initHeroBlissCanvas();
  initHeroFigmaStage();
  initConceptzillaTimeline();
  initSelectedWorkScrollMotion();
  initContactStarfieldCanvas();
}

function initSelectedWorkScrollMotion() {
  const cards = document.querySelectorAll("[data-parallax-card]");
  if (!cards.length) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight || 800;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > vh + 80) return;
      // Normalized progress from -1 (below viewport) to +1 (above viewport)
      const progress = Math.max(-1, Math.min(1, (rect.top + rect.height * 0.5 - vh * 0.5) / (vh * 0.75)));
      const img = card.querySelector(".project-card__media img");
      if (img) {
        img.style.transform = `translate3d(0, ${(progress * -16).toFixed(1)}px, 0) scale(1.08)`;
      }
      const depth = Math.abs(progress);
      card.style.setProperty("--card-scroll-scale", (1 - depth * 0.018).toFixed(4));
    });
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
}
