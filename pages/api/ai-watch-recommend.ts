import type { NextApiRequest, NextApiResponse } from "next";

export interface AIWatchRecommendItem {
  brand: string;
  model: string;
  price: string;
  reason: string;
  description: string;
}

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function buildPrompt(params: {
  gender: string;
  style: string;
  budget: string;
  color: string;
  thought: string;
}): string {
  const parts: string[] = [
    "You are a luxury watch expert. Based on the user's preferences, recommend exactly 3 watches.",
    "Reply ONLY with a valid JSON array, no other text. Each object must have: brand, model, price (e.g. $5,000), reason (short), description (40-50 words explaining why this watch is recommended).",
    "The description field for each watch MUST be between 40 and 50 words.",
    "Example format: [{\"brand\":\"Rolex\",\"model\":\"Submariner\",\"price\":\"$8,500\",\"reason\":\"...\",\"description\":\"...\"}]",
  ];
  const prefs: string[] = [];
  if (params.gender) prefs.push(`Gender: ${params.gender}`);
  if (params.style) prefs.push(`Style: ${params.style}`);
  if (params.budget) {
    if (params.budget === "under-5k") {
      prefs.push("Budget: under $5,000 (maximum $5,000).");
      parts.push(
        "Every recommended watch must have a price less than or equal to $5,000. Do NOT recommend watches above this budget."
      );
    } else if (params.budget === "5k-10k") {
      prefs.push("Budget: between $5,000 and $10,000.");
      parts.push(
        "Every recommended watch must have a price between $5,000 and $10,000 (inclusive). Do NOT recommend cheaper or more expensive watches."
      );
    } else if (params.budget === "10k-plus") {
      prefs.push("Budget: above $10,000.");
      parts.push(
        "Every recommended watch must have a price strictly greater than $10,000. Do NOT recommend cheaper watches."
      );
    } else {
      prefs.push(`Budget: ${params.budget}`);
    }
  }
  if (params.color) prefs.push(`Color: ${params.color}`);
  if (params.thought?.trim()) prefs.push(`Additional: ${params.thought.trim()}`);
  if (prefs.length) parts.push("User preferences:\n" + prefs.join("\n"));
  parts.push("Return only the JSON array.");
  return parts.join("\n\n");
}

function parseJsonFromText(text: string): { watches: AIWatchRecommendItem[]; parseError?: string } {
  const trimmed = text.trim();
  let jsonStr = trimmed;
  const codeBlock = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) jsonStr = codeBlock[1].trim();
  const arrayMatch = jsonStr.match(/\[\s*[\s\S]*\s*\]/);
  if (arrayMatch) jsonStr = arrayMatch[0];
  try {
    const parsed = JSON.parse(jsonStr) as unknown;
    if (!Array.isArray(parsed)) return { watches: [] };
    const watches = parsed
      .filter((item) => item && typeof item === "object" && item.brand && item.model)
      .map((item: Record<string, unknown>) => ({
        brand: String(item.brand ?? ""),
        model: String(item.model ?? ""),
        price: String(item.price ?? ""),
        reason: String(item.reason ?? ""),
        description: String(item.description ?? ""),
      }));
    return { watches };
  } catch (e) {
    return { watches: [], parseError: e instanceof Error ? e.message : "JSON parse error" };
  }
}

async function fetchOpenAIRecommendations(
  params: { gender: string; style: string; budget: string; color: string; thought: string },
  apiKey: string
): Promise<AIWatchRecommendItem[]> {
  const prompt = buildPrompt(params);
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
      messages: [
        {
          role: "system",
          content:
            "You are a luxury watch expert. Always respond ONLY with a valid JSON array of exactly 3 watch objects, no extra text. The description field for each watch MUST be between 40 and 50 words.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errMsg =
      data?.error?.message || data?.error?.code || `OpenAI API: ${res.status}`;
    throw new Error(errMsg);
  }

  const text: string =
    data?.choices?.[0]?.message?.content?.trim() || "";
  if (!text) {
    throw new Error("OpenAI response was empty.");
  }

  const { watches, parseError } = parseJsonFromText(text);
  if (parseError) {
    throw new Error(`OpenAI response parse error: ${parseError}`);
  }
  return watches;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { gender = "", style = "", budget = "", color = "", thought = "" } = (req.body || {}) as Record<string, string>;

    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!openaiKey && !geminiKey) {
      return res.status(200).json({
        watches: [],
        error: "AI service is not configured. Set OPENAI_API_KEY in .env.local. (Optional: set GEMINI_API_KEY for Google Gemini fallback).",
      });
    }

    if (openaiKey) {
      const watches = await fetchOpenAIRecommendations(
        { gender, style, budget, color, thought },
        openaiKey
      );
      return res.status(200).json({ watches });
    }

    // Fallback: Gemini (old behavior)
    const apiKey = geminiKey as string;
    const prompt = buildPrompt({ gender, style, budget, color, thought });
    const url = `${GEMINI_URL}?key=${apiKey}`;
    const resGemini = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await resGemini.json().catch(() => ({}));
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!text) {
      return res.status(200).json({
        watches: [],
        error: data.candidates?.[0]?.finishReason || "AI did not respond.",
      });
    }

    const { watches, parseError } = parseJsonFromText(text);
    if (parseError) {
      console.warn("[api/ai-watch-recommend] Gemini response parse issue:", parseError, "Raw length:", text.length);
      return res.status(200).json({
        watches: [],
        error: "AI response format is invalid. Please try again.",
      });
    }
    return res.status(200).json({ watches });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    console.error("[api/ai-watch-recommend]", msg, err);
    return res.status(500).json({ watches: [], error: msg });
  }
}
