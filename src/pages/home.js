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

import { getFeaturedProjects, getProjectBySlug } from "../data/projects.js";
import { PROFILE } from "../data/content-en.js";
import { SITE_CONFIG } from "../config.js";
import { renderProjectCard } from "../components/project-card.js";
import { PRINCIPLE_GLYPHS } from "../components/glyphs.js";
import { renderHeroFigmaStage, initHeroFigmaStage } from "../components/hero-figma-stage.js";

/* Curated Flagship Products & Companies in Strategic Impact Order */
const MARQUEE_BRANDS = [
  { name: "DELTAFX", slug: "deltafx", style: "tracked" },
  { name: "FARANO", slug: "farano", style: "tracked" },
  { name: "IranServer", slug: "iranserver", style: "bold" },
  { name: "Signal", slug: "signal", style: "italic" },
  { name: "MADE IN IRAN", slug: "made-in-iran", style: "editorial" },
  { name: "MERAT · ARA", slug: "merat-ara", style: "tracked" },
  { name: "Word+", slug: "word-plus", style: "bold" },
  { name: "PART SOFTWARE", slug: "part-design-system", style: "tracked" },
];

const COMPANY_SLUGS = {
  DeltaFX: "deltafx",
  Farano: "farano",
  IranServer: "iranserver",
  "Made In Iran": "made-in-iran",
  "Part Software Group": "part-design-system",
  "Kanon Ghazaei": "kanon-ghazaei",
  Bejatoo: "bejatoo",
};

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
      ${
        COMPANY_SLUGS[item.company]
          ? `<a class="exp-detail__resume-link" href="/${content.lang}/work/${COMPANY_SLUGS[item.company]}/">
              <span>${content.lang === "fa" ? "صفحه پروژه" : "Company page"}</span>
              <span aria-hidden="true">${content.arrow}</span>
            </a>`
          : ""
      }
    </div>
  `;
}

export function renderHomePage(content) {
  const prefix = `/${content.lang}`;
  const isFa = content.lang === "fa";
  // Top 5 Flagship Sticky Cards + 5 Additional Flagship Showcase Cards = All 10 Crown-Jewel Projects!
  const flagshipPrimarySlugs = ["iranserver", "signal", "farano", "made-in-iran", "deltafx"];
  const flagshipSecondarySlugs = ["merat-ara", "part-design-system", "dade-negar", "freedom-park", "word-plus"];
  const flagshipPrimary = flagshipPrimarySlugs.map((s) => getProjectBySlug(s)).filter(Boolean);
  const flagshipSecondary = flagshipSecondarySlugs.map((s) => getProjectBySlug(s)).filter(Boolean);
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
        <!-- Mobile Matching Symbol Studio Dark Hero Card (Hidden on Desktop, Shown on <= 960px) -->
        <div class="container hero-mobile-card-wrap">
          <div class="hero-mobile-card">
            <div class="ss-expanded-eyebrow">${content.hero.eyebrow}</div>
            <div class="hero-mobile-card__title">${content.hero.headline}</div>
            <div class="ss-expanded-preview">
              <img
                src="/assets/sculpture-hero.jpg"
                alt="${content.hero.sculptureAlt}"
                width="480"
                height="220"
                fetchpriority="high"
              />
              <div class="ss-preview-actions">
                <a class="ss-preview-pill ss-preview-pill--primary" href="#selected-work">
                  <span>${content.hero.primaryCta}</span>
                  <span aria-hidden="true">${content.arrow}</span>
                </a>
                <a class="ss-preview-pill" href="#contact">
                  <span>${content.nav.cta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

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

    <!-- Section 04 — Creative Selected Work (Sticky Stacking Editorial Showcase) -->
    <section class="section section--ambient-band" id="selected-work" aria-labelledby="work-heading">
      <div class="container">
        <div class="section-header reveal">
          <div class="eyebrow">${content.selectedWork.eyebrow}</div>
          <h2 class="section-title" id="work-heading">${content.selectedWork.heading}</h2>
          <p class="section-desc">${content.selectedWork.description}</p>
        </div>

        <div class="work-showcase" id="work-showcase">
          ${flagshipPrimary
            .map((proj, idx) => {
              const d = proj[content.lang];
              const href = `${prefix}/work/${proj.slug}/`;
              const tags = (proj.tags || proj.categories || []).slice(0, 3);
              const coverSrc = proj.cover || "/assets/sculpture-hero.jpg";
              return `
                <article class="work-stack-card" style="--card-i:${idx};" data-work-stack="${idx}">
                  <a class="work-stack-card__link" href="${href}">
                    <div class="work-stack-card__media">
                      <img src="${coverSrc}" alt="${d.title} — ${d.domain}" loading="lazy" decoding="async" />
                      <span class="work-stack-card__num">0${idx + 1} / 10</span>
                    </div>
                    <div class="work-stack-card__body">
                      <div class="work-stack-card__top">
                        <span class="work-stack-card__domain">${d.domain}</span>
                        <span class="work-stack-card__timeline">${d.timeline}</span>
                      </div>
                      <h3 class="work-stack-card__title">${d.title}</h3>
                      <p class="work-stack-card__desc">${d.shortDesc}</p>
                      <div class="work-stack-card__tags">
                        ${tags.map((t) => `<span>${t}</span>`).join("")}
                      </div>
                      <div class="work-stack-card__foot">
                        <span class="work-stack-card__role">${d.role}</span>
                        <span class="work-stack-card__cta">
                          <span>${content.selectedWork.cardCta}</span>
                          <span class="work-stack-card__arrow" aria-hidden="true">${content.arrow}</span>
                        </span>
                      </div>
                    </div>
                  </a>
                </article>
              `;
            })
            .join("")}
        </div>

        <!-- Flagship Projects 06–10 Compact Editorial Showcase Grid -->
        <div class="work-flagship-more reveal">
          ${flagshipSecondary
            .map((proj, idx) => {
              const d = proj[content.lang];
              const href = `${prefix}/work/${proj.slug}/`;
              const num = String(idx + 6).padStart(2, "0");
              return `
                <a class="work-mini-card" href="${href}">
                  <div class="work-mini-card__top">
                    <span class="work-mini-card__num">${num}</span>
                    <span class="work-mini-card__domain">${d.domain}</span>
                  </div>
                  <h3 class="work-mini-card__title">${d.title}</h3>
                  <p class="work-mini-card__desc">${d.shortDesc}</p>
                  <span class="work-mini-card__cta">
                    <span>${content.selectedWork.cardCta}</span>
                    <span aria-hidden="true">${content.arrow}</span>
                  </span>
                </a>
              `;
            })
            .join("")}
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

          <!-- Right Interactive Falling Code Portrait + Metrics Column -->
          <div class="about-bento__side">
            <div class="about-portrait-stage" id="about-portrait-stage" aria-label="${PROFILE.name} interactive code portrait">
              <div class="about-matrix-modes" role="group" aria-label="Portrait code color mode">
                <button type="button" class="about-matrix-dot about-matrix-dot--blue is-active" data-matrix-color="blue" title="Cobalt Blue"></button>
                <button type="button" class="about-matrix-dot about-matrix-dot--green" data-matrix-color="green" title="Matrix Green"></button>
                <button type="button" class="about-matrix-dot about-matrix-dot--mono" data-matrix-color="mono" title="Monochrome"></button>
              </div>
              <canvas class="about-portrait-canvas" id="about-portrait-canvas"></canvas>
              <div class="about-bento__visual-tag">
                <img class="about-mini-avatar" src="/assets/alireza-portrait.jpg" alt="${PROFILE.name}" width="32" height="32" loading="lazy" />
                <div>
                  <strong>${isFa ? "علیرضا محمدزاده فرشچی" : "Alireza Farshchi"}</strong>
                  <span>${isFa ? "طراح ارشد محصول · سیستم‌های طراحی" : "Senior Product Designer · Design Systems"}</span>
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
                <a href="${prefix}/work/deltafx/">DeltaFX</a>
                <a href="${prefix}/work/farano/">Farano</a>
                <a href="${prefix}/work/iranserver/">IranServer</a>
                <a href="${prefix}/work/made-in-iran/">Made In Iran</a>
                <a href="${prefix}/work/part-design-system/">Part Software Group</a>
                <a href="${prefix}/work/kanon-ghazaei/">Kanon Ghazaei</a>
                <a href="${prefix}/work/bejatoo/">Bejatoo</a>
                <a href="${prefix}/work/accounting-software/">Hulo / Parmis</a>
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
    uniform float u_light;

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
      // Gently drifting upper-right light focus for lively, unmistakable organic flow
      vec2 drift = vec2(sin(t * 0.42) * 0.14, cos(t * 0.34) * 0.11);
      float ang = 0.56 + sin(t * 0.24) * 0.08;
      float ca = cos(ang);
      float sa = sin(ang);
      mat2 R = mat2(ca, -sa, sa, ca);
      vec2 q = R * (p - (vec2(0.24, 0.28) + drift));

      // Dynamic, fluid silk undulation
      float warp1 = fbm(q * 1.18 + vec2(t * 0.28, -t * 0.22));
      float warp2 = fbm(q * 1.62 - vec2(t * 0.20, t * 0.30) + warp1 * 0.85);

      // Ribbon 1: Sweeping bright upper-diagonal caustic crest (upper-right -> mid-left)
      float d1 = q.y + 0.22 * sin(q.x * 2.15 - t * 0.82) + (warp1 - 0.5) * 0.78;
      float crest1 = exp(-abs(d1) * 4.4);
      float glow1  = exp(-abs(d1) * 1.50);

      // Ribbon 2: Secondary curving veil fanning down toward center-right
      vec2 q2 = mat2(0.45, 0.89, -0.89, 0.45) * (p - (vec2(0.32, 0.18) - drift * 0.65));
      float d2 = q2.y + 0.24 * cos(q2.x * 1.90 + t * 0.68) + (warp2 - 0.5) * 0.84;
      float crest2 = exp(-abs(d2) * 3.4);
      float glow2  = exp(-abs(d2) * 1.22);

      // Ribbon 3: Broad upper-right atmospheric fan
      float d3 = (q.y - 0.32) + 0.14 * sin(q.x * 1.6 + t * 0.55) + (warp2 - 0.5) * 0.65;
      float glow3 = exp(-abs(d3) * 1.95) * 0.72;

      // Spotlight falloff anchored at upper-right so lower-left & bottom stay deep obsidian
      float falloff = smoothstep(1.68, 0.05, length((p - (vec2(0.34, 0.42) + drift * 0.5)) * vec2(0.84, 1.06)));
      float bottomDark = smoothstep(-0.78, 0.24, p.y);

      float intensity = (glow1 * 0.70 + glow2 * 0.58 + glow3 * 0.50) * falloff * (0.28 + 0.72 * bottomDark);
      float hotCore   = (crest1 * 0.85 + crest2 * 0.68) * falloff * (0.35 + 0.65 * bottomDark);

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

      // Dark Mode Blue Spectrum Ramp
      vec3 cVoid       = vec3(0.008, 0.016, 0.042);
      vec3 cSapphire   = vec3(0.043, 0.165, 0.470);
      vec3 cCobalt     = vec3(0.086, 0.369, 0.965);
      vec3 cSky        = vec3(0.341, 0.757, 1.000);
      vec3 cPeriwinkle = vec3(0.690, 0.765, 1.000);
      vec3 cIceWhite   = vec3(0.935, 0.972, 1.000);

      vec3 darkCol = cVoid;
      darkCol += cSapphire   * smoothstep(0.04, 0.78, fB.x) * 1.05;
      darkCol += cCobalt     * smoothstep(0.14, 0.92, fG.x) * 1.12;
      darkCol += cPeriwinkle * smoothstep(0.24, 0.98, fR.x) * 0.42;
      darkCol += cSky        * pow(clamp(fB.y, 0.0, 1.0), 1.45) * 0.78;
      float core = pow(clamp(fG.y * 0.88 + fR.y * 0.32, 0.0, 1.0), 2.35);
      darkCol = mix(darkCol, cIceWhite, clamp(core * 0.88, 0.0, 0.92));

      // Light Mode Luminous Silk Ramp (Porcelain #F5F7FC -> Mist Blue -> Cobalt Silk -> Sunlit Ice Core)
      vec3 lBase       = vec3(0.962, 0.968, 0.986);
      vec3 lMist       = vec3(0.755, 0.855, 0.995);
      vec3 lSky        = vec3(0.365, 0.725, 0.995);
      vec3 lCobalt     = vec3(0.110, 0.390, 0.965);
      vec3 lLavender   = vec3(0.680, 0.755, 0.995);
      vec3 lCore       = vec3(0.985, 0.994, 1.000);

      vec3 lightCol = lBase;
      lightCol = mix(lightCol, lMist,     smoothstep(0.04, 0.76, fB.x) * 0.72);
      lightCol = mix(lightCol, lSky,      smoothstep(0.16, 0.88, fG.x) * 0.68);
      lightCol = mix(lightCol, lCobalt,   smoothstep(0.26, 0.96, fG.y) * 0.64);
      lightCol = mix(lightCol, lLavender, smoothstep(0.20, 0.94, fR.x) * 0.28);
      lightCol = mix(lightCol, lCore,     clamp(core * 0.85, 0.0, 0.88));

      vec3 col = mix(darkCol, lightCol, u_light);

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
      float darkGrainAmt = smoothstep(0.02, 0.24, lum) * (1.0 - smoothstep(0.82, 1.08, lum) * 0.45);
      float lightGrainAmt = smoothstep(0.05, 0.55, fG.x + fB.x * 0.5) * 0.36;
      float grainDark = mix(1.0, mix(0.74, 1.20, dotMask), darkGrainAmt * 0.64);
      float grainLight = mix(1.0, mix(0.90, 1.05, dotMask), lightGrainAmt);
      col *= mix(grainDark, grainLight, u_light);

      // Subtle micro-dither to eliminate 8-bit gradient banding
      col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0;

      // Soft bottom vignette melt into page canvas
      vec3 bottomTarget = mix(vec3(0.008, 0.016, 0.042), vec3(0.969, 0.969, 0.961), u_light);
      col = mix(bottomTarget, col, smoothstep(0.0, 0.24, uv.y) * 0.92 + 0.08);

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
  const uLight = gl.getUniformLocation(prog, "u_light");

  let lightMix = document.documentElement.getAttribute("data-theme") === "dark" ? 0 : 1;

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
      const targetLight = document.documentElement.getAttribute("data-theme") === "dark" ? 0 : 1;
      lightMix += (targetLight - lightMix) * 0.12;
      const elapsed = prefersReduced ? 4.2 : (now - start) * 0.001 + 4.2;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uDpr, dpr);
      gl.uniform1f(uLight, lightMix);
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
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });
  if (!gl) return;

  const vsSource = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  // Mouse-Reactive Bliss Blue Silk + Micro-Dot Halftone Shader tailored for Contact Box
  const fsSource = `
    precision highp float;
    uniform vec2 u_res;
    uniform float u_time;
    uniform float u_dpr;
    uniform vec2 u_mouse;
    uniform float u_hover;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.55;
      mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
      for (int i = 0; i < 3; i++) {
        v += a * noise(p);
        p = rot * p * 1.9;
        a *= 0.48;
      }
      return v;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
      vec2 mp = (u_mouse - 0.5 * u_res) / min(u_res.x, u_res.y);

      float t = u_time;

      // Subtle cursor pull warping the silk flow toward mouse hover
      vec2 toMouse = p - mp;
      float mDist = length(toMouse);
      vec2 mouseWarp = -toMouse * exp(-mDist * 2.2) * 0.22 * u_hover;

      vec2 q = mat2(0.84, -0.54, 0.54, 0.84) * (p + mouseWarp - vec2(0.28, 0.04));
      float w1 = fbm(q * 1.15 + vec2(t * 0.16, -t * 0.13));
      float w2 = fbm(q * 1.55 - vec2(t * 0.11, t * 0.18) + w1 * 0.7);

      float d1 = q.y + 0.18 * sin(q.x * 1.9 - t * 0.48) + (w1 - 0.5) * 0.72;
      float ribbon1 = exp(-abs(d1) * 1.9);
      float crest1  = exp(-abs(d1) * 4.4);

      float d2 = (q.x - 0.16) + 0.20 * cos(q.y * 1.7 + t * 0.38) + (w2 - 0.5) * 0.76;
      float ribbon2 = exp(-abs(d2) * 1.75) * 0.62;

      // Keep left copy zone deeper for high contrast, let silk bloom richer beneath the right glass form card
      float rightBias = smoothstep(0.02, 0.78, uv.x) * 0.72 + 0.28;

      // Soft, restrained interactive spotlight following mouse hover
      float mouseGlow = exp(-mDist * 2.5) * 0.38 * u_hover;

      vec3 cBase     = vec3(0.028, 0.032, 0.046); // Deep obsidian #07080C
      vec3 cSapphire = vec3(0.038, 0.140, 0.420);
      vec3 cCobalt   = vec3(0.086, 0.369, 0.965);
      vec3 cSky      = vec3(0.341, 0.757, 1.000);

      vec3 col = cBase;
      col += cSapphire * (ribbon1 * 0.52 + ribbon2 * 0.42) * rightBias;
      col += cCobalt   * (crest1 * 0.44 * rightBias + mouseGlow * 0.65);
      col += cSky      * (pow(crest1, 2.4) * 0.28 * rightBias + pow(mouseGlow, 1.9) * 0.38);

      // Subtle Bliss diagonal micro-dot halftone texture
      float s = 0.70710678;
      vec2 rc = vec2(gl_FragCoord.x * s - gl_FragCoord.y * s, gl_FragCoord.x * s + gl_FragCoord.y * s);
      vec2 cell = fract(rc / (2.7 * u_dpr)) - 0.5;
      float dotMask = smoothstep(0.46, 0.15, length(cell));
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      col *= mix(1.0, mix(0.82, 1.12, dotMask), smoothstep(0.03, 0.22, lum) * 0.44);

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
  }

  const vs = compile(gl.VERTEX_SHADER, vsSource);
  const fs = compile(gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "u_res");
  const uTime = gl.getUniformLocation(prog, "u_time");
  const uDpr = gl.getUniformLocation(prog, "u_dpr");
  const uMouse = gl.getUniformLocation(prog, "u_mouse");
  const uHover = gl.getUniformLocation(prog, "u_hover");

  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let targetMX = 0;
  let targetMY = 0;
  let curMX = 0;
  let curMY = 0;
  let hoverTarget = 0;
  let hoverCur = 0;
  let isVisible = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = box.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      if (curMX === 0 && curMY === 0) {
        curMX = targetMX = w * 0.35;
        curMY = targetMY = h * 0.55;
      }
    }
  }

  box.addEventListener("pointermove", (e) => {
    const rect = box.getBoundingClientRect();
    targetMX = (e.clientX - rect.left) * dpr;
    targetMY = (rect.height - (e.clientY - rect.top)) * dpr;
    hoverTarget = 1;
  });

  box.addEventListener("pointerleave", () => {
    hoverTarget = 0;
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "120px" }
    );
    io.observe(box);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  const start = performance.now();
  function render(now) {
    if (isVisible && !document.hidden) {
      curMX += (targetMX - curMX) * 0.08;
      curMY += (targetMY - curMY) * 0.08;
      hoverCur += (hoverTarget - hoverCur) * 0.07;
      const elapsed = prefersReduced ? 2.5 : (now - start) * 0.001 + 2.5;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uDpr, dpr);
      gl.uniform2f(uMouse, curMX, curMY);
      gl.uniform1f(uHover, hoverCur);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    if (!prefersReduced) requestAnimationFrame(render);
  }

  render(start);
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

  // 5. Initialize Bliss Fluid Hero Canvas, Figma UI3 Workspace, Conceptzilla Timeline, Selected Work Stack, Interactive Dot Portrait & Contact Starfield
  initHeroBlissCanvas();
  initHeroFigmaStage();
  initConceptzillaTimeline();
  initSelectedWorkScrollMotion();
  initAboutDotPortrait();
  initContactStarfieldCanvas();
}

