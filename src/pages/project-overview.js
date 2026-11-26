/* ==========================================================================
   Public Project Overview Page (/en/work/<slug> and /fa/work/<slug>)
   TraceRoster-inspired 2-Column Editorial Layout with Sticky Table of Contents,
   Active Section Scroll-Spy, Metadata Strip, and Prev/Next Project Navigation.
   ========================================================================== */

import { PROJECTS, getProjectBySlug } from "../data/projects.js";
import { PROFILE } from "../data/content-en.js";
import { renderAbstractVisualSvg } from "../components/project-card.js";

export function renderProjectOverviewPage(content, slug) {
  const project = getProjectBySlug(slug);
  const prefix = `/${content.lang}`;

  if (!project) {
    return `
      <section class="section">
        <div class="container container--narrow">
          <h1 class="section-title">Project not found</h1>
          <a class="btn btn--secondary" href="${prefix}/work/">${content.overviewPage.backToWork}</a>
        </div>
      </section>
    `;
  }

  const data = project[content.lang];
  const caseStudyHref = `${prefix}/case-study/${project.slug}/`;
  const emailSubject = encodeURIComponent(`Case Study Access Request — ${project.en.title}`);

  const currentIdx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIdx > 0 ? PROJECTS[currentIdx - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = currentIdx >= 0 && currentIdx < PROJECTS.length - 1 ? PROJECTS[currentIdx + 1] : PROJECTS[0];

  const coverHtml = project.cover
    ? `<img src="${project.cover}" alt="${data.title} — ${data.domain}" />`
    : `<div class="project-card__visual-fallback">${renderAbstractVisualSvg(0)}</div>`;

  const tocItems = [
    { id: "sec-overview", num: "01", label: "Overview" },
    { id: "sec-problem", num: "02", label: content.overviewPage.problemTitle },
    { id: "sec-contributions", num: "03", label: content.overviewPage.contributionTitle },
    { id: "sec-outcomes", num: "04", label: content.overviewPage.outcomesTitle },
    { id: "sec-visuals", num: "05", label: content.overviewPage.visualNoteTitle },
  ];

  if (project.liveLinks?.length) {
    tocItems.push({ id: "sec-links", num: "06", label: content.overviewPage.liveLinksTitle });
  }
  tocItems.push({
    id: "sec-case-study",
    num: project.liveLinks?.length ? "07" : "06",
    label: "Full Case Study",
  });

  const focusTags = (project.tags || []).slice(0, 5);

  const liveLinksHtml = project.liveLinks?.length
    ? `
      <section class="proj-section" id="sec-links">
        <div class="proj-section__num">06</div>
        <h2>${content.overviewPage.liveLinksTitle}</h2>
        <div class="proj-live-links">
          ${project.liveLinks
            .map(
              (l) =>
                `<a class="btn btn--secondary btn--sm" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`
            )
            .join("")}
        </div>
      </section>
    `
    : "";

  return `
    <article class="overview-hero">
      <div class="container">
        <div class="proj-layout">
          <!-- Left Sticky TOC Sidebar (TraceRoster Editorial Pattern) -->
          <aside class="proj-sidebar" aria-label="On this page">
            <div class="proj-sidebar__sticky">
              <a class="proj-back-pill" href="${prefix}/work/">
                <span aria-hidden="true">${content.backArrow}</span>
                <span>${content.overviewPage.backToWork}</span>
              </a>

              <div class="proj-sidebar__identity">
                <strong>${data.title}</strong>
                <span>${data.role}</span>
                <span>${data.timeline}</span>
              </div>

              <div class="proj-toc-label">ON THIS PAGE</div>
              <nav class="proj-toc" id="proj-toc">
                ${tocItems
                  .map(
                    (item, idx) => `
                  <a class="proj-toc__link ${idx === 0 ? "is-active" : ""}" href="#${item.id}" data-toc-target="${item.id}">
                    <span class="proj-toc__num">${item.num}</span>
                    <span>${item.label}</span>
                  </a>
                `
                  )
                  .join("")}
              </nav>

              <div class="proj-sidebar__cta">
                <a class="btn btn--primary btn--sm" href="${caseStudyHref}" style="width:100%;justify-content:center;">
                  <span>🔒 Full Case Study</span>
                </a>
              </div>
            </div>
          </aside>

          <!-- Right Main Editorial Reading Column -->
          <div class="proj-main">
            <header class="proj-header" id="sec-overview">
              <div class="eyebrow">${data.domain}</div>
              <h1 class="proj-title">${data.title}</h1>
              <p class="proj-lead">${data.shortDesc}</p>

              ${
                focusTags.length
                  ? `
                <div class="proj-focus-tags">
                  ${focusTags.map((t) => `<span class="proj-tag">${t}</span>`).join("")}
                </div>
              `
                  : ""
              }

              <div class="overview-meta-grid">
                <div>
                  <div class="meta-cell__label">${content.overviewPage.industry}</div>
                  <div class="meta-cell__value">${data.domain}</div>
                </div>
                <div>
                  <div class="meta-cell__label">${content.overviewPage.role}</div>
                  <div class="meta-cell__value">${data.role}</div>
                </div>
                <div>
                  <div class="meta-cell__label">${content.overviewPage.timeline}</div>
                  <div class="meta-cell__value">${data.timeline}</div>
                </div>
                <div>
                  <div class="meta-cell__label">${content.overviewPage.scope}</div>
                  <div class="meta-cell__value">${data.scope}</div>
                </div>
              </div>
            </header>

            <div class="overview-cover">${coverHtml}</div>

            <div class="overview-content">
              <section class="proj-section" id="sec-problem">
                <div class="proj-section__num">02</div>
                <h2>${content.overviewPage.problemTitle}</h2>
                <p>${data.problem}</p>
              </section>

              <section class="proj-section" id="sec-contributions">
                <div class="proj-section__num">03</div>
                <h2>${content.overviewPage.contributionTitle}</h2>
                <ul class="proj-list">
                  ${data.contributions.map((item) => `<li>${item}</li>`).join("")}
                </ul>
              </section>

              <section class="proj-section" id="sec-outcomes">
                <div class="proj-section__num">04</div>
                <h2>${content.overviewPage.outcomesTitle}</h2>
                <div class="proj-outcomes-callout">
                  <ul class="proj-list">
                    ${data.outcomes.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
                </div>
              </section>

              <section class="proj-section" id="sec-visuals">
                <div class="proj-section__num">05</div>
                <h2>${content.overviewPage.visualNoteTitle}</h2>
                <blockquote class="proj-quote">
                  ${content.overviewPage.visualNoteBody}
                </blockquote>
              </section>

              ${liveLinksHtml}

              <section class="protected-cta-box" id="sec-case-study" aria-labelledby="protected-cta-title">
                <div style="max-width:520px;">
                  <div class="pill pill--blue" style="margin-bottom:12px;">
                    <span aria-hidden="true">🔒</span>
                    <span>${content.selectedWork.protectedBadge}</span>
                  </div>
                  <h2 id="protected-cta-title" style="font-size:1.45rem;margin-bottom:8px;">
                    ${content.overviewPage.protectedTitle}
                  </h2>
                  <p style="color:var(--ink-muted);font-size:var(--text-sm);">
                    ${content.overviewPage.protectedDesc}
                  </p>
                </div>
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                  <a class="btn btn--primary" href="${caseStudyHref}">
                    <span>${content.overviewPage.openCaseStudy}</span>
                    <span class="btn__arrow" aria-hidden="true">${content.arrow}</span>
                  </a>
                  <a class="btn btn--secondary" href="mailto:${PROFILE.email}?subject=${emailSubject}">
                    <span>${content.overviewPage.requestAccess}</span>
                  </a>
                </div>
              </section>

              <!-- Prev / Next Project Navigation -->
              <nav class="proj-pager" aria-label="More projects">
                <a class="proj-pager__card" href="${prefix}/work/${prevProject.slug}/">
                  <span class="proj-pager__dir">← Previous Project</span>
                  <strong>${prevProject[content.lang].title}</strong>
                  <span class="proj-pager__meta">${prevProject[content.lang].domain}</span>
                </a>
                <a class="proj-pager__card proj-pager__card--next" href="${prefix}/work/${nextProject.slug}/">
                  <span class="proj-pager__dir">Next Project →</span>
                  <strong>${nextProject[content.lang].title}</strong>
                  <span class="proj-pager__meta">${nextProject[content.lang].domain}</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

export function initProjectOverviewPage() {
  const tocLinks = document.querySelectorAll("[data-toc-target]");
  if (!tocLinks.length) return;

  const sections = Array.from(tocLinks)
    .map((link) => document.getElementById(link.getAttribute("data-toc-target")))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    tocLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("data-toc-target") === id);
    });
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-90px 0px -55% 0px", threshold: 0.01 }
    );
    sections.forEach((sec) => io.observe(sec));
  }
}
