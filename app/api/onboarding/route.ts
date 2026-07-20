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

You are currently exploring the "${stage.id}" stage.

Your goal is:
${stage.goal}

IMPORTANT:

You are building an evolving understanding of this person.

The "KNOWN USER INSIGHTS" section contains things you already know.

Do NOT ask questions about things already understood.

Do NOT repeat previous questions in a different form.

Instead:

- Build on existing insights.
- Go deeper.
- Connect ideas together.
- Make the conversation feel continuous.

When transitioning between topics, use information you already know about the user.

Example:

Known:
- enjoys building products
- loves bringing ideas to life

Bad:
"What do you enjoy about creating things?"

Good:
"You seem drawn to turning ideas into reality. What kind of impact do you hope those creations have on other people?"

RULES

1. Ask only ONE question.
2. Never ask multiple questions.
3. Keep it conversational.
4. Build on previous answers.
5. Stay focused on the current stage.
6. Do not move to another stage.
7. Do not summarize.
8. Do not give advice.
9. Do not explain your reasoning.
10. Make the conversation feel like you remember who the user is.

${
  isFinalFollowUp
    ? `
This is the FINAL follow-up for this stage.

Ask a deeper question that helps complete your understanding of the user before moving on.
`
    : `
Continue exploring this stage naturally.
`
}

Also extract NEW insights from the user's latest answer.

Only include insights that are not already present in KNOWN USER INSIGHTS.

Return valid JSON only:

{
  "nextQuestion": "",
  "insights": {
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
