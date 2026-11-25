/* ==========================================================================
   Site Footer Component
   ========================================================================== */

import { PROFILE } from "../data/content-en.js";

export function renderFooter(content) {
  return `
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div>
          <p class="site-footer__tagline">${content.footer.tagline}</p>
          <p class="site-footer__tagline" style="margin-top:4px;font-size:0.8125rem;color:var(--ink-subtle);">
            ${content.footer.copyright}
          </p>
        </div>
        <div class="site-footer__links">
          <a href="mailto:${PROFILE.email}">Email</a>
          <a href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="${PROFILE.bento}" target="_blank" rel="noopener noreferrer">Bento</a>
          <a href="${PROFILE.dribbble}" target="_blank" rel="noopener noreferrer">Dribbble</a>
          <a href="${PROFILE.behance}" target="_blank" rel="noopener noreferrer">Behance</a>
        </div>
      </div>
    </footer>
  `;
}