function initSelectedWorkScrollMotion() {
  const cards = Array.from(document.querySelectorAll("[data-work-stack]"));
  if (!cards.length) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight || 800;

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const nextCard = cards[idx + 1];

      // Subtle inner cover parallax
      const img = card.querySelector(".work-stack-card__media img");
      if (img && rect.bottom > -80 && rect.top < vh + 80) {
        const p = Math.max(-1, Math.min(1, (rect.top + rect.height * 0.5 - vh * 0.5) / (vh * 0.85)));
        img.style.transform = `translate3d(0, ${(p * -14).toFixed(1)}px, 0) scale(1.07)`;
      }

      // Depth scale-down as the NEXT card glides up over this sticky card
      if (nextCard && window.innerWidth > 860) {
        const nextRect = nextCard.getBoundingClientRect();
        const overlapStart = vh * 0.78;
        const overlapEnd = 120;
        const raw = (overlapStart - nextRect.top) / Math.max(1, overlapStart - overlapEnd);
        const progress = Math.max(0, Math.min(1, raw));
        const scale = 1 - progress * 0.045;
        const brightness = 1 - progress * 0.16;
        card.style.transform = `scale(${scale.toFixed(4)})`;
        card.style.filter = `brightness(${brightness.toFixed(3)})`;
      } else {
        card.style.transform = "";
        card.style.filter = "";
      }
    });
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

