import type { NextApiRequest, NextApiResponse } from "next";

interface HistoryItem {
  role: string;
  content: string;
}

/** Gemini API orqali AI javob olish */
async function fetchGeminiReply(
  message: string,
  history: HistoryItem[],
  apiKey: string
): Promise<string> {
  const validHistory = history.filter((h) => h?.content?.trim());
  const contents = [
    ...validHistory.map((h) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: String(h.content).trim() }],
    })),
    { role: "user" as const, parts: [{ text: message.trim() }] },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errMsg =
      data?.error?.message || data?.error?.status || `Gemini API: ${res.status}`;
    const isRateLimit =
      res.status === 429 ||
      /retry in \d/i.test(String(errMsg)) ||
      /quota|rate limit/i.test(String(errMsg));
    const e = new Error(errMsg) as Error & { statusCode?: number; retryAfter?: number };
    e.statusCode = res.status;
    if (isRateLimit) {
      const match = String(errMsg).match(/retry in (\d+(?:\.\d+)?)\s*s/i);
      e.retryAfter = match ? Math.ceil(Number(match[1])) : 30;
    }
    throw e;
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

  if (!text) {
    const blockReason =
      data.candidates?.[0]?.finishReason || "Javob generatsiya qilinmadi.";
    throw new Error(blockReason);
  }

  return text;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [] } = req.body as {
      message?: string;
      history?: HistoryItem[];
    };

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message talab qilinadi." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        reply:
          "AI xizmati hozircha yoqilmagan. Sozlash uchun .env.local faylida GEMINI_API_KEY ni belgilang. Google AI Studio (aistudio.google.com) orqali bepul API kalit olishingiz mumkin.",
      });
    }

    const reply = await fetchGeminiReply(message, history, apiKey);

    return res.status(200).json({ reply });
  } catch (err: unknown) {
    const e = err as Error & { statusCode?: number; retryAfter?: number };
    const msg = e?.message || "AI xizmatida xatolik.";
    const isRateLimit = e?.statusCode === 429 || e?.retryAfter;
    const retrySec = e?.retryAfter ?? 30;
    console.error("[api/ai-chat]", msg, err);

    if (isRateLimit) {
      res.setHeader("Retry-After", String(retrySec));
      return res.status(429).json({
        error: `So‘rovlar limiti. ${retrySec} soniyadan keyin qayta urinib ko‘ring.`,
        reply: null,
        retryAfter: retrySec,
      });
    }

    return res.status(500).json({ error: msg, reply: null });
  }
}
