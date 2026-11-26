/* ==========================================================================
   Section 01 — Clean Symbol Studio Morphing Header
   - Transparent geometric favicon (no AF box)
   - Always-present Theme toggle, IR/UK SVG Flag language toggle, and Chat Icon
     inside the header bar from the very start (zero popping on scroll!)
   - Expands as tall Symbol Studio center card on homepage load -> folds into
     razor-tight 48px centered sticky pill on scroll.
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

const BRAND_FAV_SVG = `<svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
  <path d="M7 25L14.2 7H17.8L25 25H21.2L19.6 20.6H12.4L10.8 25H7ZM13.5 17.4H18.5L16 10.6L13.5 17.4Z" fill="#165EF6"/>
  <circle cx="24.5" cy="8.5" r="2.5" fill="#57C1FF"/>
</svg>`;

const SUN_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
  <path d="M12 2.5V5M12 19V21.5M4.93 4.93L6.7 6.7M17.3 17.3L19.07 19.07M2.5 12H5M19 12H21.5M4.93 19.07L6.7 17.3M17.3 6.7L19.07 4.93" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

const MOON_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
</svg>`;

const CHAT_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/* Crisp SVG Flags (Iran & UK) */
const FLAG_IR = `<svg width="18" height="13" viewBox="0 0 18 13" fill="none" aria-hidden="true" style="border-radius:2px;">
  <rect width="18" height="4.33" fill="#239F40"/>
  <rect y="4.33" width="18" height="4.34" fill="#FFFFFF"/>
  <rect y="8.67" width="18" height="4.33" fill="#DA0000"/>
  <circle cx="9" cy="6.5" r="1.35" fill="#DA0000"/>
</svg>`;

const FLAG_UK = `<svg width="18" height="13" viewBox="0 0 18 13" fill="none" aria-hidden="true" style="border-radius:2px;">
  <rect width="18" height="13" fill="#012169"/>
  <path d="M0 0L18 13M18 0L0 13" stroke="#FFFFFF" stroke-width="2.2"/>
  <path d="M0 0L18 13M18 0L0 13" stroke="#C8102E" stroke-width="1"/>
  <path d="M9 0V13M0 6.5H18" stroke="#FFFFFF" stroke-width="3.2"/>
  <path d="M9 0V13M0 6.5H18" stroke="#C8102E" stroke-width="1.8"/>
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

    <!-- Clean Symbol Studio Morphing Header (All controls inside bar from start) -->
    <header class="ss-nav-root ${isHome ? "ss-nav-root--home" : "ss-nav-root--compact"}" id="ss-nav-root">
      <nav class="ss-morph-card" id="site-nav" aria-label="Primary">
        <div class="ss-morph-bar">
          <!-- Transparent Geometric Brand Favicon (No AF background box) -->
          <a class="ss-brand-fav" href="${prefix}/" aria-label="${PROFILE.shortName}">
            ${BRAND_FAV_SVG}
          </a>

          <!-- Nav Links -->
          <div class="ss-links">${navLinksHtml}</div>

          <!-- Unified Controls (Always present in header — Theme, Flags, Chat Icon) -->
          <div class="ss-controls">
            <button
              type="button"
              class="icon-btn"
              data-theme-toggle
              aria-label="${isFa ? "تغییر تم روشن و تاریک" : "Toggle theme"}"
              aria-pressed="${currentTheme === "dark" ? "true" : "false"}"
              title="${isFa ? "تغییر تم" : "Toggle theme"}"
            >
              <span class="theme-icon-sun">${SUN_ICON}</span>
              <span class="theme-icon-moon">${MOON_ICON}</span>
            </button>

            <a
              class="flag-switch"
              href="${altLangHref}"
              aria-label="${isFa ? "Switch to English" : "تغییر زبان به فارسی"}"
              title="${isFa ? "English" : "فارسی"}"
            >
              <span class="flag-item ${!isFa ? "is-active" : ""}">${FLAG_UK}</span>
              <span class="flag-item ${isFa ? "is-active" : ""}">${FLAG_IR}</span>
            </a>

            <a
              class="ss-chat-icon-btn"
              href="${contactHref}"
              aria-label="${content.nav.cta}"
              title="${content.nav.cta}"
            >
              ${CHAT_ICON}
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
          <!-- Expanded Center Hero Box Content (Folds smoothly into 48px pill on scroll) -->
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
