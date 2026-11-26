/* ==========================================================================
   Smart Contact Behavior Across All Pages
   - On Homepage: smooth-scrolls to #contact section
   - On any Subpage (/work, /about, /work/<slug>, /case-study/<slug>):
     opens the frosted-glass NEW COLLABORATIONS form as a sleek bottom-right
     corner popup with direct Telegram delivery!
   ========================================================================== */

import { PROFILE } from "../data/content-en.js";
import { SITE_CONFIG } from "../config.js";

export function renderContactPopup(content) {
  const isFa = content.lang === "fa";

  return `
    <aside
      class="contact-popup"
      id="contact-popup"
      aria-hidden="true"
      role="dialog"
      aria-labelledby="contact-popup-title"
    >
      <div class="contact-popup__head">
        <div>
          <div class="contact-popup__eyebrow">${isFa ? "همکاری جدید" : "NEW COLLABORATIONS"}</div>
          <h2 class="contact-popup__title" id="contact-popup-title">${content.contact.heading}</h2>
        </div>
        <button type="button" class="icon-btn" id="contact-popup-close" aria-label="${isFa ? "بستن" : "Close"}">
          ✕
        </button>
      </div>

      <form class="contact-popup__form" id="contact-popup-form">
        <div class="bliss-form-row">
          <div class="bliss-field">
            <label for="cp-name">${isFa ? "نام" : "Full name"}</label>
            <input id="cp-name" type="text" required placeholder="${isFa ? "نام شما" : "Your name"}" />
          </div>
          <div class="bliss-field">
            <label for="cp-contact">${isFa ? "ایمیل یا تلگرام" : "Email or Telegram"}</label>
            <input id="cp-contact" type="text" required placeholder="${isFa ? "ایمیل یا @آیدی" : "you@mail.com / @id"}" />
          </div>
        </div>

        <div class="bliss-field">
          <label for="cp-role">${isFa ? "موضوع همکاری" : "What brings you here?"}</label>
          <select id="cp-role">
            <option value="Hiring / Product Role">${isFa ? "فرصت شغلی / استخدام" : "Hiring / Product Role"}</option>
            <option value="Design Systems / Consulting">${isFa ? "سیستم طراحی / مشاوره" : "Design Systems / Consulting"}</option>
            <option value="Freelance Project">${isFa ? "پروژه فریلنسری" : "Freelance Project"}</option>
            <option value="General Chat">${isFa ? "گفت‌وگو و شبکه‌سازی" : "General Conversation"}</option>
          </select>
        </div>

        <div class="bliss-field">
          <label for="cp-msg">${isFa ? "پیام شما" : "The floor is yours"}</label>
          <textarea id="cp-msg" rows="3" required placeholder="${isFa ? "درباره پروژه یا مسئله‌ای که می‌خواهید حل کنید بنویسید..." : "Tell me about the product challenge or opportunity..."}"></textarea>
        </div>

        <div class="bliss-form-status" id="cp-status" role="status"></div>

        <button type="submit" class="bliss-submit-btn">
          <span>${isFa ? "ارسال مستقیم به تلگرام علیرضا" : "Send message to Alireza"}</span>
          <span class="bliss-submit-circle" aria-hidden="true">${content.arrow}</span>
        </button>
      </form>

      <div class="contact-popup__links">
        <a href="mailto:${PROFILE.email}">${PROFILE.email}</a>
        <a href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href="${PROFILE.resumeUrl}" data-open-resume="true">${content.nav.resume} ↗</a>
      </div>
    </aside>
  `;
}

export function initContactPopup(content) {
  const popup = document.getElementById("contact-popup");
  const closeBtn = document.getElementById("contact-popup-close");
  const form = document.getElementById("contact-popup-form");
  const statusEl = document.getElementById("cp-status");
  if (!popup) return;

  let isOpen = false;
  const setOpen = (next) => {
    isOpen = next;
    popup.classList.toggle("is-open", isOpen);
    popup.setAttribute("aria-hidden", String(!isOpen));
  };

  window.openContactPopup = () => setOpen(true);

  // Intercept Contact links across the entire site:
  // - Homepage -> smooth scroll to #contact
  // - Any other page -> open bottom-right Contact Popup!
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("a, button");
    if (!trigger) return;

    const href = trigger.getAttribute("href") || "";
    const isContactLink =
      trigger.hasAttribute("data-open-contact") ||
      href === "#contact" ||
      href.endsWith("/#contact");

    if (!isContactLink) return;

    const isHome = document.documentElement.dataset.page === "home";
    const contactSection = document.getElementById("contact");

    if (isHome && contactSection) {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    e.preventDefault();
    setOpen(!isOpen);
  });

  closeBtn?.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) setOpen(false);
  });

  document.addEventListener("pointerdown", (e) => {
    if (!isOpen) return;
    if (
      popup.contains(e.target) ||
      e.target.closest("[data-open-contact]") ||
      e.target.closest('a[href*="#contact"]')
    ) {
      return;
    }
    setOpen(false);
  });

  if (form && statusEl) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("cp-name")?.value.trim() || "";
      const contact = document.getElementById("cp-contact")?.value.trim() || "";
      const role = document.getElementById("cp-role")?.value || "";
      const msg = document.getElementById("cp-msg")?.value.trim() || "";
      if (!name || !contact || !msg) return;

      const isFa = content.lang === "fa";
      statusEl.textContent = isFa ? "در حال ارسال به تلگرام علیرضا..." : "Sending directly to Alireza's Telegram...";
      statusEl.className = "bliss-form-status is-info";

      let sessionId = "af_popup";
      try {
        sessionId = localStorage.getItem("af-live-chat-session-v1") || "af_" + Date.now().toString(36);
        localStorage.setItem("af-live-chat-session-v1", sessionId);
      } catch {
        // ignore
      }

      if (SITE_CONFIG.WORKER_URL) {
        try {
          const res = await fetch(`${SITE_CONFIG.WORKER_URL.replace(/\/$/, "")}/api/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              sender: `${name} (${role} · ${contact})`,
              text: msg,
              page: window.location.pathname,
            }),
          });
          if (res.ok) {
            form.reset();
            statusEl.textContent = isFa
              ? "✓ پیام مستقیماً به تلگرام علیرضا ارسال شد!"
              : "✓ Sent directly to Alireza's Telegram!";
            statusEl.className = "bliss-form-status is-ok";
            return;
          }
        } catch {
          // fallback below
        }
      }

      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`${role} — ${name}`)}&body=${encodeURIComponent(`${msg}\n\nContact: ${contact}`)}`;
    });
  }
}
