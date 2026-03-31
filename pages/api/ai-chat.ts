import type { NextApiRequest, NextApiResponse } from "next";

function getApiBase(): string {
  const base = (process.env.NEXT_PUBLIC_API_GRAPHQL_URL || "").replace(/\/graphql.*$/, "");
  return base || "http://localhost:3000";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiBase = getApiBase();
    const upstream = await fetch(`${apiBase}/ai-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body ?? {}),
    });

    const text = await upstream.text();
    const retryAfter = upstream.headers.get("Retry-After");
    if (retryAfter) res.setHeader("Retry-After", retryAfter);

    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers.get("Content-Type") || "application/json");
    return res.send(text);
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
