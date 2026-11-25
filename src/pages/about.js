/* ==========================================================================
   About Page (/en/about and /fa/about)
   Full narrative, real portrait chip, career timeline, transparent freelance
   engagements, skills matrix, education, and real certifications.
   ========================================================================== */

import { PROFILE } from "../data/content-en.js";

export function renderAboutPage(content) {
  const a = content.aboutPage;

  return `
    <!-- Intro -->
    <section class="section" style="padding-top:clamp(44px,6vw,76px);">
      <div class="container about-grid">
        <div>
          <div class="about-portrait-chip">
            <img src="/assets/alireza-portrait.jpg" alt="${PROFILE.name}" width="48" height="48" />
            <div>
              <div style="font-weight:700;font-size:0.95rem;color:var(--ink);">
                ${content.lang === "fa" ? "علیرضا محمدزاده فرشچی" : PROFILE.name}
              </div>
              <div style="font-size:0.8rem;color:var(--ink-muted);">
                ${content.lang === "fa" ? "طراح محصول · +۴ سال تجربه" : "Product Designer · 4+ Years Experience"}
              </div>
            </div>
          </div>

          <div class="eyebrow">
            <span class="eyebrow__dot" aria-hidden="true"></span>
            <span>${a.eyebrow}</span>
          </div>
          <h1 class="section-title" style="font-size:clamp(2.2rem,4.2vw,3.5rem);">${a.heading}</h1>
          <p class="section-desc" style="margin-bottom:24px;">${a.lead}</p>
          <div class="about-body">
            ${content.about.paragraphs.map((p) => `<p>${p}</p>`).join("")}
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px;">
            <a class="btn btn--primary" href="${PROFILE.resumeUrl}" target="_blank" rel="noopener noreferrer">
              <span>${content.experience.cta}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a class="btn btn--secondary" href="mailto:${PROFILE.email}">
              <span>${PROFILE.email}</span>
            </a>
          </div>
        </div>

        <div>
          <div class="sculpture-frame sculpture-frame--landscape">
            <img src="/assets/sculpture-about.jpg" alt="${content.about.sculptureAlt}" />
          </div>
        </div>
      </div>
    </section>

    <!-- Full Professional Timeline -->
    <section class="section section--bordered">
      <div class="container container--narrow">
        <h2 class="section-title" style="margin-bottom:32px;">${a.experienceHeading}</h2>
        <div style="display:grid;gap:20px;">
          ${content.experience.entries
            .map(
              (entry) => `
            <article class="overview-block reveal">
              <div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:10px;">
                <div>
                  <h3 style="font-size:1.25rem;font-weight:700;">${entry.company}</h3>
                  <div style="color:var(--primary-text-on-soft);font-weight:600;font-size:var(--text-sm);">${entry.role}</div>
                </div>
                <div style="text-align:end;">
                  <div style="font-weight:600;font-size:var(--text-sm);">${entry.period}</div>
                  <div style="color:var(--ink-subtle);font-size:var(--text-caption);">${entry.domain} · ${entry.location}</div>
                </div>
              </div>
              <ul>
                ${entry.highlights.map((h) => `<li>${h}</li>`).join("")}
              </ul>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- Transparent Overlapping Freelance Work -->
    <section class="section section--bordered">
      <div class="container container--narrow">
        <h2 class="section-title" style="margin-bottom:12px;">${a.freelanceHeading}</h2>
        <p class="section-desc" style="margin-bottom:28px;">${content.experience.additionalNote}</p>
        <div style="display:grid;gap:16px;">
          ${content.experience.freelanceEntries
            .map(
              (item) => `
            <article class="overview-block reveal">
              <div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:8px;">
                <div>
                  <h3 style="font-size:1.1rem;font-weight:700;">${item.company}</h3>
                  <div style="color:var(--primary-text-on-soft);font-size:var(--text-sm);font-weight:500;">${item.role}</div>
                </div>
                <div style="font-size:var(--text-sm);color:var(--ink-muted);">${item.period}</div>
              </div>
              <p style="margin-bottom:10px;">${item.summary}</p>
              <div class="pill">${item.overlapNote}</div>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- Skills Matrix -->
    <section class="section section--bordered">
      <div class="container container--narrow">
        <h2 class="section-title" style="margin-bottom:28px;">${a.skillsHeading}</h2>
        <div class="skills-grid">
          ${a.skillGroups
            .map(
              (group) => `
            <div class="skill-group reveal">
              <h3>${group.title}</h3>
              <div class="skill-tags">
                ${group.items.map((skill) => `<span class="pill">${skill}</span>`).join("")}
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- Education & Certifications -->
    <section class="section section--bordered">
      <div class="container container--narrow">
        <h2 class="section-title" style="margin-bottom:28px;">${a.educationHeading}</h2>

        <div class="overview-block reveal" style="margin-bottom:20px;">
          <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;">
            <div>
              <h3 style="font-size:1.15rem;font-weight:700;">${a.education.school}</h3>
              <p style="color:var(--primary-text-on-soft);font-weight:500;">${a.education.degree}</p>
            </div>
            <div style="color:var(--ink-muted);font-size:var(--text-sm);">
              ${a.education.period} · ${a.education.location}
            </div>
          </div>
        </div>

        <div class="skills-grid">
          ${a.certifications
            .map(
              (cert) => `
            <article class="cert-card reveal">
              <div class="cert-card__org">${cert.org}</div>
              <h3 style="font-size:1rem;font-weight:600;line-height:1.4;">${cert.title}</h3>
              ${
                cert.url
                  ? `<a href="${cert.url}" target="_blank" rel="noopener noreferrer" style="color:var(--primary-text-on-soft);font-size:var(--text-sm);font-weight:600;margin-top:6px;">Verify credential ↗</a>`
                  : ""
              }
              ${
                cert.image
                  ? `<img src="${cert.image}" alt="${cert.title}" loading="lazy" style="margin-top:12px;border-radius:10px;border:1px solid var(--border);" />`
                  : ""
              }
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
