/* ==========================================================================
   Homepage Renderer — Exact 8-Section Architecture
   Includes Hero Stagger & Pointer Parallax + Contact Sculpture Composition
   ========================================================================== */

import { getFeaturedProjects } from "../data/projects.js";
import { PROFILE } from "../data/content-en.js";
import { renderProjectCard } from "../components/project-card.js";
import { PRINCIPLE_GLYPHS } from "../components/glyphs.js";

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
      </div>
      <div class="audience-panel__aside">
        <div class="audience-panel__aside-label">${content.audience.recommendedLabel}</div>
        <div class="audience-panel__links">${linksHtml}</div>
      </div>
    </div>
  `;
}

export function renderHomePage(content) {
  const prefix = `/${content.lang}`;
  const featured = getFeaturedProjects();
  const initialAudience = content.audience.items[0];

  return `
    <!-- Section 02 — Hero -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero__grid">
        <div class="hero__copy">
          <div class="eyebrow hero-stagger" style="--stagger-delay:60ms;">
            <span class="eyebrow__dot" aria-hidden="true"></span>
            <span>${content.hero.eyebrow}</span>
          </div>
          <h1 class="hero__title hero-stagger" id="hero-title" style="--stagger-delay:140ms;">
            ${content.hero.headline}
          </h1>
          <div class="hero__intro hero-stagger" style="--stagger-delay:220ms;">
            ${content.hero.intro.map((p) => `<p>${p}</p>`).join("")}
          </div>
          <div class="hero__actions hero-stagger" style="--stagger-delay:300ms;">
            <a class="btn btn--primary btn--lg" href="#selected-work">
              <span>${content.hero.primaryCta}</span>
              <span class="btn__arrow" aria-hidden="true">${content.arrow}</span>
            </a>
            <a class="btn btn--secondary btn--lg" href="${prefix}/about/">
              <span>${content.hero.secondaryCta}</span>
            </a>
          </div>
        </div>

        <div class="hero__visual hero-stagger" style="--stagger-delay:220ms;">
          <div class="sculpture-frame" id="hero-sculpture">
            <img
              src="/assets/sculpture-hero.jpg"
              alt="${content.hero.sculptureAlt}"
              width="720"
              height="720"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03 — Audience Selector (Billy Sweeney-inspired) -->
    <section class="section section--bordered" id="audience" aria-labelledby="audience-heading">
      <div class="container">
        <div class="section-header reveal">
          <div class="eyebrow">${content.audience.eyebrow}</div>
          <h2 class="section-title" id="audience-heading">${content.audience.heading}</h2>
          <p class="section-desc">${content.audience.supporting}</p>
        </div>

        <div class="audience-grid reveal" role="group" aria-label="${content.audience.heading}">
          ${content.audience.items
            .map(
              (item, idx) => `
            <button
              type="button"
              class="audience-card"
              data-audience-id="${item.id}"
              aria-pressed="${idx === 0 ? "true" : "false"}"
            >
              <div class="audience-card__top">
                <span class="audience-card__title">${item.title}</span>
                <span class="audience-card__indicator" aria-hidden="true"></span>
              </div>
              <p class="audience-card__desc">${item.shortDesc}</p>
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

    <!-- Section 05 — Design Approach -->
    <section class="section section--bordered" id="approach" aria-labelledby="approach-heading">
      <div class="container">
        <div class="section-header reveal">
          <div class="eyebrow">${content.approach.eyebrow}</div>
          <h2 class="section-title" id="approach-heading">${content.approach.heading}</h2>
          <p class="section-desc">${content.approach.description}</p>
        </div>

        <div class="principles-list">
          ${content.approach.principles
            .map(
              (p, i) => `
            <article class="principle-card reveal" style="--reveal-delay:${i * 65}ms;">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <div class="principle-card__glyph">${PRINCIPLE_GLYPHS[i]}</div>
                <span class="principle-card__num">${p.num}</span>
              </div>
              <h3 class="principle-card__title">${p.title}</h3>
              <p class="principle-card__desc">${p.description}</p>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- Section 06 — Experience -->
    <section class="section section--bordered" id="experience" aria-labelledby="experience-heading">
      <div class="container">
        <div class="section-header reveal">
          <div class="eyebrow">${content.experience.eyebrow}</div>
          <h2 class="section-title" id="experience-heading">${content.experience.heading}</h2>
          <p class="section-desc">${content.experience.description}</p>
        </div>

        <div class="exp-list">
          ${content.experience.entries
            .map(
              (entry, i) => `
            <div class="exp-row reveal" style="--reveal-delay:${i * 55}ms;">
              <div>
                <div class="exp-row__company">${entry.company}</div>
                <div class="exp-row__domain">${entry.domain}</div>
              </div>
              <div class="exp-row__role">${entry.role}</div>
              <div class="exp-row__period">${entry.period}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="exp-additional reveal">
          <strong>${content.experience.additionalLabel}</strong>
          ${content.experience.additionalNote}
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

    <!-- Section 08 — Contact (with Abstract Sculpture) -->
    <section class="section section--bordered" id="contact" aria-labelledby="contact-heading">
      <div class="container">
        <div class="contact-box reveal">
          <div style="position:relative;z-index:1;">
            <div class="eyebrow">${content.contact.eyebrow}</div>
            <h2 class="section-title" id="contact-heading">${content.contact.heading}</h2>
            <p class="section-desc" style="margin-bottom:28px;">${content.contact.body}</p>
            <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
              <a class="btn btn--primary btn--lg" href="mailto:${PROFILE.email}?subject=Product%20Design%20Inquiry">
                <span>${content.contact.cta}</span>
                <span class="btn__arrow" aria-hidden="true">${content.arrow}</span>
              </a>
            </div>
          </div>

          <div class="contact-right">
            <div style="display:flex;justify-content:center;">
              <div class="sculpture-frame sculpture-frame--contact">
                <img
                  src="/assets/sculpture-contact.jpg"
                  alt="${content.hero.sculptureAlt}"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div class="contact-links">
              ${content.contact.links
                .map(
                  (item) => `
                <a
                  class="contact-link-item"
                  href="${item.href}"
                  ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}
                >
                  <span>${item.label}</span>
                  <span style="color:var(--ink-subtle);font-weight:400;">${item.value} ↗</span>
                </a>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initHomePage(content) {
  // 1. Audience Selector Interaction
  const buttons = document.querySelectorAll("[data-audience-id]");
  const panel = document.getElementById("audience-panel");
  if (buttons.length && panel) {
    let currentId = content.audience.items[0].id;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextId = btn.getAttribute("data-audience-id");
        if (!nextId || nextId === currentId) return;

        const nextItem = content.audience.items.find((i) => i.id === nextId);
        if (!nextItem) return;

        currentId = nextId;
        buttons.forEach((b) =>
          b.setAttribute("aria-pressed", String(b.getAttribute("data-audience-id") === nextId))
        );

        panel.classList.add("is-switching");
        window.setTimeout(() => {
          panel.innerHTML = renderAudiencePanelContent(nextItem, content);
          panel.classList.remove("is-switching");
        }, 160);
      });
    });
  }

  // 2. Subtle Desktop Pointer Parallax on Hero Sculpture (respects reduced-motion)
  const heroSculpture = document.getElementById("hero-sculpture");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (heroSculpture && !prefersReduced && finePointer) {
    heroSculpture.addEventListener("pointermove", (e) => {
      const rect = heroSculpture.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroSculpture.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
    });

    heroSculpture.addEventListener("pointerleave", () => {
      heroSculpture.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  }
}
