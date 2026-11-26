/* ==========================================================================
   Section 01 — Symbol Studio-Inspired Open -> Collapse Morphing Header
   Opens with an expanded editorial showcase tray, then folds smoothly into
   a compact centered floating sticky bar on scroll.
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
  const isFa = content.lang === "fa";
  const isHome = activePage === "home";
  const contactHref = isHome ? "#contact" : `${prefix}/#contact`;
  const altLangHref = computeAlternateLangHref(content.lang);
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";

  const statusText = isFa
    ? "طراح محصول · +۴ سال تجربه در B2B، فینتک، GovTech و سیستم‌های طراحی"
    : "Product Designer · 5+ yrs across B2B, Fintech, GovTech & Design Systems";

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
        <!-- Main Bar -->
        <div class="site-nav__bar">
          <a class="site-nav__brand" href="${prefix}/">
            <span class="site-nav__brand-mark" aria-hidden="true">${PROFILE.initials}</span>
            <span class="site-nav__brand-name">${isFa ? "علیرضا فرشچی" : PROFILE.shortName}</span>
          </a>

          <div class="site-nav__links">
            ${navLinksHtml}
          </div>

          <div class="site-nav__actions">
            <button
              type="button"
              class="icon-btn"
              id="theme-toggle"
              aria-label="${isFa ? "تغییر حالت روشن و تاریک" : "Toggle light and dark theme"}"
              aria-pressed="${currentTheme === "dark" ? "true" : "false"}"
              title="${isFa ? "تغییر تم" : "Toggle theme"}"
            >
              <span class="theme-icon-sun">${SUN_ICON}</span>
              <span class="theme-icon-moon">${MOON_ICON}</span>
            </button>

            <a class="lang-switch" href="${altLangHref}" aria-label="Switch language to ${content.nav.switchLang}">
              ${content.nav.switchLang}
            </a>

            <button type="button" class="btn btn--primary btn--sm site-nav__cta-desktop" data-open-chat="chat">
              ${content.nav.cta}
            </button>

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

        <!-- Symbol Studio-Inspired Expanded Tray (Opens on load, smoothly folds shut on scroll) -->
        <div class="site-nav__expanded-tray" aria-label="${isFa ? "دسترسی سریع" : "Quick highlights"}">
          <div class="site-nav__expanded-inner">
            <div class="site-nav__status">
              <span class="site-nav__status-dot" aria-hidden="true"></span>
              <span>${statusText}</span>
            </div>
            <div class="site-nav__quick-chips">
              <a class="nav-chip" href="${prefix}/work/iranserver/">${isFa ? "ایران‌سرور" : "IranServer"}</a>
              <a class="nav-chip" href="${prefix}/work/made-in-iran/">${isFa ? "مید این ایران" : "Made In Iran"}</a>
              <a class="nav-chip" href="${prefix}/work/farano/">${isFa ? "فرانو" : "Farano"}</a>
              <button type="button" class="nav-chip nav-chip--ai" data-open-chat="ai">
                ✦ ${isFa ? "دستیار هوش مصنوعی" : "Ask AI"}
              </button>
            </div>
          </div>
        </div>

        <!-- Smooth Collapsible Drawer (Mobile / Compact Expand) -->
        <div class="site-nav__drawer-wrap" id="site-nav-drawer">
          <div class="site-nav__drawer">
            ${navLinksHtml}
            <button type="button" class="btn btn--primary btn--sm" data-open-chat="chat">
              ${content.nav.cta}
            </button>
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

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("portfolio-theme", next);
      } catch {
        // ignore
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

  nav.querySelectorAll(".site-nav__drawer a, .site-nav__drawer button").forEach((el) => {
    el.addEventListener("click", () => setExpanded(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isExpanded) {
      setExpanded(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (isExpanded && !nav.contains(e.target)) {
      setExpanded(false);
    }
  });

  const onScroll = () => {
    const scrollY = window.scrollY || 0;
    const shouldCompact = scrollY > 96;
    nav.classList.toggle("is-compact", shouldCompact);
    if (!shouldCompact && isExpanded && window.innerWidth > 960) {
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
