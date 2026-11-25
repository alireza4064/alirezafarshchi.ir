/**
 * Two-Way Telegram Live Chat Worker for alirezafarshchi.ir (Free Cloudflare Worker)
 *
 * SETUP (5 minutes, 100% free):
 * 1. Message @BotFather on Telegram -> /newbot -> copy TELEGRAM_BOT_TOKEN.
 * 2. Message @userinfobot on Telegram -> copy your numeric TELEGRAM_CHAT_ID.
 * 3. Create a free Cloudflare Worker + KV Namespace bound as `CHAT_KV`.
 * 4. Add Environment Secrets in Cloudflare Worker Settings:
 *    - TELEGRAM_BOT_TOKEN
 *    - TELEGRAM_CHAT_ID
 * 5. Register Telegram Webhook once in your browser:
 *    https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<YOUR-WORKER>/telegram-webhook
 * 6. Paste your Worker URL into `src/config.js` -> `WORKER_URL`.
 *
 * HOW TWO-WAY REPLY WORKS:
 * - Visitor sends a message on alirezafarshchi.ir -> arrives in your Telegram with `[#sessionId]`.
 * - Simply hit "Reply" to that message in Telegram -> your reply appears live in the visitor's chat!
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://alirezafarshchi.ir",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // 1. Visitor sends message -> Forward to Alireza's Telegram
    if (url.pathname === "/api/send" && request.method === "POST") {
      const { sessionId, sender, text, page } = await request.json();
      if (!sessionId || !text) return json({ error: "Missing fields" }, 400);

      const tgText =
        `💬 Portfolio Live Chat\n` +
        `From: ${sender || "Visitor"}\n` +
        `Page: ${page || "/"}\n` +
        `Session: [#${sessionId}]\n\n` +
        `${text}\n\n` +
        `(Reply to this message in Telegram to answer live on the website)`;

      const tgRes = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: tgText,
          }),
        }
      );

      if (!tgRes.ok) return json({ error: "Telegram delivery failed" }, 502);
      return json({ ok: true });
    }

    // 2. Telegram Webhook -> Captures Alireza's Reply in Telegram & stores for the visitor's session
    if (url.pathname === "/telegram-webhook" && request.method === "POST") {
      const update = await request.json();
      const msg = update?.message;
      const replyToText = msg?.reply_to_message?.text || "";
      const match = replyToText.match(/\[#(af_[a-zA-Z0-9]+)\]/);

      if (match && msg?.text && String(msg.chat?.id) === String(env.TELEGRAM_CHAT_ID)) {
        const sessionId = match[1];
        const key = `replies:${sessionId}`;
        const existing = (await env.CHAT_KV.get(key, "json")) || [];
        existing.push({
          id: String(msg.message_id),
          text: msg.text,
          ts: Date.now(),
        });
        await env.CHAT_KV.put(key, JSON.stringify(existing.slice(-30)), {
          expirationTtl: 86400 * 7,
        });
      }
      return new Response("OK", { status: 200 });
    }

    // 3. Visitor polls for Alireza's Telegram replies
    if (url.pathname === "/api/messages" && request.method === "GET") {
      const sessionId = url.searchParams.get("session");
      if (!sessionId) return json({ replies: [] });
      const replies = (await env.CHAT_KV.get(`replies:${sessionId}`, "json")) || [];
      return json({ replies });
    }

    return json({ status: "Portfolio Chat Worker Running" });
  },
};
