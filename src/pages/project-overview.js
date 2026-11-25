/* ==========================================================================
   Public Project Overview Page (/en/work/<slug> and /fa/work/<slug>)
   ========================================================================== */

import { getProjectBySlug } from "../data/projects.js";
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

  const coverHtml = project.cover
    ? `<img src="${project.cover}" alt="${data.title} — ${data.domain}" />`
    : `<div class="project-card__visual-fallback">${renderAbstractVisualSvg(0)}</div>`;

  const liveLinksHtml = project.liveLinks?.length
    ? `
      <div class="overview-block">
        <h2>${content.overviewPage.liveLinksTitle}</h2>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;">
          ${project.liveLinks
            .map(
              (l) =>
                `<a class="btn btn--secondary btn--sm" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`
            )
            .join("")}
        </div>
      </div>
    `
    : "";

  return `
    <article class="overview-hero">
      <div class="container container--narrow">
        <a class="back-link" href="${prefix}/work/">
          <span aria-hidden="true">${content.backArrow}</span>
          <span>${content.overviewPage.backToWork}</span>
        </a>

        <div class="eyebrow">${data.domain}</div>
        <h1 class="section-title" style="font-size:clamp(2.2rem,4.2vw,3.5rem);">${data.title}</h1>
        <p class="section-desc">${data.shortDesc}</p>

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

        <div class="overview-cover">${coverHtml}</div>

        <div class="overview-content">
          <section class="overview-block">
            <h2>${content.overviewPage.problemTitle}</h2>
            <p>${data.problem}</p>
          </section>

          <section class="overview-block">
            <h2>${content.overviewPage.contributionTitle}</h2>
            <ul>
              ${data.contributions.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </section>

          <section class="overview-block">
            <h2>${content.overviewPage.outcomesTitle}</h2>
            <ul>
              ${data.outcomes.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </section>

          <section class="overview-block">
            <h2>${content.overviewPage.visualNoteTitle}</h2>
            <p>${content.overviewPage.visualNoteBody}</p>
          </section>

          ${liveLinksHtml}

          <section class="protected-cta-box" aria-labelledby="protected-cta-title">
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
        </div>
      </div>
    </article>
  `;
}
