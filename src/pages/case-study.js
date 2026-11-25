/* ==========================================================================
   Protected Case Study Page (/en/case-study/<slug> and /fa/case-study/<slug>)
   Uses Web Crypto AES-256-GCM decryption against separate ciphertext JSON.
   Zero confidential content or passwords exist in public source code.
   ========================================================================== */

import { getProjectBySlug } from "../data/projects.js";
import { PROFILE } from "../data/content-en.js";
import { decryptCaseStudyPayload } from "../lib/crypto-gate.js";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderDecryptedCaseStudy(payload, project, content) {
  const sectionsHtml = (payload.sections || [])
    .map(
      (sec) => `
      <section class="overview-block">
        <h2>${escapeHtml(sec.heading)}</h2>
        ${(sec.paragraphs || []).map((p) => `<p style="margin-bottom:12px;">${escapeHtml(p)}</p>`).join("")}
        ${
          sec.bullets?.length
            ? `<ul>${sec.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
            : ""
        }
      </section>
    `
    )
    .join("");

  return `
    <div class="container container--narrow" style="padding-block:48px 72px;">
      <a class="back-link" href="/${content.lang}/work/${project.slug}/">
        <span aria-hidden="true">${content.backArrow}</span>
        <span>${content.caseStudyPage.backToOverview}</span>
      </a>
      <div class="pill pill--blue" style="margin-bottom:16px;">🔓 Unlocked</div>
      <h1 class="section-title">${escapeHtml(payload.title || project[content.lang].title)}</h1>
      ${payload.subtitle ? `<p class="section-desc" style="margin-bottom:32px;">${escapeHtml(payload.subtitle)}</p>` : ""}
      <div class="overview-content">${sectionsHtml}</div>
    </div>
  `;
}

export function renderCaseStudyPage(content, slug) {
  const project = getProjectBySlug(slug);
  const prefix = `/${content.lang}`;

  if (!project) {
    return `
      <section class="section">
        <div class="container container--narrow">
          <h1 class="section-title">Case study not found</h1>
          <a class="btn btn--secondary" href="${prefix}/work/">${content.overviewPage.backToWork}</a>
        </div>
      </section>
    `;
  }

  const data = project[content.lang];
  const emailSubject = encodeURIComponent(`Case Study Password Request — ${project.en.title}`);

  return `
    <section class="container" id="case-study-root">
      <div class="gate-card">
        <a class="back-link" href="${prefix}/work/${project.slug}/" style="margin-bottom:18px;">
          <span aria-hidden="true">${content.backArrow}</span>
          <span>${content.caseStudyPage.backToOverview}</span>
        </a>

        <div class="gate-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="9" rx="2.5" stroke="currentColor" stroke-width="1.8"/>
            <path d="M8.5 11V8C8.5 6.067 10.067 4.5 12 4.5C13.933 4.5 15.5 6.067 15.5 8V11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="eyebrow" style="margin-bottom:8px;">${content.caseStudyPage.eyebrow}</div>
        <h1 style="font-size:1.6rem;font-weight:700;line-height:1.25;margin-bottom:10px;">
          ${content.caseStudyPage.titlePrefix}${data.title}
        </h1>
        <p style="color:var(--ink-muted);font-size:var(--text-sm);">
          ${content.caseStudyPage.subtitle}
        </p>

        <form class="gate-form" id="case-study-gate-form" novalidate>
          <label class="sr-only" for="case-study-password">${content.caseStudyPage.inputPlaceholder}</label>
          <input
            id="case-study-password"
            class="gate-input"
            type="password"
            autocomplete="off"
            placeholder="${content.caseStudyPage.inputPlaceholder}"
            required
          />
          <div id="gate-status" class="gate-status" role="alert"></div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:4px;">
            <button type="submit" class="btn btn--primary" style="flex:1;">
              ${content.caseStudyPage.unlockBtn}
            </button>
            <a class="btn btn--secondary" href="mailto:${PROFILE.email}?subject=${emailSubject}">
              ${content.caseStudyPage.requestBtn}
            </a>
          </div>
        </form>

        <p style="margin-top:24px;padding-top:18px;border-top:1px solid var(--border);font-size:var(--text-caption);color:var(--ink-subtle);">
          ${content.caseStudyPage.securityNote}
        </p>
      </div>
    </section>
  `;
}

export function initCaseStudyPage(content, slug) {
  const form = document.getElementById("case-study-gate-form");
  const input = document.getElementById("case-study-password");
  const statusEl = document.getElementById("gate-status");
  const root = document.getElementById("case-study-root");
  const project = getProjectBySlug(slug);

  if (!form || !input || !statusEl || !root || !project) return;

  const setStatus = (type, message) => {
    statusEl.className = `gate-status is-${type}`;
    statusEl.textContent = message;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = input.value.trim();
    if (!password) {
      setStatus("error", content.caseStudyPage.emptyError);
      return;
    }

    try {
      const response = await fetch(`/src/data/encrypted-case-studies/${project.slug}.json`, {
        cache: "no-store",
      });
      if (!response.ok) {
        setStatus("info", content.caseStudyPage.notConfiguredInfo);
        return;
      }

      const bundle = await response.json();
      if (!bundle || !bundle.ciphertext) {
        setStatus("info", content.caseStudyPage.notConfiguredInfo);
        return;
      }

      const decrypted = await decryptCaseStudyPayload(bundle, password);
      root.innerHTML = renderDecryptedCaseStudy(decrypted, project, content);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error", content.caseStudyPage.wrongPasswordError);
    }
  });
}
