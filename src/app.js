/* ==========================================================================
   Application Entry Point — Bootstraps Nav, Page View, Assistant & Footer
   ========================================================================== */

import { CONTENT_EN } from "./data/content-en.js";
import { CONTENT_FA } from "./data/content-fa.js";
import { renderNavigation, initNavigation } from "./components/nav.js";
import { renderFooter } from "./components/footer.js";
import { renderAssistantAndChat, initAssistantAndChat } from "./components/assistant.js";
import { renderResumeModal, initResumeModal } from "./components/resume-modal.js";
import { renderContactPopup, initContactPopup } from "./components/contact-popup.js";
import { renderHomePage, initHomePage, initAboutDotPortrait } from "./pages/home.js";
import { renderWorkPage, initWorkPage } from "./pages/work.js";
import { renderProjectOverviewPage, initProjectOverviewPage } from "./pages/project-overview.js";
import { renderCaseStudyPage, initCaseStudyPage } from "./pages/case-study.js";
import { renderAboutPage } from "./pages/about.js";

function initRevealObserver() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
  );

  els.forEach((el) => observer.observe(el));
}

function bootstrap() {
  const app = document.getElementById("app");
  if (!app) return;

  const lang = document.documentElement.dataset.lang === "fa" ? "fa" : "en";
  const page = document.documentElement.dataset.page || "home";
  const slug =
    document.documentElement.dataset.slug ||
    new URLSearchParams(window.location.search).get("slug") ||
    "";

  const content = lang === "fa" ? CONTENT_FA : CONTENT_EN;
  document.documentElement.lang = content.lang;
  document.documentElement.dir = content.dir;

  let mainHtml = "";
  if (page === "home") {
    mainHtml = renderHomePage(content);
  } else if (page === "work") {
    mainHtml = renderWorkPage(content);
  } else if (page === "overview") {
    mainHtml = renderProjectOverviewPage(content, slug);
  } else if (page === "case-study") {
    mainHtml = renderCaseStudyPage(content, slug);
  } else if (page === "about") {
    mainHtml = renderAboutPage(content);
  }

  app.innerHTML = `
    ${renderNavigation(content, page)}
    <main id="main-content">${mainHtml}</main>
    ${renderFooter(content)}
    ${renderAssistantAndChat(content)}
    ${renderResumeModal(content)}
    ${renderContactPopup(content)}
  `;

  initNavigation(content);
  initAssistantAndChat(content);
  initResumeModal();
  initContactPopup(content);

  if (page === "home") initHomePage(content);
  if (page === "work") initWorkPage(content);
  if (page === "overview") initProjectOverviewPage();
  if (page === "case-study") initCaseStudyPage(content, slug);
  if (page === "about") initAboutDotPortrait();

  initRevealObserver();
}

bootstrap();
