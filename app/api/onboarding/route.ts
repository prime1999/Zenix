import { NextResponse } from "next/server";

import { ai } from "@/lib/ai/gemini";
import { ONBOARDING_SYSTEM_PROMPT } from "@/lib/ai/onboardingPrompts";
import { Answer, UserInsights } from "@/lib/types";

function extractDisplayName(
  userInsights?: Partial<UserInsights>,
  answers?: Answer[],
  latestAnswer?: string,
) {
  // First try saved name
  let rawName = userInsights?.name;

  // Then try identity stage answer
  if (!rawName && answers?.length) {
    const identityAnswer = answers.find((a) => a.stage === "identity");

    if (identityAnswer) {
      rawName = identityAnswer.answer;
    }
  }

  // Fallback for very first question
  if (!rawName && latestAnswer) {
    rawName = latestAnswer;
  }

  if (!rawName || typeof rawName !== "string") {
    return null;
  }

  const trimmed = rawName.trim();

  if (!trimmed) {
    return null;
  }

  const parts = trimmed.split(/\s+/);

  const firstName = parts[0];

  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { question, answer, answers, stage, followUpCount, userInsights } =
      body;

    const displayName = extractDisplayName(userInsights, answers, answer);

    const stageAnswers = answers.filter(
      (item: Answer) => item.stage === stage.id,
    );

    const isFinalFollowUp = followUpCount + 1 >= stage.maxFollowUps;

    const prompt = `
${ONBOARDING_SYSTEM_PROMPT}

USER IDENTIFICATION
-------------------
${displayName ? `User Name: "${displayName}"` : `User Name: Unknown`}

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

ALL PREVIOUS ANSWERS
--------------------
${JSON.stringify(answers, null, 2)}

ANSWERS FROM THIS STAGE
-----------------------
${JSON.stringify(stageAnswers, null, 2)}

YOUR TASK
---------

You are currently exploring the "${stage.id}" stage.

Your goal is:
${stage.goal}

IMPORTANT

You are building an evolving understanding of this person.

The user should feel like you remember who they are.

Use:

- KNOWN USER INSIGHTS
- ALL PREVIOUS ANSWERS
- CURRENT STAGE

to maintain continuity.

The user should NEVER feel like they are starting over.

Before asking a question, check:

- Has this already been asked?
- Has this already been answered?
- Is this already obvious from previous context?

If YES:

DO NOT ask it again.

Move the conversation forward.

CONVERSATION STYLE

1. Start with a brief natural reaction.
2. Then ask ONE question.
3. Keep the entire response short.
4. Sound like someone having coffee with a friend.
5. Curious, grounded, intelligent.
6. Not corporate.
7. Not philosophical.
8. Not overly deep.
9. Not a questionnaire.

NAME USAGE

${
  displayName
    ? `You may occasionally use "${displayName}" naturally, but do not overuse it.`
    : `Do not force name usage.`
}

RULES

1. Ask ONLY ONE question.
2. Never ask multiple questions.
3. Never ask compound questions.
4. Build on previous answers.
5. Stay focused on the current stage.
6. Do not move to another stage.
7. Do not summarize.
8. Do not give advice.
9. Do not explain your reasoning.
10. Make the user feel understood.

${
  isFinalFollowUp
    ? `
This is the FINAL follow-up for this stage.

Ask a question that completes your understanding of this stage before moving on.
`
    : `
Continue exploring this stage naturally.
`
}

Also extract NEW insights from the latest answer.

Only include insights that are genuinely new.

Return valid JSON only:

{
  "nextQuestion": "",
  "insights": {
    "name": "${displayName ?? ""}",
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
