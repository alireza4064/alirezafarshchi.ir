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

  // DeltaFX
  if (/(deltafx|delta|trading|forex|دلتا|معاملاتی)/.test(q)) {
    return isFa
      ? "علیرضا در حال حاضر به‌عنوان **طراح ارشد محصول در DeltaFX** (حوزه فینتک و پلتفرم معاملاتی) روی طراحی تجربه‌های یکپارچه پنل مشتریان، جریان‌های پیچیده مالی و توسعه سیستم طراحی فعالیت می‌کند."
      : "Alireza currently works as a **Senior Product Designer at DeltaFX** (Fintech & Trading Platforms), focusing on client-portal experiences, complex financial workflows, and scalable design systems.";
  }

  // IranServer
  if (/(iranserver|hosting|vps|bounce|clarity|ga4|ایران\s?سرور|هاست|پرش)/.test(q)) {
    return isFa
      ? "در **ایران‌سرور** (اردیبهشت ۱۴۰۴ تا اسفند ۱۴۰۴ — طراح ارشد محصول)، علیرضا مالکیت کامل سیستم طراحی (کامپوننت‌ها، توکن‌ها و استایل‌ها) و بازطراحی پنل کاربری و وب‌سایت را در کل خط محصول (هاستینگ، دامنه، VPS و سرور اختصاصی) بر عهده داشت. در بازبینی فصلی صفحه اصلی بازطراحی‌شده با GA4 و کلاریتی: **+۲۲٪ رشد کاربر، ۱۸.۵ واحد درصد کاهش نرخ پرش و ۶.۷ واحد کاهش کلیک مرده** گزارش شد."
      : "At **IranServer** (May 2025 – Mar 2026, Senior Product Designer), Alireza owned the design system end-to-end and redesigned core portal & website flows across hosting, domains, VPS, and dedicated servers. His quarterly UX review (GA4 + Microsoft Clarity) reported **+22% users, an 18.5pt reduction in bounce rate, and -6.7pts dead clicks**.";
  }

  // Farano / AI workflow / GovTech
  if (/(farano|govtech|digital console|prd|ai|هوش مصنوعی|فرانو|دولتی)/.test(q)) {
    return isFa
      ? "در **فرانو** (اسفند ۱۴۰۴ تا اکنون — طراح ارشد محصول روی کنسول دیجیتال ایران)، علیرضا نیازمندی‌های مبهم ذی‌نفعان را با تحقیق حل می‌کند و معماری اطلاعات را بر پایه امنیت، حریم خصوصی و کنترل دسترسی می‌سازد. او از **هوش مصنوعی** مستقیماً برای تست A/B جریان‌ها، شبیه‌سازی پرسونا، پالایش PRD و نوشتن سناریوهای تست استفاده می‌کند."
      : "At **Farano** (Mar 2026 – Present, Senior Product Designer on the Iran Digital Console), Alireza resolves conflicting stakeholder requirements through research and designs IA around security, privacy, and access control from day one. He embeds **AI** directly into his workflow for A/B flow testing, persona simulations, PRD refinement, and test-case writing.";
  }

  // Made In Iran / Design Systems
  if (/(made in iran|design system|token|tailwind|material|26|مید این ایران|سیستم طراحی|دیزاین سیستم|توکن)/.test(q)) {
    return isFa
      ? "تجربه عمیق سیستم طراحی علیرضا شامل: ۱) ساخت اولین سیستم طراحی **مید این ایران** از صفر با **۲۶ کامپوننت** در ۴ بستر (خریدار، تأمین‌کننده، ادمین و وب‌سایت) بر پایه Material و Tailwind؛ ۲) مالکیت کامل سیستم طراحی **ایران‌سرور**؛ ۳) مشارکت در **سیستم طراحی پارت** با تیم ۱۱ نفره و ساخت گردش‌کار توکن با پلاگین فیگما پیش از پشتیبانی بومی فیگما."
      : "Alireza's design systems experience spans: (1) independently building **Made In Iran's** first design system from scratch (**26 components** across 4 surfaces with Material & Tailwind tokens), (2) owning the **IranServer** design system end-to-end, and (3) co-building **Part Design System** with an 11-person team plus a Figma plugin token workflow ahead of native support.";
  }

  // Word+ / Research / PM
  if (/(word\+|word plus|interview|research|pm|product manager|وردپلاس|مصاحبه|تحقیق|مدیر محصول)/.test(q)) {
    return isFa
      ? "در اپلیکیشن **Word+**، علیرضا هم‌زمان نقش طراح محصول و مدیر محصول را بر عهده داشت: سیستم طراحی Material 3 را ساخت، ۴۰ مصاحبه تلفنی برای شخصی‌سازی و مصاحبه‌های عمیق تبدیل با ۸ کاربر انجام داد، مطالعه را به دو حالت روزانه تفکیک کرد، گیمیفیکیشن/ASMR افزود و مانع کلیدی تبدیل خرید اشتراک (ابهام پیام نسخه ویژه) را کشف کرد."
      : "On **Word+**, Alireza worked dual-hatted as Product Designer and Product Manager: he owned the Material 3 design system, ran 40 structured phone interviews plus 8 in-depth conversion interviews, split study into two daily modes, added gamification/ASMR mechanics, and uncovered the core premium conversion blocker.";
  }

  // Merat / Fintech / Signal
  if (/(merat|ara|signal|fintech|bank|heuristic|nielsen|مرآت|سیگنال|فینتک|نیلسن|بانک)/.test(q)) {
    return isFa
      ? "در حوزه **فینتک**، علیرضا روی **سیگنال** (محصول با بیش از ۵ میلیون کاربر — بخش سهام، دیده‌بان، انتخاب بانک و لندینگ) و **مرآت/آرا** (محصول بانکی رسالت — ارزیابی کامل ۱۰ اصل نیلسن، بازطراحی دوگانه متقاضی و کارشناس اعتبارسنجی و ساخت سیستم طراحی اختصاصی) کار کرده است."
      : "In **Fintech**, Alireza designed for **Signal** (5M+ users: stock viewing, Watchlist, bank selection, and responsive landing page) and led a full **Nielsen 10-heuristic evaluation** & dual-user redesign for **Merat (Ara)** alongside a custom product design system.";
  }

  // Games
  if (/(game|khiaar|freedom park|shah gol|unity|بازی|خیار|پارک آزادی|شاه گل)/.test(q)) {
    return isFa
      ? "علیرضا ۳ بازی موبایل منتشرشده در کافه‌بازار و مایکت دارد: **شاه‌گل** (گل یا پوچ آنلاین چندنفره با چت زنده و همکاری با یونیتی)، **پارک آزادی** (لید طراحی محصول، چیدمان نقشه و منتورینگ ۲ طراح جونیور) و **خیار** (بازی معمایی کلمات با چرخه‌های پلی‌تست)."
      : "Alireza shipped 3 mobile games live on Café Bazaar and Myket: **Shah Gol** (real-time multiplayer card game with live chat & Unity handoff), **Freedom Park** (Product Design Lead, map layout, MVP scoping & mentoring 2 juniors), and **Khiaar** (word puzzle game refined through playtesting).";
  }

  // Skills / Tools / Leadership / Mentoring
  if (/(skill|tool|figma|mentor|teach|leader|مهارت|ابزار|فیگما|منتور|تدریس)/.test(q)) {
    return isFa
      ? "مهارت‌های اصلی علیرضا در ۴ محور است: **طراحی و تحقیق** (UX Research، تست کاربردپذیری، معماری اطلاعات، سیستم طراحی)، **گردش‌کار هوش مصنوعی** (تست A/B، شبیه‌سازی پرسونا، پالایش PRD)، **ابزارها** (Figma، Design Tokens، Material، Tailwind، UIKit) و **رهبری** (منتورینگ ۲ طراح جونیور و تدریس دوره‌های معماری اطلاعات و دیزاین سیستم در کالج پارت)."
      : "Alireza's core capabilities span 4 pillars: **Design & Research** (UX research, usability testing, IA, design systems), **AI-Augmented Workflow** (A/B flow testing, persona simulation, PRD refinement), **Technical** (Figma, Design Tokens, Material/Tailwind, UIKit libraries), and **Leadership** (mentoring 2 juniors & teaching IA and Design Systems at Part College).";
  }

  // Education / Certifications
  if (/(education|university|degree|ibm|cert|تحصیل|دانشگاه|فردوسی|مدرک|گواهینامه)/.test(q)) {
    return isFa
      ? "علیرضا فارغ‌التحصیل **کارشناسی مهندسی کامپیوتر از دانشگاه فردوسی مشهد** (۱۳۹۶–۱۴۰۲) است و دارای گواهینامه‌های **IBM Enterprise Design Thinking (Co-Creator & Practitioner)**، دوره تخصصی **you.I کالج پارت** (۱ نفر از ۱۷ نفر میان ۳۰۰ متقاضی) و لوح تقدیر مدرس UI/UX از کالج پارت است."
      : "Alireza holds a **B.S. in Computer Engineering from Ferdowsi University of Mashhad** (2017–2023), **IBM Enterprise Design Thinking Co-Creator & Practitioner** certifications, and graduated from Part Software Group's **you.I** program (1 of 17 selected from 300 applicants), later earning a Certificate of Appreciation as a UI/UX instructor.";
  }

  // Contact / Resume / Availability / Hire
  if (/(contact|email|hire|resume|cv|telegram|تماس|ایمیل|رزومه|همکاری|تلگرام)/.test(q)) {
    return isFa
      ? `می‌تونی همین الان از تب **«چت مستقیم با علیرضا»** پیام بفرستی تا مستقیماً روی تلگرامش بره، یا به **${PROFILE.email}** ایمیل بزنی. رزومه PDF هم از لینک Resume در منوی بالا قابل دریافت است.`
      : `You can message Alireza directly via the **Live Chat** tab here (connected to Telegram), or email **${PROFILE.email}**. His full PDF resume is also available from the Resume link in the header.`;
  }

  // Default balanced overview
  return isFa
    ? "علیرضا محمدزاده فرشچی طراح محصول با **بیش از ۴ سال تجربه** و رویکرد تفکر سیستمی در حوزه‌های B2B، B2C، GovTech، فینتک، بازی و هوش مصنوعی است (فرانو، ایران‌سرور، مید این ایران، گروه نرم‌افزاری پارت). می‌تونی درباره هر پروژه (مثل ایران‌سرور، فرانو، مید این ایران، Word+، مرآت)، سیستم‌های طراحی، مهارت‌ها یا تحصیلاتش دقیق‌تر بپرسی!"
    : "Alireza Mohammadzade Farshchi is a **Product Designer with 5+ years of experience** and strong systems thinking across B2B, B2C, GovTech, fintech, gaming, and AI (Farano, IranServer, Made In Iran, Part Software Group). Ask me about any specific project, his design systems work, AI workflow, research process, or credentials!";
}

