/* ==========================================================================
   Section 01 — Symbol Studio-Inspired Animated Header
   Opens in expanded editorial state -> collapses into compact sticky pill on scroll
   Includes Light/Dark Theme Switcher & Route-Preserving Language Switcher
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

const SUN_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
  <path d="M12 2.5V5M12 19V21.5M4.93 4.93L6.7 6.7M17.3 17.3L19.07 19.07M2.5 12H5M19 12H21.5M4.93 19.07L6.7 17.3M17.3 6.7L19.07 4.93" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

const MOON_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
</svg>`;

export function renderNavigation(content, activePage) {
  const prefix = `/${content.lang}`;
  const isHome = activePage === "home";
  const contactHref = isHome ? "#contact" : `${prefix}/#contact`;
  const altLangHref = computeAlternateLangHref(content.lang);
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";

  const statusText =
    content.lang === "fa"
      ? "طراح محصول · تفکر سیستمی"
      : "Product Designer · Systems Thinker";

  const navLinksHtml = `
    <a class="site-nav__link" href="${prefix}/" ${activePage === "home" ? 'aria-current="page"' : ""}>${content.nav.home}</a>
    <a class="site-nav__link" href="${prefix}/work/" ${activePage === "work" || activePage === "overview" || activePage === "case-study" ? 'aria-current="page"' : ""}>${content.nav.work}</a>
    <a class="site-nav__link" href="${prefix}/about/" ${activePage === "about" ? 'aria-current="page"' : ""}>${content.nav.about}</a>
    <a class="site-nav__link" href="${contactHref}">${content.nav.contact}</a>
    <a class="site-nav__link" href="${PROFILE.resumeUrl}" target="_blank" rel="noopener noreferrer">${content.nav.resume} ↗</a>
  `;

  return `
    <div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>
    <a class="skip-link" href="#main-content">${content.skipToContent}</a>
    <header class="site-nav-wrap">
      <nav class="site-nav" id="site-nav" aria-label="Primary">
        <!-- Expanded Top Metadata Strip (collapses smoothly on scroll like Symbol Studio) -->
        <div class="site-nav__meta-strip" aria-hidden="false">
          <div class="site-nav__meta-inner">
            <span class="site-nav__status">
              <span class="site-nav__status-dot" aria-hidden="true"></span>
              <span>${statusText}</span>
            </span>
            <span class="site-nav__domain-tag">${PROFILE.domain}</span>
          </div>
        </div>

        <!-- Main Navigation Bar -->
        <div class="site-nav__bar">
          <a class="site-nav__brand" href="${prefix}/">
            <span class="site-nav__brand-mark" aria-hidden="true">${PROFILE.initials}</span>
            <span class="site-nav__brand-name">${content.lang === "fa" ? "علیرضا فرشچی" : PROFILE.shortName}</span>
          </a>

          <div class="site-nav__links">
            ${navLinksHtml}
          </div>

          <div class="site-nav__actions">
            <button
              type="button"
              class="icon-btn"
              id="theme-toggle"
              aria-label="${content.lang === "fa" ? "تغییر حالت روشن و تاریک" : "Toggle light and dark theme"}"
              aria-pressed="${currentTheme === "dark" ? "true" : "false"}"
              title="${content.lang === "fa" ? "تغییر تم" : "Toggle theme"}"
            >
              <span class="theme-icon-sun">${SUN_ICON}</span>
              <span class="theme-icon-moon">${MOON_ICON}</span>
            </button>

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
              <span class="nav-toggle__bars" aria-hidden="true">
                <span></span>
                <span></span>
              </span>
              <span data-nav-toggle-label>${content.nav.menu}</span>
            </button>
          </div>
        </div>

        <!-- Smooth Collapsible Drawer (Expandable in Compact & Mobile states) -->
        <div class="site-nav__drawer-wrap" id="site-nav-drawer">
          <div class="site-nav__drawer">
            ${navLinksHtml}
            <a class="btn btn--primary btn--sm" href="${contactHref}">
              ${content.nav.cta}
            </a>
          </div>
        </div>
      </nav>
    </header>
  `;
}

export function initNavigation(content) {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const toggleLabel = toggle?.querySelector("[data-nav-toggle-label]");
  const themeToggle = document.getElementById("theme-toggle");
  const progressBar = document.getElementById("scroll-progress");

  // Theme Toggle Logic
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("portfolio-theme", next);
      } catch {
        // Ignore storage restrictions
      }
      themeToggle.setAttribute("aria-pressed", String(next === "dark"));
    });
  }

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

  nav.querySelectorAll(".site-nav__drawer a").forEach((link) => {
    link.addEventListener("click", () => setExpanded(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isExpanded) {
      setExpanded(false);
      toggle.focus();
    }
  });

  // Close drawer when clicking outside nav
  document.addEventListener("click", (e) => {
    if (isExpanded && !nav.contains(e.target)) {
      setExpanded(false);
    }
  });

  // Scroll collapse (Symbol Studio behavior) + top scroll progress bar
  const onScroll = () => {
    const scrollY = window.scrollY || 0;
    const shouldCompact = scrollY > 88;
    nav.classList.toggle("is-compact", shouldCompact);
    if (!shouldCompact && isExpanded && window.innerWidth > 900) {
      setExpanded(false);
    }

    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