export function initAboutDotPortrait() {
  const stage = document.getElementById("about-portrait-stage");
  const canvas = document.getElementById("about-portrait-canvas");
  if (!stage || !canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const img = new Image();
  img.src = "/assets/alireza-portrait-cutout.jpg";

  const CODE_CHARS = "0123456789ABCDEF<>/{}[]=+-";

  let width = 0;
  let height = 0;
  let dpr = 1;
  let cols = 0;
  let rows = 0;
  let cell = 5.6;
  let lumGrid = null;
  let dxGrid = null;
  let dyGrid = null;
  let vxGrid = null;
  let vyGrid = null;
  let streams = [];
  let isVisible = true;
  let speedScale = 1;
  let scrollBoost = 0;
  let lastScrollY = window.scrollY || 0;
  let tick = 0;
  let colorMode = "blue"; // "blue" | "green" | "mono"
  const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, active: false, dragging: false };

  stage.querySelectorAll("[data-matrix-color]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      colorMode = btn.getAttribute("data-matrix-color") || "blue";
      stage.querySelectorAll("[data-matrix-color]").forEach((b) =>
        b.classList.toggle("is-active", b === btn)
      );
    });
  });

  function buildPortraitMatrix() {
    const rect = stage.getBoundingClientRect();
    if (rect.width < 20 || rect.height < 20 || !img.naturalWidth) return;

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.floor(rect.width);
    height = Math.floor(rect.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const off = document.createElement("canvas");
    off.width = width;
    off.height = height;
    const octx = off.getContext("2d");
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = width / height;
    let dw = width;
    let dh = height;
    let dx = 0;
    let dy = 0;
    if (boxRatio > 1.45) {
      // Wide full-bleed banner (e.g. /about page): contain-fit & center so full portrait is visible!
      dh = height * 0.92;
      dw = dh * imgRatio;
      dx = (width - dw) * 0.5;
      dy = height * 0.04;
    } else if (imgRatio > boxRatio) {
      dh = height;
      dw = dh * imgRatio;
      dx = (width - dw) * 0.5;
    } else {
      dw = width;
      dh = dw / imgRatio;
      dy = (height - dh) * 0.16;
    }
    octx.drawImage(img, dx, dy, dw, dh);
    const pixels = octx.getImageData(0, 0, width, height).data;

    // Adaptive cell pitch keeps 60fps silky smooth even on 1440px+ full-width banners!
    cell = width > 960 ? 8.6 : width > 640 ? 7.2 : width < 340 ? 5.2 : 5.6;
    cols = Math.ceil(width / cell);
    rows = Math.ceil(height / cell);
    const total = cols * rows;
    lumGrid = new Float32Array(total);
    dxGrid = new Float32Array(total);
    dyGrid = new Float32Array(total);
    vxGrid = new Float32Array(total);
    vyGrid = new Float32Array(total);

    for (let r = 0; r < rows; r++) {
      const py = Math.min(height - 1, Math.floor(r * cell + cell * 0.5));
      for (let c = 0; c < cols; c++) {
        const px = Math.min(width - 1, Math.floor(c * cell + cell * 0.5));
        const idx = (py * width + px) * 4;
        const lum = (0.299 * pixels[idx] + 0.587 * pixels[idx + 1] + 0.114 * pixels[idx + 2]) / 255;
        lumGrid[r * cols + c] = lum < 0.07 ? 0 : lum;
      }
    }

    // Silky, unhurried multi-tier falling speeds (smooth fractional progression)
    streams = Array.from({ length: cols }, (_, c) => {
      const tier = c % 3;
      const baseSpeed =
        tier === 0
          ? 0.21 + Math.random() * 0.12
          : tier === 1
            ? 0.13 + Math.random() * 0.09
            : 0.07 + Math.random() * 0.07;
      return {
        offset: Math.random() * rows,
        offset2: Math.random() * rows,
        speed: baseSpeed,
        trailLen: 16 + Math.floor(Math.random() * 14),
        seed: (c * 19 + Math.floor(Math.random() * 60)) % CODE_CHARS.length,
      };
    });
  }

  function renderFrame() {
    if (isVisible && lumGrid) {
      tick++;
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      // Smoothly slow falling speed on hover/drag; calm silky glide otherwise
      const targetSpeed = mouse.dragging ? 0.06 : mouse.active ? 0.22 : 1.0;
      speedScale += (targetSpeed - speedScale) * 0.06;
      scrollBoost *= 0.9;
      mouse.vx *= 0.82;
      mouse.vy *= 0.82;

      ctx.fillStyle = isDark ? "#060910" : "#eef2f8";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `600 ${Math.round(cell + 0.8)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const rad = mouse.dragging ? 132 : 92;
      const radSq = rad * rad;

      for (let c = 0; c < cols; c++) {
        const st = streams[c];
        if (!prefersReduced) {
          const step = st.speed * speedScale + scrollBoost * 0.04;
          st.offset = (st.offset + step) % rows;
          st.offset2 = (st.offset2 + step * 0.58) % rows;
        }
        const baseX = c * cell + cell * 0.5;

        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c;
          const lum = lumGrid[idx];

          // Continuous fractional trail distance -> ultra-smooth silky motion!
          const d1 = (st.offset - r + rows) % rows;
          const d2 = (st.offset2 - r + rows) % rows;
          const t1 = d1 < st.trailLen ? 1 - d1 / st.trailLen : 0;
          const t2 = d2 < st.trailLen * 0.75 ? 1 - d2 / (st.trailLen * 0.75) : 0;
          const trail = Math.max(t1, t2 * 0.72);
          const isHead = d1 < 1.15 || d2 < 1.05;

          // Skip near-empty background cells on wide banners to keep 60fps silky smooth
          if (lum === 0 && trail < 0.06 && width > 640) continue;

          const baseY = r * cell + cell * 0.5;

          // Velocity-driven Gravity + Elastic Spring Physics on hover & drag!
          if (!prefersReduced) {
            let vx = vxGrid[idx];
            let vy = vyGrid[idx];
            let ox = dxGrid[idx];
            let oy = dyGrid[idx];

            if (mouse.active) {
              const ex = baseX + ox - mouse.x;
              const ey = baseY + oy - mouse.y;
              const distSq = ex * ex + ey * ey;
              if (distSq < radSq && distSq > 0.25) {
                const dist = Math.sqrt(distSq);
                const f = 1 - dist / rad;
                if (mouse.dragging) {
                  // Dragging throws digits off-balance along swipe velocity + subtle downward gravity
                  vx += (mouse.vx * 0.52 + (ex / dist) * 2.4) * f;
                  vy += (mouse.vy * 0.52 + (ey / dist) * 2.4 + 1.35) * f;
                } else {
                  // Gentle hover swirl & subtle velocity wake
                  vx += (mouse.vx * 0.16 + (ex / dist) * 0.85) * f;
                  vy += (mouse.vy * 0.16 + (ey / dist) * 0.85 + 0.25) * f;
                }
              }
            }

            // Spring back cleanly to exact portrait alignment after brief gravity drift
            vx += -ox * 0.088;
            vy += -oy * 0.088;
            vx *= 0.83;
            vy *= 0.83;
            ox += vx;
            oy += vy;

            vxGrid[idx] = vx;
            vyGrid[idx] = vy;
            dxGrid[idx] = ox;
            dyGrid[idx] = oy;
          }

          const ox = dxGrid[idx];
          const oy = dyGrid[idx];
          const disp = Math.abs(ox) + Math.abs(oy);
          const drawX = baseX + ox;
          const drawY = baseY + oy;

          // Slow, calm character evolution
          const charIdx = Math.abs(Math.floor(r - st.offset * 0.75) + st.seed + (disp > 6 ? Math.floor(tick / 4) : 0)) % CODE_CHARS.length;
          const ch = CODE_CHARS[charIdx];

          if (lum > 0) {
            if (isDark) {
              // Dark Mode: bright skin/highlights glow brightest; eyes/beard stay deep for natural relief
              const alpha = Math.min(1, 0.28 + Math.pow(lum, 0.9) * 0.72 + trail * 0.18);
              if ((isHead && lum > 0.42) || disp > 9) {
                ctx.fillStyle = "#ffffff";
              } else if (colorMode === "green") {
                const g = Math.min(255, Math.round(115 + lum * 140 + trail * 30));
                const rC = Math.round(lum > 0.72 ? (lum - 0.72) * 380 : 10);
                ctx.fillStyle = `rgba(${rC},${g},${Math.round(g * 0.55)},${alpha.toFixed(2)})`;
              } else if (colorMode === "mono") {
                const v = Math.min(255, Math.round(95 + lum * 160 + trail * 28));
                ctx.fillStyle = `rgba(${v},${v},${v},${alpha.toFixed(2)})`;
              } else if (disp > 3.5 || (lum > 0.78 && trail > 0.45)) {
                ctx.fillStyle = `rgba(215, 240, 255, ${alpha.toFixed(2)})`;
              } else {
                const b = Math.min(255, Math.round(150 + lum * 105));
                const g = Math.min(255, Math.round(88 + lum * 152));
                const rC = Math.min(255, Math.round(32 + lum * 148));
                ctx.fillStyle = `rgba(${rC},${g},${b},${alpha.toFixed(2)})`;
              }
            } else {
              // Light Mode: natural ink shading (dark eyes, eyebrows, hair & beard = bold deep ink; bright skin = delicate light ink!)
              const ink = Math.pow(Math.max(0, 1 - lum), 0.85);
              const alpha = Math.min(0.96, 0.24 + ink * 0.74 + trail * 0.10);
              if (disp > 9) {
                ctx.fillStyle = "#165ef6";
              } else if (colorMode === "green") {
                const g = Math.round(52 + (1 - ink) * 95);
                ctx.fillStyle = `rgba(6,${g},42,${alpha.toFixed(2)})`;
              } else if (colorMode === "mono") {
                const v = Math.round(14 + (1 - ink) * 120);
                ctx.fillStyle = `rgba(${v},${v},${v},${alpha.toFixed(2)})`;
              } else {
                const rC = Math.round(10 + (1 - ink) * 58);
                const gC = Math.round(30 + (1 - ink) * 92);
                const bC = Math.round(92 + (1 - ink) * 142);
                ctx.fillStyle = `rgba(${rC},${gC},${bC},${alpha.toFixed(2)})`;
              }
            }
          } else {
            const bgAlpha = (isDark ? 0.055 : 0.045) + trail * (isDark ? 0.22 : 0.14);
            const finalBg = bgAlpha * (isHead ? 1.3 : 1);
            if (colorMode === "green") {
              ctx.fillStyle = isDark
                ? `rgba(0, 230, 118, ${finalBg.toFixed(3)})`
                : `rgba(12, 128, 72, ${finalBg.toFixed(3)})`;
            } else if (colorMode === "mono") {
              ctx.fillStyle = isDark
                ? `rgba(170, 182, 204, ${finalBg.toFixed(3)})`
                : `rgba(55, 64, 82, ${finalBg.toFixed(3)})`;
            } else {
              ctx.fillStyle = isDark
                ? `rgba(87, 193, 255, ${finalBg.toFixed(3)})`
                : `rgba(22, 94, 246, ${finalBg.toFixed(3)})`;
            }
          }

          ctx.fillText(ch, drawX, drawY);
        }
      }
    }

    if (!prefersReduced) {
      requestAnimationFrame(renderFrame);
    }
  }

  stage.addEventListener("pointerdown", (e) => {
    if (e.target.closest("[data-matrix-color]")) return;
    const rect = stage.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
    mouse.dragging = true;
    stage.setPointerCapture?.(e.pointerId);
  });

  stage.addEventListener("pointermove", (e) => {
    const rect = stage.getBoundingClientRect();
    const nx = e.clientX - rect.left;
    const ny = e.clientY - rect.top;
    if (mouse.active) {
      mouse.vx = Math.max(-24, Math.min(24, nx - mouse.x));
      mouse.vy = Math.max(-24, Math.min(24, ny - mouse.y));
    }
    mouse.x = nx;
    mouse.y = ny;
    mouse.active = true;
  });

  stage.addEventListener("pointerup", () => {
    mouse.dragging = false;
  });

  stage.addEventListener("pointerleave", () => {
    mouse.active = false;
    mouse.dragging = false;
  });

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY || 0;
      const delta = Math.abs(y - lastScrollY);
      lastScrollY = y;
      if (isVisible) scrollBoost = Math.min(14, scrollBoost + delta * 0.12);
    },
    { passive: true }
  );

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "120px" }
    );
    io.observe(stage);
  }

  img.onload = () => {
    buildPortraitMatrix();
    renderFrame();
  };

  if (img.complete && img.naturalWidth) {
    buildPortraitMatrix();
    renderFrame();
  }

  window.addEventListener(
    "resize",
    () => {
      if (img.naturalWidth) buildPortraitMatrix();
    },
    { passive: true }
  );
}
