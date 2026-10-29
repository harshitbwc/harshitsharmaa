import { buildSystemPrompt } from "../src/data/knowledgeBase.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";
const MAX_TOKENS = 300;
const MAX_HISTORY_MESSAGES = 16; // ~8 exchanges, matches the client-side cap

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server is missing GROQ_API_KEY" });
    return;
  }

  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "`messages` must be a non-empty array" });
    return;
  }

  const trimmedHistory = messages
    .slice(-MAX_HISTORY_MESSAGES)
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (trimmedHistory.length === 0) {
    res.status(400).json({ error: "No valid messages provided" });
    return;
  }

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...trimmedHistory,
        ],
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errText);
      res.status(502).json({ error: "Upstream chat provider error" });
      return;
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      res.status(502).json({ error: "No reply from chat provider" });
      return;
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error("chat handler error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
