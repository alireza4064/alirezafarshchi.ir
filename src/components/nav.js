/* ==========================================================================
   Section 01 — Exact Symbol Studio Morphing Header
   Homepage Initial State:
     - Top-left: standalone brand mark (AF)
     - Top-right: standalone Theme + Lang + "• Let's talk" CTA
     - Top-center: tall rounded Hero Card containing Nav Links + Headline + Visual Pill
   Scrolled State (> 140px) & Subpages:
     - All 3 converge smoothly (680ms cubic-bezier(0.45,0,0.2,1)) into ONE
       centered 48px-tall compact sticky bar!
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

const SUN_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
  <path d="M12 2.5V5M12 19V21.5M4.93 4.93L6.7 6.7M17.3 17.3L19.07 19.07M2.5 12H5M19 12H21.5M4.93 19.07L6.7 17.3M17.3 6.7L19.07 4.93" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

const MOON_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
</svg>`;

export function renderNavigation(content, activePage) {
  const prefix = `/${content.lang}`;
  const isFa = content.lang === "fa";
  const isHome = activePage === "home";
  const contactHref = isHome ? "#contact" : `${prefix}/#contact`;
  const altLangHref = computeAlternateLangHref(content.lang);
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";

  const navLinksHtml = `
    <a class="ss-link" href="${prefix}/" ${activePage === "home" ? 'aria-current="page"' : ""}>${content.nav.home}</a>
    <a class="ss-link" href="${prefix}/work/" ${activePage === "work" || activePage === "overview" || activePage === "case-study" ? 'aria-current="page"' : ""}>${content.nav.work}</a>
    <a class="ss-link" href="${prefix}/about/" ${activePage === "about" ? 'aria-current="page"' : ""}>${content.nav.about}</a>
    <a class="ss-link" href="${contactHref}">${content.nav.contact}</a>
    <a class="ss-link" href="${PROFILE.resumeUrl}" target="_blank" rel="noopener noreferrer">${content.nav.resume} ↗</a>
  `;

  return `
    <div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>
    <a class="skip-link" href="#main-content">${content.skipToContent}</a>

    <!-- Symbol Studio Morphing Navigation System -->
    <header class="ss-nav-root ${isHome ? "ss-nav-root--home" : "ss-nav-root--compact"}" id="ss-nav-root">
      <!-- Standalone Corner Brand (visible when expanded on desktop) -->
      <a class="ss-corner-brand" href="${prefix}/" aria-label="${PROFILE.shortName}">
        <span class="site-nav__brand-mark" aria-hidden="true">${PROFILE.initials}</span>
      </a>

      <!-- Standalone Corner Actions (visible when expanded on desktop) -->
      <div class="ss-corner-actions">
        <button
          type="button"
          class="icon-btn"
          data-theme-toggle
          aria-label="${isFa ? "تغییر حالت روشن و تاریک" : "Toggle light and dark theme"}"
          aria-pressed="${currentTheme === "dark" ? "true" : "false"}"
        >
          <span class="theme-icon-sun">${SUN_ICON}</span>
          <span class="theme-icon-moon">${MOON_ICON}</span>
        </button>
        <a class="lang-switch" href="${altLangHref}">${content.nav.switchLang}</a>
        <a class="ss-cta-btn" href="${contactHref}">
          <span class="ss-cta-dot" aria-hidden="true"></span>
          <span>${content.nav.cta}</span>
        </a>
      </div>

      <!-- Center Morphing Card (Tall Expanded Box on Load -> 48px Sticky Pill on Scroll) -->
      <nav class="ss-morph-card" id="site-nav" aria-label="Primary">
        <div class="ss-morph-bar">
          <!-- Compact-only inline brand -->
          <a class="ss-inline-brand" href="${prefix}/" aria-label="${PROFILE.shortName}">
            <span class="site-nav__brand-mark" aria-hidden="true">${PROFILE.initials}</span>
          </a>

          <!-- Nav Links (centered in expanded card, inline in compact pill) -->
          <div class="ss-links">${navLinksHtml}</div>

          <!-- Compact-only inline actions -->
          <div class="ss-inline-actions">
            <button
              type="button"
              class="icon-btn"
              data-theme-toggle
              aria-label="${isFa ? "تغییر حالت روشن و تاریک" : "Toggle light and dark theme"}"
              aria-pressed="${currentTheme === "dark" ? "true" : "false"}"
            >
              <span class="theme-icon-sun">${SUN_ICON}</span>
              <span class="theme-icon-moon">${MOON_ICON}</span>
            </button>
            <a class="lang-switch" href="${altLangHref}">${content.nav.switchLang}</a>
            <a class="ss-cta-btn" href="${contactHref}">
              <span class="ss-cta-dot" aria-hidden="true"></span>
              <span>${content.nav.cta}</span>
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

        ${
          isHome
            ? `
          <!-- Expanded Center Hero Box Content (Folds smoothly away on scroll like Symbol Studio!) -->
          <div class="ss-expanded-body" aria-hidden="false">
            <div class="ss-expanded-inner">
              <div class="ss-expanded-eyebrow">${content.hero.eyebrow}</div>
              <h1 class="ss-expanded-title" id="hero-title">${content.hero.headline}</h1>
              <div class="ss-expanded-preview">
                <img
                  src="/assets/sculpture-hero.jpg"
                  alt="${content.hero.sculptureAlt}"
                  width="480"
                  height="240"
                  fetchpriority="high"
                />
                <a class="ss-preview-pill" href="#selected-work">
                  <span>${content.hero.primaryCta}</span>
                  <span aria-hidden="true">${content.arrow}</span>
                </a>
              </div>
            </div>
          </div>
        `
            : ""
        }

        <!-- Mobile Collapsible Drawer -->
        <div class="site-nav__drawer-wrap" id="site-nav-drawer">
          <div class="site-nav__drawer">
            ${navLinksHtml}
            <a class="ss-cta-btn" href="${contactHref}">
              <span class="ss-cta-dot" aria-hidden="true"></span>
              <span>${content.nav.cta}</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  `;
}

export function initNavigation(content) {
  const root = document.getElementById("ss-nav-root");
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const toggleLabel = toggle?.querySelector("[data-nav-toggle-label]");
  const progressBar = document.getElementById("scroll-progress");

  // Sync ALL theme toggle buttons (corner + compact inline)
  const themeButtons = document.querySelectorAll("[data-theme-toggle]");
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("portfolio-theme", next);
      } catch {
        // ignore
      }
      themeButtons.forEach((b) => b.setAttribute("aria-pressed", String(next === "dark")));
    });
  });

  if (!root || !nav) return;

  let isExpanded = false;
  const setExpanded = (next) => {
    isExpanded = next;
    nav.classList.toggle("is-expanded", isExpanded);
    toggle?.setAttribute("aria-expanded", String(isExpanded));
    if (toggleLabel) {
      toggleLabel.textContent = isExpanded ? content.nav.close : content.nav.menu;
    }
  };

  toggle?.addEventListener("click", () => setExpanded(!isExpanded));

  nav.querySelectorAll(".site-nav__drawer a").forEach((el) => {
    el.addEventListener("click", () => setExpanded(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isExpanded) {
      setExpanded(false);
      toggle?.focus();
    }
  });

  const isHome = root.classList.contains("ss-nav-root--home");

  const onScroll = () => {
    const scrollY = window.scrollY || 0;
    if (isHome) {
      const shouldCompact = scrollY > 150 || window.innerWidth <= 960;
      root.classList.toggle("is-compact", shouldCompact);
    }

    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
}
