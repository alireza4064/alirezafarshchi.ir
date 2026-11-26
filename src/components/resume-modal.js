/* ==========================================================================
   Interactive In-Page Resume Modal
   - Opens automatically on any Resume button/link across the entire site
   - Displays Alireza's full structured resume instantly in 0ms (Light & Dark)
   - Includes Direct PDF Download (Google Drive) + Browser Print/Save PDF
   ========================================================================== */

import { PROFILE } from "../data/content-en.js";

export function renderResumeModal(content) {
  const isFa = content.lang === "fa";
  const entries = content.experience.entries || [];
  const freelance = content.experience.freelanceEntries || [];

  return `
    <div class="resume-modal-backdrop" id="resume-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="resume-modal-title">
      <div class="resume-modal" role="document">
        <header class="resume-modal__header">
          <div class="resume-modal__brand">
            <img class="resume-modal__avatar" src="/assets/alireza-portrait.jpg" alt="${PROFILE.name}" width="36" height="36" />
            <div>
              <h2 class="resume-modal__title" id="resume-modal-title">${isFa ? "رزومه علیرضا محمدزاده فرشچی" : PROFILE.name}</h2>
              <p class="resume-modal__sub">${isFa ? "طراح ارشد محصول · بیش از ۵ سال تجربه" : "Senior Product Designer · 5+ Years Experience"}</p>
            </div>
          </div>

          <div class="resume-modal__actions">
            <button type="button" class="btn btn--secondary btn--sm" id="resume-print-btn">
              <span>${isFa ? "چاپ / ذخیره PDF" : "Print / Save PDF"}</span>
            </button>
            <a class="btn btn--primary btn--sm" href="${PROFILE.resumeUrl}" target="_blank" rel="noopener noreferrer" data-resume-external="true">
              <span>${isFa ? "نسخه PDF اصلی ↗" : "Open PDF ↗"}</span>
            </a>
            <button type="button" class="icon-btn" id="resume-modal-close" aria-label="${isFa ? "بستن" : "Close"}">
              ✕
            </button>
          </div>
        </header>

        <div class="resume-modal__body">
          <!-- Contact & Links Strip -->
          <div class="resume-sheet__meta">
            <a href="mailto:${PROFILE.email}">${PROFILE.email}</a>
            <span>·</span>
            <a href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <span>·</span>
            <a href="https://alirezafarshchi.ir" target="_blank" rel="noopener noreferrer">alirezafarshchi.ir</a>
            <span>·</span>
            <span>${isFa ? "ایران / ریموت" : "Iran / Remote"}</span>
          </div>

          <!-- Summary -->
          <section class="resume-sheet__sec">
            <h3>${isFa ? "خلاصه حرفه‌ای" : "Profile Summary"}</h3>
            <p>${content.hero.intro[0]}</p>
            <p style="margin-top:8px;">${content.about.paragraphs[1]}</p>
          </section>

          <!-- Experience -->
          <section class="resume-sheet__sec">
            <h3>${isFa ? "سوابق کاری" : "Work Experience"}</h3>
            <div class="resume-sheet__list">
              ${entries
                .map(
                  (e) => `
                <div class="resume-sheet__item">
                  <div class="resume-sheet__item-head">
                    <div>
                      <strong>${e.company}</strong>
                      <span class="resume-sheet__role"> — ${e.role}</span>
                    </div>
                    <span class="resume-sheet__period">${e.period}</span>
                  </div>
                  <div class="resume-sheet__domain">${e.domain} · ${e.location}</div>
                  <ul>
                    ${e.highlights.map((h) => `<li>${h}</li>`).join("")}
                  </ul>
                </div>
              `
                )
                .join("")}
            </div>
          </section>

          <!-- Freelance & Overlapping Engagements -->
          <section class="resume-sheet__sec">
            <h3>${isFa ? "پروژه‌های فریلنسری و موازی" : "Freelance & Remote Engagements"}</h3>
            <div class="resume-sheet__freelance">
              ${freelance
                .map(
                  (f) => `
                <div class="resume-sheet__fcard">
                  <div class="resume-sheet__item-head">
                    <strong>${f.company}</strong>
                    <span class="resume-sheet__period">${f.period}</span>
                  </div>
                  <div class="resume-sheet__domain">${f.role} · ${f.domain}</div>
                  <p>${f.summary}</p>
                </div>
              `
                )
                .join("")}
            </div>
          </section>

          <!-- Core Skills & Certifications -->
          <section class="resume-sheet__sec">
            <h3>${isFa ? "مهارت‌های کلیدی و گواهینامه‌ها" : "Core Skills & Credentials"}</h3>
            <div class="resume-sheet__pills">
              <span>Product Design</span>
              <span>Design Systems & Tokens</span>
              <span>Figma UI3 / Variables</span>
              <span>Information Architecture</span>
              <span>User Research & Usability Testing</span>
              <span>GA4 & Microsoft Clarity</span>
              <span>Material Design 3 & Tailwind</span>
              <span>AI-Assisted Design & QA Workflows</span>
              <span>IBM Enterprise Design Thinking</span>
              <span>Part College UI/UX Instructor</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}

export function initResumeModal() {
  const modal = document.getElementById("resume-modal");
  const closeBtn = document.getElementById("resume-modal-close");
  const printBtn = document.getElementById("resume-print-btn");
  if (!modal) return;

  let isOpen = false;

  const setOpen = (next) => {
    isOpen = next;
    modal.classList.toggle("is-open", isOpen);
    modal.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  window.openResumeModal = () => setOpen(true);

  // Intercept any Resume link across the site (except explicit external PDF button inside modal)
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a, button");
    if (!link) return;
    if (link.hasAttribute("data-resume-external")) return;

    const isResumeTrigger =
      link.hasAttribute("data-open-resume") ||
      (link.tagName === "A" && link.getAttribute("href") === PROFILE.resumeUrl);

    if (isResumeTrigger) {
      e.preventDefault();
      setOpen(true);
    }
  });

  closeBtn?.addEventListener("click", () => setOpen(false));
  printBtn?.addEventListener("click", () => window.print());

  modal.addEventListener("pointerdown", (e) => {
    if (e.target === modal) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) setOpen(false);
  });
}
