import { NextResponse } from "next/server";

import { ai } from "@/lib/ai/gemini";
import { ONBOARDING_SYSTEM_PROMPT } from "@/lib/ai/onboardingPrompts";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { question, answer, answers, stage, followUpCount, userInsights } =
      body;

    const stageAnswers = answers.filter(
      (item: { stage: string }) => item.stage === stage.id,
    );

    const isFinalFollowUp = followUpCount + 1 >= stage.maxFollowUps;

    const prompt = `
${ONBOARDING_SYSTEM_PROMPT}

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
2. **Keep the Vibe Right:** Sounds like a peer who is sharp, driven, and easy to talk to over coffee—not an interviewer, coach, or robot.
3. **Build on Insights:** Use KNOWN USER INSIGHTS so the user feels heard and remembered.

Examples of Good Tone:
- Known: Wants to build Edtech.
  User answer: "Existing platforms are way too boring."
  Good: "Yeah, most of them feel like doing tax forms with a compiler attached. What’s the secret sauce you’re thinking of adding to actually make it fun?"

- Known: Wants to build dev tools.
  User answer: "I just love getting into the flow state."
  Good: "Nothing beats that late-night coding high when everything just clicks. What kind of problem gets you locked in like that?"

RULES
1. Ask ONLY ONE question total in "nextQuestion".
2. Keep the entire response under 2–3 short sentences max.
3. Do not summarize, give unsolicited advice, or explain your reasoning.
4. Extract NEW insights from the user's latest answer into the JSON.

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
    "interests": [],
    "motivations": [],
    "values": [],
    "futureVision": [],
    "obstacles": [],
    "strengths": []
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
