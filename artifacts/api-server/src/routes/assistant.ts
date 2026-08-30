import { Router, type IRouter } from "express";
import { SendAssistantMessageBody, SendAssistantMessageResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const SUBJECT_LIST = `The student is studying these GCSE subjects and specifications:
- Maths — OCR Higher
- English Language — AQA 8700
- English Literature — AQA 8702
- Chemistry — AQA 8462 Triple
- Biology — AQA 8461 Triple
- Physics — AQA 8463 Triple
- Geography — AQA 8035
- Spanish — AQA 8692 Higher
- D&T — EDUQAS`;

router.post("/assistant/chat", async (req, res): Promise<void> => {
  const parsed = SendAssistantMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: "Assistant is not configured yet." });
    return;
  }

  const planSummary = parsed.data.plan?.length
    ? parsed.data.plan
        .map((item) => `- ${item.subject} → ${item.group} → ${item.subtopic} (${item.reason === "new" ? "never revised" : "overdue"})`)
        .join("\n")
    : "Nothing is currently scheduled today.";

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 900,
        system: `${SUBJECT_LIST}\n\nYou are a calm, encouraging, precise GCSE revision assistant. Explain at GCSE level, stay exam-relevant, and do not invent case-study statistics or mark-scheme wording. Today's plan:\n${planSummary}`,
        messages: parsed.data.messages,
      }),
    });

    const payload = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>;
      error?: { message?: string };
    };
    if (!response.ok) {
      res.status(500).json({ error: payload.error?.message ?? "Assistant request failed." });
      return;
    }

    const reply = payload.content?.find((block) => block.type === "text")?.text;
    res.json(SendAssistantMessageResponse.parse({ reply: reply ?? "Sorry, I didn't get a response." }));
  } catch (error) {
    req.log.error({ error }, "Assistant request failed");
    res.status(500).json({ error: "Assistant request failed." });
  }
});

export default router;