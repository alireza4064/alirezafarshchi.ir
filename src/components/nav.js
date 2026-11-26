/* ==========================================================================
   Section 01 — Ultra-Clean Symbol Studio Morphing Header
   - No logo inside header (favicon stays in browser tab only)
   - Nav Links + Minimal Theme Icon + Single Tiny Flag (target language only)
   - "Let's talk" button lives cleanly alongside "Explore my work" in the Hero
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

const SUN_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
  <path d="M12 2.5V5M12 19V21.5M4.93 4.93L6.7 6.7M17.3 17.3L19.07 19.07M2.5 12H5M19 12H21.5M4.93 19.07L6.7 17.3M17.3 6.7L19.07 4.93" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

const MOON_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
</svg>`;

const FLAG_IR = `<svg width="16" height="11" viewBox="0 0 18 13" fill="none" aria-hidden="true" style="border-radius:2px;">
  <rect width="18" height="4.33" fill="#239F40"/>
  <rect y="4.33" width="18" height="4.34" fill="#FFFFFF"/>
  <rect y="8.67" width="18" height="4.33" fill="#DA0000"/>
  <circle cx="9" cy="6.5" r="1.2" fill="#DA0000"/>
</svg>`;

const FLAG_UK = `<svg width="16" height="11" viewBox="0 0 18 13" fill="none" aria-hidden="true" style="border-radius:2px;">
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

    <header class="ss-nav-root ${isHome ? "ss-nav-root--home" : "ss-nav-root--compact"}" id="ss-nav-root">
      <nav class="ss-morph-card" id="site-nav" aria-label="Primary">
        <div class="ss-morph-bar">
          <div class="ss-links">${navLinksHtml}</div>

          <div class="ss-controls">
            <button
              type="button"
              class="ss-mini-btn"
              data-theme-toggle
              aria-label="${isFa ? "تغییر تم روشن و تاریک" : "Toggle theme"}"
              aria-pressed="${currentTheme === "dark" ? "true" : "false"}"
              title="${isFa ? "تغییر تم" : "Toggle theme"}"
            >
              <span class="theme-icon-sun">${SUN_ICON}</span>
              <span class="theme-icon-moon">${MOON_ICON}</span>
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

        ${
          isHome
            ? `
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
                <div class="ss-preview-actions">
                  <a class="ss-preview-pill ss-preview-pill--primary" href="#selected-work">
                    <span>${content.hero.primaryCta}</span>
                    <span aria-hidden="true">${content.arrow}</span>
                  </a>
                  <a class="ss-preview-pill" href="#contact">
                    <span>${content.nav.cta}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `
            : ""
        }

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
    btn.addEventListener("click", (e) => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      const applyTheme = () => {
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem("portfolio-theme", next);
        } catch {
          // ignore
        }
        themeButtons.forEach((b) => b.setAttribute("aria-pressed", String(next === "dark")));
      };

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || prefersReduced) {
        applyTheme();
        return;
      }

      const rect = btn.getBoundingClientRect();
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(applyTheme);
      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 1050,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
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
