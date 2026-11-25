/**
 * Two-Way Telegram Live Chat Worker for alirezafarshchi.ir (Free Cloudflare Worker)
 * Supports both alirezafarshchi.ir and www.alirezafarshchi.ir, cache-free polling,
 * and instant delivery confirmation back in Telegram when you reply.
 */

const ALLOWED_ORIGINS = new Set([
  "https://alirezafarshchi.ir",
  "https://www.alirezafarshchi.ir",
]);

function getCorsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://alirezafarshchi.ir";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store, no-cache, must-revalidate",
  };
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...getCorsHeaders(request), "Content-Type": "application/json" },
  });
}

async function sendTelegram(env, text, replyToMessageId = null) {
  const body = {
    chat_id: String(env.TELEGRAM_CHAT_ID || "").trim(),
    text,
  };
  if (replyToMessageId) body.reply_to_message_id = replyToMessageId;

  return fetch(`https://api.telegram.org/bot${String(env.TELEGRAM_BOT_TOKEN || "").trim()}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: getCorsHeaders(request) });
    }

    const url = new URL(request.url);

    // 1. Visitor sends message -> Forward to Alireza's Telegram
    if (url.pathname === "/api/send" && request.method === "POST") {
      const { sessionId, sender, text, page } = await request.json();
      if (!sessionId || !text) return json(request, { error: "Missing fields" }, 400);

      const tgText =
        `💬 Portfolio Live Chat\n` +
        `From: ${sender || "Visitor"}\n` +
        `Page: ${page || "/"}\n` +
        `Session: [#${sessionId}]\n\n` +
        `${text}\n\n` +
        `(Reply to this message in Telegram to answer live on the website)`;

      const tgRes = await sendTelegram(env, tgText);
      if (!tgRes.ok) return json(request, { error: "Telegram delivery failed" }, 502);
      return json(request, { ok: true });
    }

    // 2. Telegram Webhook -> Captures Alireza's Reply in Telegram & stores in CHAT_KV
    if (url.pathname === "/telegram-webhook" && request.method === "POST") {
      try {
        const update = await request.json();
        const msg = update?.message;
        const replyToText = msg?.reply_to_message?.text || "";
        const match = replyToText.match(/#(af_[a-zA-Z0-9_-]+)/);
        const expectedChatId = String(env.TELEGRAM_CHAT_ID || "").trim();

        if (match && msg?.text && String(msg.chat?.id) === expectedChatId) {
          if (!env.CHAT_KV) {
            await sendTelegram(env, "⚠️ خطا: CHAT_KV به این Worker متصل نیست.", msg.message_id);
            return new Response("OK", { status: 200 });
          }

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

          await sendTelegram(env, "✅ پاسخ روی چت سایت ارسال شد.", msg.message_id);
        }
      } catch (err) {
        // Never return 500 to Telegram webhook so it doesn't retry endlessly
        return new Response("OK", { status: 200 });
      }
      return new Response("OK", { status: 200 });
    }

    // 3. Visitor polls for Alireza's Telegram replies (cache-free)
    if (url.pathname === "/api/messages" && request.method === "GET") {
      const sessionId = url.searchParams.get("session");
      if (!sessionId || !env.CHAT_KV) return json(request, { replies: [] });
      const replies = (await env.CHAT_KV.get(`replies:${sessionId}`, "json")) || [];
      return json(request, { replies });
    }

    return json(request, { status: "Portfolio Chat Worker Running", kvConnected: Boolean(env.CHAT_KV) });
  },
};
