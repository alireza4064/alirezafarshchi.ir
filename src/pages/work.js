/* ==========================================================================
   Work Archive Page (/en/work and /fa/work) with Category Filtering
   ========================================================================== */

import { PROJECTS } from "../data/projects.js";
import { renderProjectCard } from "../components/project-card.js";

function getCategoryLabel(cat, content) {
  if (content.lang === "fa" && content.workPage.categoryLabels?.[cat]) {
    return content.workPage.categoryLabels[cat];
  }
  return cat;
}

export function renderWorkPage(content) {
  const filterButtons = [
    `<button type="button" class="filter-pill" data-category="ALL" aria-pressed="true">${content.workPage.allFilter}</button>`,
    ...content.workPage.categories.map(
      (cat) =>
        `<button type="button" class="filter-pill" data-category="${cat}" aria-pressed="false">${getCategoryLabel(cat, content)}</button>`
    ),
  ].join("");

  return `
    <section class="section" style="padding-top:clamp(44px,6vw,76px);">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow__dot" aria-hidden="true"></span>
            <span>${content.workPage.eyebrow}</span>
          </div>
          <h1 class="section-title" style="font-size:clamp(2.1rem,4vw,3.4rem);">${content.workPage.heading}</h1>
          <p class="section-desc">${content.workPage.description}</p>
        </div>

        <div class="filter-bar" role="group" aria-label="Project categories">
          ${filterButtons}
        </div>

        <div class="projects-grid" id="work-projects-grid">
          ${PROJECTS.map((proj, idx) => renderProjectCard(proj, content, idx)).join("")}
        </div>
      </div>
    </section>
  `;
}

export function initWorkPage(content) {
  const buttons = document.querySelectorAll("[data-category]");
  const grid = document.getElementById("work-projects-grid");
  if (!buttons.length || !grid) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-category");
      buttons.forEach((b) =>
        b.setAttribute("aria-pressed", String(b.getAttribute("data-category") === cat))
      );

      const filtered =
        cat === "ALL"
          ? PROJECTS
          : PROJECTS.filter((p) => p.categories.includes(cat));

      if (!filtered.length) {
        grid.innerHTML = `<p style="color:var(--ink-muted);">${content.workPage.emptyState}</p>`;
        return;
      }

      grid.innerHTML = filtered
        .map((proj, idx) => renderProjectCard(proj, content, idx))
        .join("");

      grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    });
  });
}
