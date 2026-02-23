import type { NextApiRequest, NextApiResponse } from "next";

interface HistoryItem {
  role: string;
  content: string;
}

/**
 * OpenAI Chat Completions orqali javob olish
 */
async function fetchOpenAIReply(
  message: string,
  history: HistoryItem[],
  apiKey: string
): Promise<string> {
  const validHistory = history.filter((h) => h?.content?.trim());
  const messages = [
    ...validHistory.map((h) => ({
      role: h.role === "assistant" ? "assistant" : "user",
      content: String(h.content).trim(),
    })),
    { role: "user" as const, content: message.trim() },
  ];

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const url =
    process.env.OPENAI_BASE_URL?.trim() ||
    "https://api.openai.com/v1/chat/completions";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errMsg =
      data?.error?.message ||
      data?.error?.code ||
      `OpenAI API: ${res.status}`;
    const isRateLimit =
      res.status === 429 || /quota|rate limit/i.test(String(errMsg));
    const e = new Error(errMsg) as Error & {
      statusCode?: number;
      retryAfter?: number;
    };
    e.statusCode = res.status;
    if (isRateLimit) {
      const retryHeader = res.headers.get("Retry-After");
      e.retryAfter = retryHeader ? Number(retryHeader) || 30 : 30;
    }
    throw e;
  }

  const text: string =
    data?.choices?.[0]?.message?.content?.trim() ||
    "";
  if (text) return text;
  throw new Error("OpenAI response was empty.");
}

/** Bepul kvota ko‘proq bo‘lishi mumkin bo‘lgan model birinchi */
const GEMINI_MODELS = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"] as const;

/** Gemini API orqali AI javob olish (model topilmasa keyingi model sinanadi) */
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

  const body = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  };

  let lastError: Error | null = null;
  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errMsg =
        data?.error?.message || data?.error?.status || `Gemini API: ${res.status}`;
      const isModelNotFound = res.status === 404 || /not found|invalid model/i.test(String(errMsg));
      if (isModelNotFound) {
        lastError = new Error(errMsg);
        continue;
      }
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
    if (text) return text;
    const blockReason =
      data.candidates?.[0]?.finishReason || "Javob generatsiya qilinmadi.";
    throw new Error(blockReason);
  }

  throw lastError || new Error("Gemini model topilmadi.");
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
      return res.status(400).json({ error: "Message is required." });
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!openaiKey && !geminiKey) {
      return res.status(200).json({
        reply:
          "AI service is not configured. Set OPENAI_API_KEY in .env.local. (Optional: set GEMINI_API_KEY for Google Gemini fallback).",
      });
    }

    const reply = openaiKey
      ? await fetchOpenAIReply(message, history, openaiKey)
      : await fetchGeminiReply(message, history, geminiKey as string);

    return res.status(200).json({ reply });
  } catch (err: unknown) {
    const e = err as Error & { statusCode?: number; retryAfter?: number };
    const msg = e?.message || "An error occurred with the AI service.";
    const isRateLimit = e?.statusCode === 429 || e?.retryAfter;
    const retrySec = e?.retryAfter ?? 30;
    console.error("[api/ai-chat]", msg, err);

    if (isRateLimit) {
      res.setHeader("Retry-After", String(retrySec));
      return res.status(429).json({
        error: `Rate limit. Try again in ${retrySec} seconds.`,
        reply: null,
        retryAfter: retrySec,
      });
    }

    return res.status(500).json({ error: msg, reply: null });
  }
}
