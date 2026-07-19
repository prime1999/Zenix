"use client";

import { useState } from "react";

import Chat from "./chat";
import Questions from "./Questions";

import { FIRST_QUESTION } from "@/lib/ai/onboardingStages";

const OnboardingFlow = () => {
  const [question, setQuestion] = useState(FIRST_QUESTION);

  const [answers, setAnswers] = useState<
    {
      question: string;
      answer: string;
    }[]
  >([]);

  const handleNext = (nextQuestion: string, answer: string) => {
    setAnswers((prev) => [
      ...prev,
      {
        question,
        answer,
      },
    ]);

    setQuestion(nextQuestion);
  };

  return (
    <main className="mt-4 w-full flex flex-col gap-1">
      <Questions question={question} />
      <Chat question={question} onNext={handleNext} />
    </main>
  );
};

export default OnboardingFlow;
