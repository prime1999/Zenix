import { NextResponse } from "next/server";

import { ai } from "@/lib/ai/gemini";
import { ONBOARDING_SYSTEM_PROMPT } from "@/lib/ai/onboardingPrompts";
import { UserInsights } from "@/lib/types";

// Helper function to extract and format display name cleanly
function extractDisplayName(
  userInsights?: Record<UserInsights, any>,
  answers?: Array<{ question: string; answer: string; stage: string }>,
  latestAnswer?: string,
): string {
  // 1. Try to find a name from explicit insights first
  let rawName = userInsights?.name;

  // 2. If not in insights, search for a name in previous stage answers
  if (!rawName && Array.isArray(answers)) {
    const nameAnswer = answers.find(
      (a) =>
        a.question.toLowerCase().includes("name") ||
        a.question.toLowerCase().includes("call you") ||
        a.question.toLowerCase().includes("who are you"),
    );
    if (nameAnswer) {
      rawName = nameAnswer.answer;
    }
  }

  // 3. Fallback to current answer if we are on the name stage right now
  if (!rawName && latestAnswer) {
    rawName = latestAnswer;
  }

  if (!rawName || typeof rawName !== "string") return "there";

  const trimmed = rawName.trim();
  const parts = trimmed.split(/\s+/);

  // Single word / moniker like "priime" -> capitalize to "Priime"
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
  }

  // Full name like "olanaji yusuf" -> pick the first name "Olanaji"
  const firstName = parts[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { question, answer, answers, stage, followUpCount, userInsights } =
      body;

    // Dynamically extract name from stage history or insights
    const displayName = extractDisplayName(userInsights, answers, answer);

    const stageAnswers = answers.filter(
      (item: { stage: string }) => item.stage === stage.id,
    );

    const isFinalFollowUp = followUpCount + 1 >= stage.maxFollowUps;

    const prompt = `
${ONBOARDING_SYSTEM_PROMPT}

USER IDENTIFICATION
-------------------
User's Name: "${displayName}"
(Note: Address them as "${displayName}" occasionally when it fits naturally. If "${displayName}" is "there", do not force name usage.)

CURRENT STAGE
-------------
Stage ID: ${stage.id}

Stage Goal:
${stage.goal}

FOLLOW UP PROGRESS
------------------
Current Follow Up: ${followUpCount + 1}
Maximum Follow Ups: ${stage.maxFollowUps}

Is Final Follow Up:
${isFinalFollowUp}

CURRENT QUESTION
----------------
${question}

USER'S LATEST ANSWER
--------------------
${answer}

KNOWN USER INSIGHTS
-------------------
${JSON.stringify(userInsights, null, 2)}

ANSWERS FROM THIS STAGE
-----------------------
${JSON.stringify(stageAnswers, null, 2)}

YOUR TASK
---------
You are exploring the "${stage.id}" stage.

Your main goal for this turn:
${stage.goal}

HOW TO FORMULATE "nextQuestion":
1. **Reaction + Question:** Start with a brief (1 sentence), natural, slightly witty or grounded reaction to what they just said. Then ask your ONE question.
2. **Name Usage:** You can address them as "${displayName}" occasionally when it feels natural, but don't force it into every response.
3. **Keep the Vibe Right:** Sound like a peer who is sharp, driven, and easy to talk to over coffee.
4. **Build on Insights:** Use KNOWN USER INSIGHTS so the user feels heard and remembered.

RULES
1. Ask ONLY ONE question total in "nextQuestion".
2. Keep the entire response under 2–3 short sentences max.
3. Do not summarize, give unsolicited advice, or explain your reasoning.
4. Extract NEW insights from the user's latest answer into the JSON (including their name if they just introduced themselves).

${
  isFinalFollowUp
    ? `
This is the FINAL follow-up for this stage.
Ask a slightly sharper question that locks in your understanding of this stage before moving on.
`
    : `
Continue exploring this stage naturally.
`
}

Return valid JSON ONLY matching this format:
{
  "nextQuestion": "",
  "insights": {
    "name": "${displayName !== "there" ? displayName : ""}",
    "interests": [],
    "motivations": [],
    "values": [],
    "futureVision": [],
    "obstacles": []
  }
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    const text = response.text ?? "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Invalid Gemini JSON:", cleaned);

      return NextResponse.json(
        {
          error: "Invalid AI response",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate question",
      },
      {
        status: 500,
      },
    );
  }
}
