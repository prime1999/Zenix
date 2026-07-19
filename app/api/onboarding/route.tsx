import { NextResponse } from "next/server";
import { ai } from "@/lib/ai/gemini";
import { ONBOARDING_SYSTEM_PROMPT } from "@/lib/ai/onboardingPrompts";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { question, answer, answers } = body;

    const prompt = `
${ONBOARDING_SYSTEM_PROMPT}

Current Question:
${question}

Current Answer:
${answer}

Previous Answers:
${JSON.stringify(answers)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    const text = response.text;

    const parsed = JSON.parse(text ?? "{}");

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate question" },
      { status: 500 },
    );
  }
}
