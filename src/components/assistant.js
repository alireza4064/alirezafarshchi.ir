/* ==========================================================================
   Bilingual AI Portfolio Assistant + Two-Way Live Telegram Chat Widget
   - Tab 1: Grounded AI Resume Assistant (instant local knowledge engine +
            optional Cloudflare Worker LLM upgrade)
   - Tab 2: Live Chat with Alireza (two-way Telegram Bot via Cloudflare Worker,
            with graceful email/Telegram fallback before Worker setup)
   ========================================================================== */

import { PROFILE } from "../data/content-en.js";
import { SITE_CONFIG } from "../config.js";

const SESSION_KEY = "af-live-chat-session-v1";
const HISTORY_KEY = "af-live-chat-history-v1";

function getOrCreateSessionId() {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = "af_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "af_guest";
  }
}

function loadChatHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveChatHistory(messages) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-40)));
  } catch {
    // ignore
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* --- Grounded Bilingual Resume & Portfolio Knowledge Engine --- */
function answerFromKnowledgeBase(query, lang) {
  const q = query.toLowerCase();
  const isFa = lang === "fa" || /[\u0600-\u06FF]/.test(query);

  // IranServer
  if (/(iranserver|hosting|vps|bounce|clarity|ga4|Ø§ÛŒØ±Ø§Ù†\s?Ø³Ø±ÙˆØ±|Ù‡Ø§Ø³Øª|Ù¾Ø±Ø´)/.test(q)) {
    return isFa
      ? "Ø¯Ø± **Ø§ÛŒØ±Ø§Ù†â€ŒØ³Ø±ÙˆØ±** (Ø§Ø±Ø¯ÛŒØ¨Ù‡Ø´Øª Û±Û´Û°Û´ ØªØ§ Ø§Ø³ÙÙ†Ø¯ Û±Û´Û°Û´ â€” Ø·Ø±Ø§Ø­ Ø§Ø±Ø´Ø¯ Ù…Ø­ØµÙˆÙ„)ØŒ Ø¹Ù„ÛŒØ±Ø¶Ø§ Ù…Ø§Ù„Ú©ÛŒØª Ú©Ø§Ù…Ù„ Ø³ÛŒØ³ØªÙ… Ø·Ø±Ø§Ø­ÛŒ (Ú©Ø§Ù…Ù¾ÙˆÙ†Ù†Øªâ€ŒÙ‡Ø§ØŒ ØªÙˆÚ©Ù†â€ŒÙ‡Ø§ Ùˆ Ø§Ø³ØªØ§ÛŒÙ„â€ŒÙ‡Ø§) Ùˆ Ø¨Ø§Ø²Ø·Ø±Ø§Ø­ÛŒ Ù¾Ù†Ù„ Ú©Ø§Ø±Ø¨Ø±ÛŒ Ùˆ ÙˆØ¨â€ŒØ³Ø§ÛŒØª Ø±Ø§ Ø¯Ø± Ú©Ù„ Ø®Ø· Ù…Ø­ØµÙˆÙ„ (Ù‡Ø§Ø³ØªÛŒÙ†Ú¯ØŒ Ø¯Ø§Ù…Ù†Ù‡ØŒ VPS Ùˆ Ø³Ø±ÙˆØ± Ø§Ø®ØªØµØ§ØµÛŒ) Ø¨Ø± Ø¹Ù‡Ø¯Ù‡ Ø¯Ø§Ø´Øª. Ø¯Ø± Ø¨Ø§Ø²Ø¨ÛŒÙ†ÛŒ ÙØµÙ„ÛŒ ØµÙØ­Ù‡ Ø§ØµÙ„ÛŒ Ø¨Ø§Ø²Ø·Ø±Ø§Ø­ÛŒâ€ŒØ´Ø¯Ù‡ Ø¨Ø§ GA4 Ùˆ Ú©Ù„Ø§Ø±ÛŒØªÛŒ: **+Û²Û²Ùª Ø±Ø´Ø¯ Ú©Ø§Ø±Ø¨Ø±ØŒ Û±Û¸.Ûµ ÙˆØ§Ø­Ø¯ Ø¯Ø±ØµØ¯ Ú©Ø§Ù‡Ø´ Ù†Ø±Ø® Ù¾Ø±Ø´ Ùˆ Û¶.Û· ÙˆØ§Ø­Ø¯ Ú©Ø§Ù‡Ø´ Ú©Ù„ÛŒÚ© Ù…Ø±Ø¯Ù‡** Ú¯Ø²Ø§Ø±Ø´ Ø´Ø¯."
      : "At **IranServer** (May 2025 â€“ Mar 2026, Senior Product Designer), Alireza owned the design system end-to-end and redesigned core portal & website flows across hosting, domains, VPS, and dedicated servers. His quarterly UX review (GA4 + Microsoft Clarity) reported **+22% users, an 18.5pt reduction in bounce rate, and -6.7pts dead clicks**.";
  }

  // Farano / AI workflow / GovTech
  if (/(farano|govtech|digital console|prd|ai|Ù‡ÙˆØ´ Ù…ØµÙ†ÙˆØ¹ÛŒ|ÙØ±Ø§Ù†Ùˆ|Ø¯ÙˆÙ„ØªÛŒ)/.test(q)) {
    return isFa
      ? "Ø¯Ø± **ÙØ±Ø§Ù†Ùˆ** (Ø§Ø³ÙÙ†Ø¯ Û±Û´Û°Û´ ØªØ§ Ø§Ú©Ù†ÙˆÙ† â€” Ø·Ø±Ø§Ø­ Ø§Ø±Ø´Ø¯ Ù…Ø­ØµÙˆÙ„ Ø±ÙˆÛŒ Ú©Ù†Ø³ÙˆÙ„ Ø¯ÛŒØ¬ÛŒØªØ§Ù„ Ø§ÛŒØ±Ø§Ù†)ØŒ Ø¹Ù„ÛŒØ±Ø¶Ø§ Ù†ÛŒØ§Ø²Ù…Ù†Ø¯ÛŒâ€ŒÙ‡Ø§ÛŒ Ù…Ø¨Ù‡Ù… Ø°ÛŒâ€ŒÙ†ÙØ¹Ø§Ù† Ø±Ø§ Ø¨Ø§ ØªØ­Ù‚ÛŒÙ‚ Ø­Ù„ Ù…ÛŒâ€ŒÚ©Ù†Ø¯ Ùˆ Ù…Ø¹Ù…Ø§Ø±ÛŒ Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ø±Ø§ Ø¨Ø± Ù¾Ø§ÛŒÙ‡ Ø§Ù…Ù†ÛŒØªØŒ Ø­Ø±ÛŒÙ… Ø®ØµÙˆØµÛŒ Ùˆ Ú©Ù†ØªØ±Ù„ Ø¯Ø³ØªØ±Ø³ÛŒ Ù…ÛŒâ€ŒØ³Ø§Ø²Ø¯. Ø§Ùˆ Ø§Ø² **Ù‡ÙˆØ´ Ù…ØµÙ†ÙˆØ¹ÛŒ** Ù…Ø³ØªÙ‚ÛŒÙ…Ø§Ù‹ Ø¨Ø±Ø§ÛŒ ØªØ³Øª A/B Ø¬Ø±ÛŒØ§Ù†â€ŒÙ‡Ø§ØŒ Ø´Ø¨ÛŒÙ‡â€ŒØ³Ø§Ø²ÛŒ Ù¾Ø±Ø³ÙˆÙ†Ø§ØŒ Ù¾Ø§Ù„Ø§ÛŒØ´ PRD Ùˆ Ù†ÙˆØ´ØªÙ† Ø³Ù†Ø§Ø±ÛŒÙˆÙ‡Ø§ÛŒ ØªØ³Øª Ø§Ø³ØªÙØ§Ø¯Ù‡ Ù…ÛŒâ€ŒÚ©Ù†Ø¯."
      : "At **Farano** (Mar 2026 â€“ Present, Senior Product Designer on the Iran Digital Console), Alireza resolves conflicting stakeholder requirements through research and designs IA around security, privacy, and access control from day one. He embeds **AI** directly into his workflow for A/B flow testing, persona simulations, PRD refinement, and test-case writing.";
  }

  // Made In Iran / Design Systems
  if (/(made in iran|design system|token|tailwind|material|26|Ù…ÛŒØ¯ Ø§ÛŒÙ† Ø§ÛŒØ±Ø§Ù†|Ø³ÛŒØ³ØªÙ… Ø·Ø±Ø§Ø­ÛŒ|Ø¯ÛŒØ²Ø§ÛŒÙ† Ø³ÛŒØ³ØªÙ…|ØªÙˆÚ©Ù†)/.test(q)) {
    return isFa
      ? "ØªØ¬Ø±Ø¨Ù‡ Ø¹Ù…ÛŒÙ‚ Ø³ÛŒØ³ØªÙ… Ø·Ø±Ø§Ø­ÛŒ Ø¹Ù„ÛŒØ±Ø¶Ø§ Ø´Ø§Ù…Ù„: Û±) Ø³Ø§Ø®Øª Ø§ÙˆÙ„ÛŒÙ† Ø³ÛŒØ³ØªÙ… Ø·Ø±Ø§Ø­ÛŒ **Ù…ÛŒØ¯ Ø§ÛŒÙ† Ø§ÛŒØ±Ø§Ù†** Ø§Ø² ØµÙØ± Ø¨Ø§ **Û²Û¶ Ú©Ø§Ù…Ù¾ÙˆÙ†Ù†Øª** Ø¯Ø± Û´ Ø¨Ø³ØªØ± (Ø®Ø±ÛŒØ¯Ø§Ø±ØŒ ØªØ£Ù…ÛŒÙ†â€ŒÚ©Ù†Ù†Ø¯Ù‡ØŒ Ø§Ø¯Ù…ÛŒÙ† Ùˆ ÙˆØ¨â€ŒØ³Ø§ÛŒØª) Ø¨Ø± Ù¾Ø§ÛŒÙ‡ Material Ùˆ TailwindØ› Û²) Ù…Ø§Ù„Ú©ÛŒØª Ú©Ø§Ù…Ù„ Ø³ÛŒØ³ØªÙ… Ø·Ø±Ø§Ø­ÛŒ **Ø§ÛŒØ±Ø§Ù†â€ŒØ³Ø±ÙˆØ±**Ø› Û³) Ù…Ø´Ø§Ø±Ú©Øª Ø¯Ø± **Ø³ÛŒØ³ØªÙ… Ø·Ø±Ø§Ø­ÛŒ Ù¾Ø§Ø±Øª** Ø¨Ø§ ØªÛŒÙ… Û±Û± Ù†ÙØ±Ù‡ Ùˆ Ø³Ø§Ø®Øª Ú¯Ø±Ø¯Ø´â€ŒÚ©Ø§Ø± ØªÙˆÚ©Ù† Ø¨Ø§ Ù¾Ù„Ø§Ú¯ÛŒÙ† ÙÛŒÚ¯Ù…Ø§ Ù¾ÛŒØ´ Ø§Ø² Ù¾Ø´ØªÛŒØ¨Ø§Ù†ÛŒ Ø¨ÙˆÙ…ÛŒ ÙÛŒÚ¯Ù…Ø§."
      : "Alireza's design systems experience spans: (1) independently building **Made In Iran's** first design system from scratch (**26 components** across 4 surfaces with Material & Tailwind tokens), (2) owning the **IranServer** design system end-to-end, and (3) co-building **Part Design System** with an 11-person team plus a Figma plugin token workflow ahead of native support.";
  }

  // Word+ / Research / PM
  if (/(word\+|word plus|interview|research|pm|product manager|ÙˆØ±Ø¯Ù¾Ù„Ø§Ø³|Ù…ØµØ§Ø­Ø¨Ù‡|ØªØ­Ù‚ÛŒÙ‚|Ù…Ø¯ÛŒØ± Ù…Ø­ØµÙˆÙ„)/.test(q)) {
    return isFa
      ? "Ø¯Ø± Ø§Ù¾Ù„ÛŒÚ©ÛŒØ´Ù† **Word+**ØŒ Ø¹Ù„ÛŒØ±Ø¶Ø§ Ù‡Ù…â€ŒØ²Ù…Ø§Ù† Ù†Ù‚Ø´ Ø·Ø±Ø§Ø­ Ù…Ø­ØµÙˆÙ„ Ùˆ Ù…Ø¯ÛŒØ± Ù…Ø­ØµÙˆÙ„ Ø±Ø§ Ø¨Ø± Ø¹Ù‡Ø¯Ù‡ Ø¯Ø§Ø´Øª: Ø³ÛŒØ³ØªÙ… Ø·Ø±Ø§Ø­ÛŒ Material 3 Ø±Ø§ Ø³Ø§Ø®ØªØŒ Û´Û° Ù…ØµØ§Ø­Ø¨Ù‡ ØªÙ„ÙÙ†ÛŒ Ø¨Ø±Ø§ÛŒ Ø´Ø®ØµÛŒâ€ŒØ³Ø§Ø²ÛŒ Ùˆ Ù…ØµØ§Ø­Ø¨Ù‡â€ŒÙ‡Ø§ÛŒ Ø¹Ù…ÛŒÙ‚ ØªØ¨Ø¯ÛŒÙ„ Ø¨Ø§ Û¸ Ú©Ø§Ø±Ø¨Ø± Ø§Ù†Ø¬Ø§Ù… Ø¯Ø§Ø¯ØŒ Ù…Ø·Ø§Ù„Ø¹Ù‡ Ø±Ø§ Ø¨Ù‡ Ø¯Ùˆ Ø­Ø§Ù„Øª Ø±ÙˆØ²Ø§Ù†Ù‡ ØªÙÚ©ÛŒÚ© Ú©Ø±Ø¯ØŒ Ú¯ÛŒÙ…ÛŒÙÛŒÚ©ÛŒØ´Ù†/ASMR Ø§ÙØ²ÙˆØ¯ Ùˆ Ù…Ø§Ù†Ø¹ Ú©Ù„ÛŒØ¯ÛŒ ØªØ¨Ø¯ÛŒÙ„ Ø®Ø±ÛŒØ¯ Ø§Ø´ØªØ±Ø§Ú© (Ø§Ø¨Ù‡Ø§Ù… Ù¾ÛŒØ§Ù… Ù†Ø³Ø®Ù‡ ÙˆÛŒÚ˜Ù‡) Ø±Ø§ Ú©Ø´Ù Ú©Ø±Ø¯."
      : "On **Word+**, Alireza worked dual-hatted as Product Designer and Product Manager: he owned the Material 3 design system, ran 40 structured phone interviews plus 8 in-depth conversion interviews, split study into two daily modes, added gamification/ASMR mechanics, and uncovered the core premium conversion blocker.";
  }

  // Merat / Fintech / Signal
  if (/(merat|ara|signal|fintech|bank|heuristic|nielsen|Ù…Ø±Ø¢Øª|Ø³ÛŒÚ¯Ù†Ø§Ù„|ÙÛŒÙ†ØªÚ©|Ù†ÛŒÙ„Ø³Ù†|Ø¨Ø§Ù†Ú©)/.test(q)) {
    return isFa
      ? "Ø¯Ø± Ø­ÙˆØ²Ù‡ **ÙÛŒÙ†ØªÚ©**ØŒ Ø¹Ù„ÛŒØ±Ø¶Ø§ Ø±ÙˆÛŒ **Ø³ÛŒÚ¯Ù†Ø§Ù„** (Ù…Ø­ØµÙˆÙ„ Ø¨Ø§ Ø¨ÛŒØ´ Ø§Ø² Ûµ Ù…ÛŒÙ„ÛŒÙˆÙ† Ú©Ø§Ø±Ø¨Ø± â€” Ø¨Ø®Ø´ Ø³Ù‡Ø§Ù…ØŒ Ø¯ÛŒØ¯Ù‡â€ŒØ¨Ø§Ù†ØŒ Ø§Ù†ØªØ®Ø§Ø¨ Ø¨Ø§Ù†Ú© Ùˆ Ù„Ù†Ø¯ÛŒÙ†Ú¯) Ùˆ **Ù…Ø±Ø¢Øª/Ø¢Ø±Ø§** (Ù…Ø­ØµÙˆÙ„ Ø¨Ø§Ù†Ú©ÛŒ Ø±Ø³Ø§Ù„Øª â€” Ø§Ø±Ø²ÛŒØ§Ø¨ÛŒ Ú©Ø§Ù…Ù„ Û±Û° Ø§ØµÙ„ Ù†ÛŒÙ„Ø³Ù†ØŒ Ø¨Ø§Ø²Ø·Ø±Ø§Ø­ÛŒ Ø¯ÙˆÚ¯Ø§Ù†Ù‡ Ù…ØªÙ‚Ø§Ø¶ÛŒ Ùˆ Ú©Ø§Ø±Ø´Ù†Ø§Ø³ Ø§Ø¹ØªØ¨Ø§Ø±Ø³Ù†Ø¬ÛŒ Ùˆ Ø³Ø§Ø®Øª Ø³ÛŒØ³ØªÙ… Ø·Ø±Ø§Ø­ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ) Ú©Ø§Ø± Ú©Ø±Ø¯Ù‡ Ø§Ø³Øª."
      : "In **Fintech**, Alireza designed for **Signal** (5M+ users: stock viewing, Watchlist, bank selection, and responsive landing page) and led a full **Nielsen 10-heuristic evaluation** & dual-user redesign for **Merat (Ara)** alongside a custom product design system.";
  }

  // Games
  if (/(game|khiaar|freedom park|shah gol|unity|Ø¨Ø§Ø²ÛŒ|Ø®ÛŒØ§Ø±|Ù¾Ø§Ø±Ú© Ø¢Ø²Ø§Ø¯ÛŒ|Ø´Ø§Ù‡ Ú¯Ù„)/.test(q)) {
    return isFa
      ? "Ø¹Ù„ÛŒØ±Ø¶Ø§ Û³ Ø¨Ø§Ø²ÛŒ Ù…ÙˆØ¨Ø§ÛŒÙ„ Ù…Ù†ØªØ´Ø±Ø´Ø¯Ù‡ Ø¯Ø± Ú©Ø§ÙÙ‡â€ŒØ¨Ø§Ø²Ø§Ø± Ùˆ Ù…Ø§ÛŒÚ©Øª Ø¯Ø§Ø±Ø¯: **Ø´Ø§Ù‡â€ŒÚ¯Ù„** (Ú¯Ù„ ÛŒØ§ Ù¾ÙˆÚ† Ø¢Ù†Ù„Ø§ÛŒÙ† Ú†Ù†Ø¯Ù†ÙØ±Ù‡ Ø¨Ø§ Ú†Øª Ø²Ù†Ø¯Ù‡ Ùˆ Ù‡Ù…Ú©Ø§Ø±ÛŒ Ø¨Ø§ ÛŒÙˆÙ†ÛŒØªÛŒ)ØŒ **Ù¾Ø§Ø±Ú© Ø¢Ø²Ø§Ø¯ÛŒ** (Ù„ÛŒØ¯ Ø·Ø±Ø§Ø­ÛŒ Ù…Ø­ØµÙˆÙ„ØŒ Ú†ÛŒØ¯Ù…Ø§Ù† Ù†Ù‚Ø´Ù‡ Ùˆ Ù…Ù†ØªÙˆØ±ÛŒÙ†Ú¯ Û² Ø·Ø±Ø§Ø­ Ø¬ÙˆÙ†ÛŒÙˆØ±) Ùˆ **Ø®ÛŒØ§Ø±** (Ø¨Ø§Ø²ÛŒ Ù…Ø¹Ù…Ø§ÛŒÛŒ Ú©Ù„Ù…Ø§Øª Ø¨Ø§ Ú†Ø±Ø®Ù‡â€ŒÙ‡Ø§ÛŒ Ù¾Ù„ÛŒâ€ŒØªØ³Øª)."
      : "Alireza shipped 3 mobile games live on CafÃ© Bazaar and Myket: **Shah Gol** (real-time multiplayer card game with live chat & Unity handoff), **Freedom Park** (Product Design Lead, map layout, MVP scoping & mentoring 2 juniors), and **Khiaar** (word puzzle game refined through playtesting).";
  }

  // Skills / Tools / Leadership / Mentoring
  if (/(skill|tool|figma|mentor|teach|leader|Ù…Ù‡Ø§Ø±Øª|Ø§Ø¨Ø²Ø§Ø±|ÙÛŒÚ¯Ù…Ø§|Ù…Ù†ØªÙˆØ±|ØªØ¯Ø±ÛŒØ³)/.test(q)) {
    return isFa
      ? "Ù…Ù‡Ø§Ø±Øªâ€ŒÙ‡Ø§ÛŒ Ø§ØµÙ„ÛŒ Ø¹Ù„ÛŒØ±Ø¶Ø§ Ø¯Ø± Û´ Ù…Ø­ÙˆØ± Ø§Ø³Øª: **Ø·Ø±Ø§Ø­ÛŒ Ùˆ ØªØ­Ù‚ÛŒÙ‚** (UX ResearchØŒ ØªØ³Øª Ú©Ø§Ø±Ø¨Ø±Ø¯Ù¾Ø°ÛŒØ±ÛŒØŒ Ù…Ø¹Ù…Ø§Ø±ÛŒ Ø§Ø·Ù„Ø§Ø¹Ø§ØªØŒ Ø³ÛŒØ³ØªÙ… Ø·Ø±Ø§Ø­ÛŒ)ØŒ **Ú¯Ø±Ø¯Ø´â€ŒÚ©Ø§Ø± Ù‡ÙˆØ´ Ù…ØµÙ†ÙˆØ¹ÛŒ** (ØªØ³Øª A/BØŒ Ø´Ø¨ÛŒÙ‡â€ŒØ³Ø§Ø²ÛŒ Ù¾Ø±Ø³ÙˆÙ†Ø§ØŒ Ù¾Ø§Ù„Ø§ÛŒØ´ PRD)ØŒ **Ø§Ø¨Ø²Ø§Ø±Ù‡Ø§** (FigmaØŒ Design TokensØŒ MaterialØŒ TailwindØŒ UIKit) Ùˆ **Ø±Ù‡Ø¨Ø±ÛŒ** (Ù…Ù†ØªÙˆØ±ÛŒÙ†Ú¯ Û² Ø·Ø±Ø§Ø­ Ø¬ÙˆÙ†ÛŒÙˆØ± Ùˆ ØªØ¯Ø±ÛŒØ³ Ø¯ÙˆØ±Ù‡â€ŒÙ‡Ø§ÛŒ Ù…Ø¹Ù…Ø§Ø±ÛŒ Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ùˆ Ø¯ÛŒØ²Ø§ÛŒÙ† Ø³ÛŒØ³ØªÙ… Ø¯Ø± Ú©Ø§Ù„Ø¬ Ù¾Ø§Ø±Øª)."
      : "Alireza's core capabilities span 4 pillars: **Design & Research** (UX research, usability testing, IA, design systems), **AI-Augmented Workflow** (A/B flow testing, persona simulation, PRD refinement), **Technical** (Figma, Design Tokens, Material/Tailwind, UIKit libraries), and **Leadership** (mentoring 2 juniors & teaching IA and Design Systems at Part College).";
  }

  // Education / Certifications
  if (/(education|university|degree|ibm|cert|ØªØ­ØµÛŒÙ„|Ø¯Ø§Ù†Ø´Ú¯Ø§Ù‡|ÙØ±Ø¯ÙˆØ³ÛŒ|Ù…Ø¯Ø±Ú©|Ú¯ÙˆØ§Ù‡ÛŒÙ†Ø§Ù…Ù‡)/.test(q)) {
    return isFa
      ? "Ø¹Ù„ÛŒØ±Ø¶Ø§ ÙØ§Ø±Øºâ€ŒØ§Ù„ØªØ­ØµÛŒÙ„ **Ú©Ø§Ø±Ø´Ù†Ø§Ø³ÛŒ Ù…Ù‡Ù†Ø¯Ø³ÛŒ Ú©Ø§Ù…Ù¾ÛŒÙˆØªØ± Ø§Ø² Ø¯Ø§Ù†Ø´Ú¯Ø§Ù‡ ÙØ±Ø¯ÙˆØ³ÛŒ Ù…Ø´Ù‡Ø¯** (Û±Û³Û¹Û¶â€“Û±Û´Û°Û²) Ø§Ø³Øª Ùˆ Ø¯Ø§Ø±Ø§ÛŒ Ú¯ÙˆØ§Ù‡ÛŒÙ†Ø§Ù…Ù‡â€ŒÙ‡Ø§ÛŒ **IBM Enterprise Design Thinking (Co-Creator & Practitioner)**ØŒ Ø¯ÙˆØ±Ù‡ ØªØ®ØµØµÛŒ **you.I Ú©Ø§Ù„Ø¬ Ù¾Ø§Ø±Øª** (Û± Ù†ÙØ± Ø§Ø² Û±Û· Ù†ÙØ± Ù…ÛŒØ§Ù† Û³Û°Û° Ù…ØªÙ‚Ø§Ø¶ÛŒ) Ùˆ Ù„ÙˆØ­ ØªÙ‚Ø¯ÛŒØ± Ù…Ø¯Ø±Ø³ UI/UX Ø§Ø² Ú©Ø§Ù„Ø¬ Ù¾Ø§Ø±Øª Ø§Ø³Øª."
      : "Alireza holds a **B.S. in Computer Engineering from Ferdowsi University of Mashhad** (2017â€“2023), **IBM Enterprise Design Thinking Co-Creator & Practitioner** certifications, and graduated from Part Software Group's **you.I** program (1 of 17 selected from 300 applicants), later earning a Certificate of Appreciation as a UI/UX instructor.";
  }

  // Contact / Resume / Availability / Hire
  if (/(contact|email|hire|resume|cv|telegram|ØªÙ…Ø§Ø³|Ø§ÛŒÙ…ÛŒÙ„|Ø±Ø²ÙˆÙ…Ù‡|Ù‡Ù…Ú©Ø§Ø±ÛŒ|ØªÙ„Ú¯Ø±Ø§Ù…)/.test(q)) {
    return isFa
      ? `Ù…ÛŒâ€ŒØªÙˆÙ†ÛŒ Ù‡Ù…ÛŒÙ† Ø§Ù„Ø§Ù† Ø§Ø² ØªØ¨ **Â«Ú†Øª Ù…Ø³ØªÙ‚ÛŒÙ… Ø¨Ø§ Ø¹Ù„ÛŒØ±Ø¶Ø§Â»** Ù¾ÛŒØ§Ù… Ø¨ÙØ±Ø³ØªÛŒ ØªØ§ Ù…Ø³ØªÙ‚ÛŒÙ…Ø§Ù‹ Ø±ÙˆÛŒ ØªÙ„Ú¯Ø±Ø§Ù…Ø´ Ø¨Ø±Ù‡ØŒ ÛŒØ§ Ø¨Ù‡ **${PROFILE.email}** Ø§ÛŒÙ…ÛŒÙ„ Ø¨Ø²Ù†ÛŒ. Ø±Ø²ÙˆÙ…Ù‡ PDF Ù‡Ù… Ø§Ø² Ù„ÛŒÙ†Ú© Resume Ø¯Ø± Ù…Ù†ÙˆÛŒ Ø¨Ø§Ù„Ø§ Ù‚Ø§Ø¨Ù„ Ø¯Ø±ÛŒØ§ÙØª Ø§Ø³Øª.`
      : `You can message Alireza directly via the **Live Chat** tab here (connected to Telegram), or email **${PROFILE.email}**. His full PDF resume is also available from the Resume link in the header.`;
  }

  // Default balanced overview
  return isFa
    ? "Ø¹Ù„ÛŒØ±Ø¶Ø§ Ù…Ø­Ù…Ø¯Ø²Ø§Ø¯Ù‡ ÙØ±Ø´Ú†ÛŒ Ø·Ø±Ø§Ø­ Ù…Ø­ØµÙˆÙ„ Ø¨Ø§ **Ø¨ÛŒØ´ Ø§Ø² Û´ Ø³Ø§Ù„ ØªØ¬Ø±Ø¨Ù‡** Ùˆ Ø±ÙˆÛŒÚ©Ø±Ø¯ ØªÙÚ©Ø± Ø³ÛŒØ³ØªÙ…ÛŒ Ø¯Ø± Ø­ÙˆØ²Ù‡â€ŒÙ‡Ø§ÛŒ B2BØŒ B2CØŒ GovTechØŒ ÙÛŒÙ†ØªÚ©ØŒ Ø¨Ø§Ø²ÛŒ Ùˆ Ù‡ÙˆØ´ Ù…ØµÙ†ÙˆØ¹ÛŒ Ø§Ø³Øª (ÙØ±Ø§Ù†ÙˆØŒ Ø§ÛŒØ±Ø§Ù†â€ŒØ³Ø±ÙˆØ±ØŒ Ù…ÛŒØ¯ Ø§ÛŒÙ† Ø§ÛŒØ±Ø§Ù†ØŒ Ú¯Ø±ÙˆÙ‡ Ù†Ø±Ù…â€ŒØ§ÙØ²Ø§Ø±ÛŒ Ù¾Ø§Ø±Øª). Ù…ÛŒâ€ŒØªÙˆÙ†ÛŒ Ø¯Ø±Ø¨Ø§Ø±Ù‡ Ù‡Ø± Ù¾Ø±ÙˆÚ˜Ù‡ (Ù…Ø«Ù„ Ø§ÛŒØ±Ø§Ù†â€ŒØ³Ø±ÙˆØ±ØŒ ÙØ±Ø§Ù†ÙˆØŒ Ù…ÛŒØ¯ Ø§ÛŒÙ† Ø§ÛŒØ±Ø§Ù†ØŒ Word+ØŒ Ù…Ø±Ø¢Øª)ØŒ Ø³ÛŒØ³ØªÙ…â€ŒÙ‡Ø§ÛŒ Ø·Ø±Ø§Ø­ÛŒØŒ Ù…Ù‡Ø§Ø±Øªâ€ŒÙ‡Ø§ ÛŒØ§ ØªØ­ØµÛŒÙ„Ø§ØªØ´ Ø¯Ù‚ÛŒÙ‚â€ŒØªØ± Ø¨Ù¾Ø±Ø³ÛŒ!"
    : "Alireza Mohammadzade Farshchi is a **Product Designer with 5+ years of experience** and strong systems thinking across B2B, B2C, GovTech, fintech, gaming, and AI (Farano, IranServer, Made In Iran, Part Software Group). Ask me about any specific project, his design systems work, AI workflow, research process, or credentials!";
}

export function renderAssistantAndChat(content) {
  const isFa = content.lang === "fa";

  const quickPrompts = isFa
    ? [
        "Ø¯Ø±Ø¨Ø§Ø±Ù‡ Ù†ØªØ§ÛŒØ¬ Ù¾Ø±ÙˆÚ˜Ù‡ Ø§ÛŒØ±Ø§Ù†â€ŒØ³Ø±ÙˆØ± Ø¨Ú¯Ùˆ",
        "ØªØ¬Ø±Ø¨Ù‡ Ø³ÛŒØ³ØªÙ… Ø·Ø±Ø§Ø­ÛŒ Ø¹Ù„ÛŒØ±Ø¶Ø§ Ú†ÛŒÙ‡ØŸ",
        "Ú†Ø·ÙˆØ± Ø§Ø² Ù‡ÙˆØ´ Ù…ØµÙ†ÙˆØ¹ÛŒ Ø¯Ø± Ø·Ø±Ø§Ø­ÛŒ Ø§Ø³ØªÙØ§Ø¯Ù‡ Ù…ÛŒâ€ŒÚ©Ù†Ù‡ØŸ",
        "ØªØ­ØµÛŒÙ„Ø§Øª Ùˆ Ú¯ÙˆØ§Ù‡ÛŒÙ†Ø§Ù…Ù‡â€ŒÙ‡Ø§Ø´ Ú†ÛŒÙ‡ØŸ",
      ]
    : [
        "What were the IranServer UX results?",
        "Tell me about his Design Systems work",
        "How does he use AI in his workflow?",
        "What is his education & certifications?",
      ];

  return `
    <!-- TopFast-inspired Scroll-to-Top Button -->
    <button
      type="button"
      class="scroll-top-btn"
      id="scroll-top-btn"
      aria-label="${isFa ? "Ø¨Ø§Ø²Ú¯Ø´Øª Ø¨Ù‡ Ø¨Ø§Ù„Ø§" : "Scroll to top"}"
      title="${isFa ? "Ø¨Ø§Ø²Ú¯Ø´Øª Ø¨Ù‡ Ø¨Ø§Ù„Ø§" : "Back to top"}"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Floating Assistant & Live Chat Launcher -->
    <button
      type="button"
      class="assistant-fab"
      id="assistant-fab"
      aria-expanded="false"
      aria-controls="assistant-drawer"
    >
      <span class="assistant-fab__dot" aria-hidden="true"></span>
      <span>${isFa ? "Ø¯Ø³ØªÛŒØ§Ø± Ù‡ÙˆØ´ Ù…ØµÙ†ÙˆØ¹ÛŒ Ùˆ Ú†Øª" : "AI Assistant & Chat"}</span>
    </button>

    <!-- Dual-Mode Slide-Over Drawer (AI Resume Assistant + Telegram Live Chat) -->
    <aside
      class="assistant-drawer"
      id="assistant-drawer"
      aria-hidden="true"
      aria-label="${isFa ? "Ø¯Ø³ØªÛŒØ§Ø± Ù‡ÙˆØ´Ù…Ù†Ø¯ Ùˆ Ú¯ÙØªâ€ŒÙˆÚ¯ÙˆÛŒ Ù…Ø³ØªÙ‚ÛŒÙ…" : "AI Assistant and Live Chat"}"
    >
      <div class="assistant-drawer__header">
        <div>
          <div class="assistant-drawer__title">
            ${isFa ? "Ø¯Ø³ØªÛŒØ§Ø± Ø¹Ù„ÛŒØ±Ø¶Ø§ Ùˆ Ú†Øª Ù…Ø³ØªÙ‚ÛŒÙ…" : "Alireza's Assistant & Live Chat"}
          </div>
          <div class="assistant-drawer__sub">
            ${isFa ? "Ù¾Ø§Ø³Ø® ÙÙˆØ±ÛŒ Ø¯Ø±Ø¨Ø§Ø±Ù‡ Ø±Ø²ÙˆÙ…Ù‡ ÛŒØ§ Ù¾ÛŒØ§Ù… Ù…Ø³ØªÙ‚ÛŒÙ… Ø¨Ù‡ ØªÙ„Ú¯Ø±Ø§Ù…" : "Instant resume Q&A or direct Telegram chat"}
          </div>
        </div>
        <button type="button" class="icon-btn" id="assistant-close" aria-label="${isFa ? "Ø¨Ø³ØªÙ†" : "Close"}">
          âœ•
        </button>
      </div>

      <div class="assistant-tabs" role="tablist">
        <button type="button" class="assistant-tab" role="tab" data-tab="ai" aria-selected="true">
          âœ¦ ${isFa ? "Ø¯Ø³ØªÛŒØ§Ø± Ù‡ÙˆØ´Ù…Ù†Ø¯ Ø±Ø²ÙˆÙ…Ù‡" : "AI Resume Assistant"}
        </button>
        <button type="button" class="assistant-tab" role="tab" data-tab="chat" aria-selected="false">
          âœˆ ${isFa ? "Ú†Øª Ù…Ø³ØªÙ‚ÛŒÙ… (ØªÙ„Ú¯Ø±Ø§Ù…)" : "Live Chat (Telegram)"}
        </button>
      </div>

      <!-- TAB 1: AI Resume Assistant -->
      <div class="assistant-pane" id="pane-ai" data-pane="ai">
        <div class="chat-feed" id="ai-feed">
          <div class="chat-msg chat-msg--bot">
            ${
              isFa
                ? "Ø³Ù„Ø§Ù…! Ù…Ù† Ø¯Ø³ØªÛŒØ§Ø± Ù‡ÙˆØ´Ù…Ù†Ø¯ Ù¾Ø±ØªÙÙˆÙ„ÛŒÙˆÛŒ Ø¹Ù„ÛŒØ±Ø¶Ø§ Ù‡Ø³ØªÙ…. Ù‡Ø± Ø³ÙˆØ§Ù„ÛŒ Ø¯Ø±Ø¨Ø§Ø±Ù‡ Ø³ÙˆØ§Ø¨Ù‚ØŒ Ù¾Ø±ÙˆÚ˜Ù‡â€ŒÙ‡Ø§ØŒ Ø³ÛŒØ³ØªÙ…â€ŒÙ‡Ø§ÛŒ Ø·Ø±Ø§Ø­ÛŒ ÛŒØ§ Ù…Ù‡Ø§Ø±Øªâ€ŒÙ‡Ø§Ø´ Ø¯Ø§Ø±ÛŒ Ø¨Ù¾Ø±Ø³."
                : "Hi! I'm Alireza's portfolio assistant. Ask me anything about his experience, projects, design systems, AI workflow, or background."
            }
          </div>
        </div>

        <div class="quick-prompts" id="ai-quick-prompts">
          ${quickPrompts
            .map((prompt) => `<button type="button" class="quick-prompt-chip">${prompt}</button>`)
            .join("")}
        </div>

        <form class="chat-composer" id="ai-form">
          <input
            type="text"
            id="ai-input"
            class="chat-composer__input"
            placeholder="${isFa ? "Ø³ÙˆØ§Ù„ÛŒ Ø¯Ø±Ø¨Ø§Ø±Ù‡ Ø±Ø²ÙˆÙ…Ù‡ ÛŒØ§ Ù¾Ø±ÙˆÚ˜Ù‡â€ŒÙ‡Ø§ Ø¨Ù¾Ø±Ø³ÛŒØ¯..." : "Ask about experience, projects, skills..."}"
            autocomplete="off"
          />
          <button type="submit" class="btn btn--primary btn--sm">
            ${isFa ? "Ø§Ø±Ø³Ø§Ù„" : "Ask"}
          </button>
        </form>
      </div>

      <!-- TAB 2: Live Telegram Chat -->
      <div class="assistant-pane" id="pane-chat" data-pane="chat" hidden>
        <div class="chat-feed" id="tg-feed"></div>

        <form class="chat-composer chat-composer--stacked" id="tg-form">
          <input
            type="text"
            id="tg-name"
            class="chat-composer__input"
            placeholder="${isFa ? "Ù†Ø§Ù… Ø´Ù…Ø§ (Ø§Ø®ØªÛŒØ§Ø±ÛŒ)" : "Your name (optional)"}"
            autocomplete="name"
          />
          <div style="display:flex;gap:8px;width:100%;">
            <input
              type="text"
              id="tg-input"
              class="chat-composer__input"
              placeholder="${isFa ? "Ù¾ÛŒØ§Ù… Ø®ÙˆØ¯ Ø±Ø§ Ø¨Ø±Ø§ÛŒ Ø¹Ù„ÛŒØ±Ø¶Ø§ Ø¨Ù†ÙˆÛŒØ³ÛŒØ¯..." : "Write a message to Alireza..."}"
              autocomplete="off"
              required
            />
            <button type="submit" class="btn btn--primary btn--sm">
              ${isFa ? "Ø§Ø±Ø³Ø§Ù„" : "Send"}
            </button>
          </div>
          <div class="tg-status-note" id="tg-status-note">
            ${
              SITE_CONFIG.WORKER_URL
                ? isFa
                  ? "Ù…ØªØµÙ„ Ø¨Ù‡ ØªÙ„Ú¯Ø±Ø§Ù… Ø¹Ù„ÛŒØ±Ø¶Ø§ â€” Ù¾Ø§Ø³Ø®â€ŒÙ‡Ø§ Ù‡Ù…ÛŒÙ†â€ŒØ¬Ø§ Ù†Ù…Ø§ÛŒØ´ Ø¯Ø§Ø¯Ù‡ Ù…ÛŒâ€ŒØ´ÙˆÙ†Ø¯."
                  : "Connected to Alireza's Telegram â€” replies appear live right here."
                : isFa
                  ? "Ù¾ÛŒØ§Ù… Ø´Ù…Ø§ Ø«Ø¨Øª Ù…ÛŒâ€ŒØ´ÙˆØ¯ Ùˆ Ø¨Ø§ ÛŒÚ© Ú©Ù„ÛŒÚ© Ø§Ø² Ø·Ø±ÛŒÙ‚ Ø§ÛŒÙ…ÛŒÙ„/ØªÙ„Ú¯Ø±Ø§Ù… Ø§Ø±Ø³Ø§Ù„ Ù…ÛŒâ€ŒÚ¯Ø±Ø¯Ø¯ (Ø¨Ø¹Ø¯ Ø§Ø² Ø§ØªØµØ§Ù„ Cloudflare Worker Ú©Ø§Ù…Ù„Ø§Ù‹ Ø®ÙˆØ¯Ú©Ø§Ø± Ùˆ Ø¯ÙˆØ·Ø±ÙÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯)."
                  : "Live two-way Telegram relay is ready once you add your Cloudflare Worker URL in src/config.js (instant email fallback active meanwhile)."
            }
          </div>
        </form>
      </div>
    </aside>
  `;
}

export function initAssistantAndChat(content) {
  const isFa = content.lang === "fa";
  const fab = document.getElementById("assistant-fab");
  const drawer = document.getElementById("assistant-drawer");
  const closeBtn = document.getElementById("assistant-close");
  const scrollTopBtn = document.getElementById("scroll-top-btn");

  // Scroll-to-Top button (TopFast Reports style)
  if (scrollTopBtn) {
    const toggleScrollTop = () => {
      scrollTopBtn.classList.toggle("is-visible", window.scrollY > 420);
    };
    window.addEventListener("scroll", toggleScrollTop, { passive: true });
    toggleScrollTop();
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (!fab || !drawer) return;

  let isOpen = false;
  let pollTimer = null;

  const setOpen = (next, tabToFocus = null) => {
    isOpen = next;
    drawer.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    fab.setAttribute("aria-expanded", String(isOpen));
    if (tabToFocus) activateTab(tabToFocus);
  };

  // Expose helper so "Let's talk" buttons can open the Live Chat directly!
  window.openPortfolioChat = (tab = "chat") => setOpen(true, tab);

  fab.addEventListener("click", () => setOpen(!isOpen));
  closeBtn?.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) setOpen(false);
  });

  // Any element with [data-open-chat] opens the live Telegram chat tab
  document.querySelectorAll("[data-open-chat]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = el.getAttribute("data-open-chat") || "chat";
      setOpen(true, targetTab);
    });
  });

  // Tabs
  const tabs = drawer.querySelectorAll("[data-tab]");
  const panes = drawer.querySelectorAll("[data-pane]");
  function activateTab(name) {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.getAttribute("data-tab") === name)));
    panes.forEach((p) => {
      p.hidden = p.getAttribute("data-pane") !== name;
    });
    if (name === "chat" && SITE_CONFIG.WORKER_URL && !pollTimer) {
      pollTelegramReplies();
      pollTimer = window.setInterval(pollTelegramReplies, 3000);
    }
  }
  tabs.forEach((t) => t.addEventListener("click", () => activateTab(t.getAttribute("data-tab"))));

  // --- AI Resume Assistant Logic ---
  const aiFeed = document.getElementById("ai-feed");
  const aiForm = document.getElementById("ai-form");
  const aiInput = document.getElementById("ai-input");

  const appendAiMsg = (text, who) => {
    const div = document.createElement("div");
    div.className = `chat-msg chat-msg--${who}`;
    div.innerHTML = escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    aiFeed.appendChild(div);
    aiFeed.scrollTop = aiFeed.scrollHeight;
  };

  const handleAiQuestion = async (question) => {
    if (!question.trim()) return;
    appendAiMsg(question, "user");

    // If Worker AI endpoint is configured, try live LLM first
    if (SITE_CONFIG.WORKER_URL) {
      try {
        const res = await fetch(`${SITE_CONFIG.WORKER_URL.replace(/\/$/, "")}/api/ai`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, lang: content.lang }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.answer) {
            appendAiMsg(data.answer, "bot");
            return;
          }
        }
      } catch {
        // Fallback seamlessly to local grounded knowledge engine
      }
    }

    window.setTimeout(() => {
      appendAiMsg(answerFromKnowledgeBase(question, content.lang), "bot");
    }, 220);
  };

  aiForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = aiInput.value.trim();
    if (!q) return;
    aiInput.value = "";
    handleAiQuestion(q);
  });

  document.querySelectorAll(".quick-prompt-chip").forEach((chip) => {
    chip.addEventListener("click", () => handleAiQuestion(chip.textContent || ""));
  });

  // --- Two-Way Live Telegram Chat Logic ---
  const tgFeed = document.getElementById("tg-feed");
  const tgForm = document.getElementById("tg-form");
  const tgName = document.getElementById("tg-name");
  const tgInput = document.getElementById("tg-input");
  const sessionId = getOrCreateSessionId();
  let messages = loadChatHistory();

  if (!messages.length) {
    messages.push({
      who: "bot",
      text: isFa
        ? "Ø³Ù„Ø§Ù…! Ù¾ÛŒØ§Ù…Øª Ø±Ùˆ Ø§ÛŒÙ†Ø¬Ø§ Ø¨Ù†ÙˆÛŒØ³ ØªØ§ Ù…Ø³ØªÙ‚ÛŒÙ… Ø¨Ø±Ø§ÛŒ ØªÙ„Ú¯Ø±Ø§Ù… Ø¹Ù„ÛŒØ±Ø¶Ø§ Ø§Ø±Ø³Ø§Ù„ Ø¨Ø´Ù‡ Ùˆ Ø¬ÙˆØ§Ø¨Ø´ Ù‡Ù…ÛŒÙ†â€ŒØ¬Ø§ Ø¨Ø±Ø§Øª Ø¨ÛŒØ§Ø¯."
        : "Hi! Drop a message here â€” it routes directly to Alireza's Telegram so he can reply right back to this chat.",
    });
  }

  const renderTgFeed = () => {
    if (!tgFeed) return;
    tgFeed.innerHTML = messages
      .map((m) => `<div class="chat-msg chat-msg--${m.who}">${escapeHtml(m.text)}</div>`)
      .join("");
    tgFeed.scrollTop = tgFeed.scrollHeight;
  };
  renderTgFeed();

  async function pollTelegramReplies() {
    if (!SITE_CONFIG.WORKER_URL) return;
    try {
      const url = `${SITE_CONFIG.WORKER_URL.replace(/\/$/, "")}/api/messages?session=${encodeURIComponent(sessionId)}&_t=${Date.now()}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.replies) && data.replies.length) {
        let changed = false;
        data.replies.forEach((reply) => {
          if (!messages.some((m) => m.id && m.id === reply.id)) {
            messages.push({ id: reply.id, who: "bot", text: reply.text });
            changed = true;
          }
        });
        if (changed) {
          saveChatHistory(messages);
          renderTgFeed();
        }
      }
    } catch {
      // silent retry on next poll
    }
  }

  tgForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = tgInput.value.trim();
    const sender = tgName?.value.trim() || (isFa ? "Ø¨Ø§Ø²Ø¯ÛŒØ¯Ú©Ù†Ù†Ø¯Ù‡ Ø³Ø§ÛŒØª" : "Portfolio Visitor");
    if (!text) return;

    tgInput.value = "";
    messages.push({ who: "user", text });
    saveChatHistory(messages);
    renderTgFeed();

    if (SITE_CONFIG.WORKER_URL) {
      try {
        const res = await fetch(`${SITE_CONFIG.WORKER_URL.replace(/\/$/, "")}/api/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, sender, text, page: window.location.pathname }),
        });
        if (res.ok) {
          messages.push({
            who: "system",
            text: isFa
              ? "âœ“ Ù¾ÛŒØ§Ù… Ø¨Ù‡ ØªÙ„Ú¯Ø±Ø§Ù… Ø¹Ù„ÛŒØ±Ø¶Ø§ Ø§Ø±Ø³Ø§Ù„ Ø´Ø¯. Ù…Ù†ØªØ¸Ø± Ù¾Ø§Ø³Ø® Ø¨Ø§Ø´ÛŒØ¯..."
              : "âœ“ Sent to Alireza's Telegram. Replies will appear here automatically.",
          });
          saveChatHistory(messages);
          renderTgFeed();
          return;
        }
      } catch {
        // fallback below
      }
    }

    // Graceful fallback when Cloudflare Worker URL isn't configured yet
    const mailHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`Portfolio Chat from ${sender}`)}&body=${encodeURIComponent(text)}`;
    messages.push({
      who: "system",
      text: isFa
        ? `Ù¾ÛŒØ§Ù… Ø°Ø®ÛŒØ±Ù‡ Ø´Ø¯. Ø¨Ø±Ø§ÛŒ Ø§Ø±Ø³Ø§Ù„ ÙÙˆØ±ÛŒ ØªØ§ Ø²Ù…Ø§Ù† Ø§ØªØµØ§Ù„ Ø±Ø¨Ø§Øª ØªÙ„Ú¯Ø±Ø§Ù…ØŒ Ø±ÙˆÛŒ Ø§ÛŒÙ† Ø§ÛŒÙ…ÛŒÙ„ Ú©Ù„ÛŒÚ© Ú©Ù†ÛŒØ¯: ${PROFILE.email}`
        : `Saved! To deliver immediately before your Telegram Worker is connected, send via email: ${PROFILE.email}`,
    });
    saveChatHistory(messages);
    renderTgFeed();
    window.open(mailHref, "_blank", "noopener");
  });
}
