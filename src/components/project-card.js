/* ==========================================================================
   Uniform Clean Project Card Component (4:3 Ratio, Consistent Grid)
   ========================================================================== */

export function renderAbstractVisualSvg(seedIndex = 0) {
  const variants = [
    `<svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <rect x="24" y="22" width="52" height="52" rx="16" fill="#FFFFFF" stroke="#D8D6D0"/>
      <circle cx="96" cy="64" r="32" fill="#165EF6" fill-opacity="0.14" stroke="#165EF6" stroke-opacity="0.35"/>
      <rect x="74" y="28" width="44" height="44" rx="12" fill="#B9C8FF" fill-opacity="0.45"/>
    </svg>`,
    `<svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <circle cx="64" cy="60" r="34" fill="#FFFFFF" stroke="#D8D6D0"/>
      <circle cx="96" cy="60" r="34" fill="#165EF6" fill-opacity="0.12" stroke="#165EF6" stroke-opacity="0.4"/>
      <circle cx="80" cy="60" r="10" fill="#165EF6"/>
    </svg>`,
    `<svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <rect x="26" y="34" width="108" height="22" rx="11" fill="#FFFFFF" stroke="#D8D6D0"/>
      <rect x="38" y="64" width="84" height="22" rx="11" fill="#165EF6" fill-opacity="0.16" stroke="#165EF6" stroke-opacity="0.35"/>
      <circle cx="116" cy="45" r="5" fill="#57C1FF"/>
    </svg>`,
  ];
  return variants[seedIndex % variants.length];
}

export function renderProjectCard(project, content, index = 0) {
  const data = project[content.lang];
  const href = `/${content.lang}/work/${project.slug}/`;

  const mediaHtml = project.cover
    ? `<img src="${project.cover}" alt="${data.title} — ${data.domain}" loading="lazy" decoding="async" />`
    : `<div class="project-card__visual-fallback">${renderAbstractVisualSvg(index)}</div>`;

  const numLabel = String(index + 1).padStart(2, "0");

  return `
    <article class="project-card reveal" data-parallax-card="${index}">
      <a href="${href}" style="display:flex;flex-direction:column;height:100%;">
        <div class="project-card__media">
          ${mediaHtml}
          <span class="project-card__index" aria-hidden="true">${numLabel}</span>
        </div>
        <div class="project-card__body">
          <div class="project-card__meta">
            <span class="project-card__domain">${data.domain}</span>
            <span class="project-card__role">${data.role}</span>
          </div>
          <h3 class="project-card__title">${data.title}</h3>
          <p class="project-card__desc">${data.shortDesc}</p>
          <span class="project-card__cta">
            <span>${content.selectedWork.cardCta}</span>
            <span class="project-card__cta-arrow" aria-hidden="true">${content.arrow}</span>
          </span>
        </div>
      </a>
    </article>
  `;
}
