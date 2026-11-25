/* ==========================================================================
   Site Integration Config
   Paste your free Cloudflare Worker URL below to activate:
   1. Two-way Live Chat <-> Telegram Bot replies
   2. Optional Live LLM mode for the AI Resume Assistant
   (Never put Bot Tokens or API Keys in this frontend file!)
   ========================================================================== */

export const SITE_CONFIG = {
  WORKER_URL: "https://portfolio-chat.farshchi78.workers.dev",

  // Optional direct Telegram username fallback (without @)
  TELEGRAM_USERNAME: "",
};
