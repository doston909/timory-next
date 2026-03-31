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
    const upstream = await fetch(`${apiBase}/ai-watch-recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body ?? {}),
    });

    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers.get("Content-Type") || "application/json");
    return res.send(text);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    console.error("[api/ai-watch-recommend]", msg, err);
    return res.status(500).json({ watches: [], error: msg });
  }
}