export function renderAssistantAndChat(content) {
  const isFa = content.lang === "fa";

  const quickPrompts = isFa
    ? [
        "درباره نتایج پروژه ایران‌سرور بگو",
        "تجربه سیستم طراحی علیرضا چیه؟",
        "چطور از هوش مصنوعی در طراحی استفاده می‌کنه؟",
        "تحصیلات و گواهینامه‌هاش چیه؟",
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
      aria-label="${isFa ? "بازگشت به بالا" : "Scroll to top"}"
      title="${isFa ? "بازگشت به بالا" : "Back to top"}"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Floating Assistant Launcher (Concise Microcopy) -->
    <button
      type="button"
      class="assistant-fab"
      id="assistant-fab"
      aria-expanded="false"
      aria-controls="assistant-drawer"
    >
      <span class="assistant-fab__dot" aria-hidden="true"></span>
      <span>${isFa ? "دستیار هوشمند" : "Ask AI"}</span>
    </button>

    <!-- Dual-Mode Slide-Over Drawer (AI Resume Assistant + Telegram Live Chat) -->
    <aside
      class="assistant-drawer"
      id="assistant-drawer"
      aria-hidden="true"
      aria-label="${isFa ? "دستیار هوشمند و گفت‌وگوی مستقیم" : "AI Assistant and Live Chat"}"
    >
      <div class="assistant-drawer__header">
        <div>
          <div class="assistant-drawer__title">
            ${isFa ? "دستیار علیرضا و چت مستقیم" : "Alireza's Assistant & Live Chat"}
          </div>
          <div class="assistant-drawer__sub">
            ${isFa ? "پاسخ فوری درباره رزومه یا پیام مستقیم به تلگرام" : "Instant resume Q&A or direct Telegram chat"}
          </div>
        </div>
        <button type="button" class="icon-btn" id="assistant-close" aria-label="${isFa ? "بستن" : "Close"}">
          ✕
        </button>
      </div>

      <div class="assistant-tabs" role="tablist">
        <button type="button" class="assistant-tab" role="tab" data-tab="ai" aria-selected="true">
          ✦ ${isFa ? "دستیار هوشمند رزومه" : "AI Resume Assistant"}
        </button>
        <button type="button" class="assistant-tab" role="tab" data-tab="chat" aria-selected="false">
          ✈ ${isFa ? "چت مستقیم (تلگرام)" : "Live Chat (Telegram)"}
        </button>
      </div>

      <!-- TAB 1: AI Resume Assistant -->
      <div class="assistant-pane" id="pane-ai" data-pane="ai">
        <div class="chat-feed" id="ai-feed">
          <div class="chat-msg chat-msg--bot">
            ${
              isFa
                ? "سلام! من دستیار هوشمند پرتفولیوی علیرضا هستم. هر سوالی درباره سوابق، پروژه‌ها، سیستم‌های طراحی یا مهارت‌هاش داری بپرس."
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
            placeholder="${isFa ? "سوالی درباره رزومه یا پروژه‌ها بپرسید..." : "Ask about experience, projects, skills..."}"
            autocomplete="off"
          />
          <button type="submit" class="btn btn--primary btn--sm">
            ${isFa ? "ارسال" : "Ask"}
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
            placeholder="${isFa ? "نام شما (اختیاری)" : "Your name (optional)"}"
            autocomplete="name"
          />
          <div style="display:flex;gap:8px;width:100%;">
            <input
              type="text"
              id="tg-input"
              class="chat-composer__input"
              placeholder="${isFa ? "پیام خود را برای علیرضا بنویسید..." : "Write a message to Alireza..."}"
              autocomplete="off"
              required
            />
            <button type="submit" class="btn btn--primary btn--sm">
              ${isFa ? "ارسال" : "Send"}
            </button>
          </div>
          <div class="tg-status-note" id="tg-status-note">
            ${
              SITE_CONFIG.WORKER_URL
                ? isFa
                  ? "متصل به تلگرام علیرضا — پاسخ‌ها همین‌جا نمایش داده می‌شوند."
                  : "Connected to Alireza's Telegram — replies appear live right here."
                : isFa
                  ? "پیام شما ثبت می‌شود و با یک کلیک از طریق ایمیل/تلگرام ارسال می‌گردد (بعد از اتصال Cloudflare Worker کاملاً خودکار و دوطرفه می‌شود)."
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

  // Auto-close drawer when clicking/tapping anywhere outside the drawer or launcher
  document.addEventListener("pointerdown", (e) => {
    if (!isOpen) return;
    if (drawer.contains(e.target) || fab.contains(e.target) || e.target.closest("[data-open-chat]")) {
      return;
    }
    setOpen(false);
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
        ? "سلام! پیامت رو اینجا بنویس تا مستقیم برای تلگرام علیرضا ارسال بشه و جوابش همین‌جا برات بیاد."
        : "Hi! Drop a message here — it routes directly to Alireza's Telegram so he can reply right back to this chat.",
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
    const sender = tgName?.value.trim() || (isFa ? "بازدیدکننده سایت" : "Portfolio Visitor");
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
              ? "✓ پیام به تلگرام علیرضا ارسال شد. منتظر پاسخ باشید..."
              : "✓ Sent to Alireza's Telegram. Replies will appear here automatically.",
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
        ? `پیام ذخیره شد. برای ارسال فوری تا زمان اتصال ربات تلگرام، روی این ایمیل کلیک کنید: ${PROFILE.email}`
        : `Saved! To deliver immediately before your Telegram Worker is connected, send via email: ${PROFILE.email}`,
    });
    saveChatHistory(messages);
    renderTgFeed();
    window.open(mailHref, "_blank", "noopener");
  });
}
