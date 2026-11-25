/* ==========================================================================
   Section 01 — Animated Opening -> Compact Sticky Navigation
   Preserves current route when switching between English (/en) and Persian (/fa)
   ========================================================================== */

import { PROFILE } from "../data/content-en.js";

function computeAlternateLangHref(currentLang) {
  const targetLang = currentLang === "fa" ? "en" : "fa";
  const path = window.location.pathname || "/";
  const hash = window.location.hash || "";

  if (path === "/" || path === "/index.html") {
    return `/${targetLang}/${hash}`;
  }

  if (path.startsWith(`/${currentLang}/`) || path === `/${currentLang}`) {
    return path.replace(`/${currentLang}`, `/${targetLang}`) + hash;
  }

  return `/${targetLang}/${hash}`;
}

export function renderNavigation(content, activePage) {
  const prefix = `/${content.lang}`;
  const isHome = activePage === "home";
  const contactHref = isHome ? "#contact" : `${prefix}/#contact`;
  const altLangHref = computeAlternateLangHref(content.lang);

  const navLinksHtml = `
    <a class="site-nav__link" href="${prefix}/" ${activePage === "home" ? 'aria-current="page"' : ""}>${content.nav.home}</a>
    <a class="site-nav__link" href="${prefix}/work/" ${activePage === "work" || activePage === "overview" || activePage === "case-study" ? 'aria-current="page"' : ""}>${content.nav.work}</a>
    <a class="site-nav__link" href="${prefix}/about/" ${activePage === "about" ? 'aria-current="page"' : ""}>${content.nav.about}</a>
    <a class="site-nav__link" href="${contactHref}">${content.nav.contact}</a>
    <a class="site-nav__link" href="${PROFILE.resumeUrl}" target="_blank" rel="noopener noreferrer">${content.nav.resume} ↗</a>
  `;

  return `
    <a class="skip-link" href="#main-content">${content.skipToContent}</a>
    <header class="site-nav-wrap">
      <nav class="site-nav" id="site-nav" aria-label="Primary">
        <div class="site-nav__bar">
          <a class="site-nav__brand" href="${prefix}/">
            <span class="site-nav__brand-mark" aria-hidden="true">${PROFILE.initials}</span>
            <span>${content.lang === "fa" ? "علیرضا فرشچی" : PROFILE.shortName}</span>
          </a>

          <div class="site-nav__links">
            ${navLinksHtml}
          </div>

          <div class="site-nav__actions">
            <a class="lang-switch" href="${altLangHref}" aria-label="Switch language to ${content.nav.switchLang}">
              ${content.nav.switchLang}
            </a>
            <a class="btn btn--primary btn--sm site-nav__cta-desktop" href="${contactHref}">
              ${content.nav.cta}
            </a>
            <button
              class="nav-toggle"
              id="nav-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="site-nav-drawer"
            >
              <span data-nav-toggle-label>${content.nav.menu}</span>
            </button>
          </div>
        </div>

        <div class="site-nav__drawer" id="site-nav-drawer">
          ${navLinksHtml}
          <a class="btn btn--primary btn--sm" href="${contactHref}">
            ${content.nav.cta}
          </a>
        </div>
      </nav>
    </header>
  `;
}

export function initNavigation(content) {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const toggleLabel = toggle?.querySelector("[data-nav-toggle-label]");
  if (!nav || !toggle) return;

  let isExpanded = false;

  const setExpanded = (next) => {
    isExpanded = next;
    nav.classList.toggle("is-expanded", isExpanded);
    toggle.setAttribute("aria-expanded", String(isExpanded));
    if (toggleLabel) {
      toggleLabel.textContent = isExpanded ? content.nav.close : content.nav.menu;
    }
  };

  toggle.addEventListener("click", () => setExpanded(!isExpanded));

  // Close drawer when clicking a link inside it
  nav.querySelectorAll(".site-nav__drawer a").forEach((link) => {
    link.addEventListener("click", () => setExpanded(false));
  });

  // Escape key closes expanded menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isExpanded) {
      setExpanded(false);
      toggle.focus();
    }
  });

  // Symbol Studio-inspired scroll collapse -> compact sticky bar
  const onScroll = () => {
    const shouldCompact = window.scrollY > 96;
    nav.classList.toggle("is-compact", shouldCompact);
    if (!shouldCompact && isExpanded && window.innerWidth > 900) {
      setExpanded(false);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
