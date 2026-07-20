"use client";

import { useState } from "react";

import Chat from "./chat";
import Questions from "./Questions";

import { ONBOARDING_STAGES } from "@/lib/ai/onboardingStages";

type Answer = {
  stage: string;
  question: string;
  answer: string;
};

const OnboardingFlow = () => {
  const [followUpCount, setFollowUpCount] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  const [question, setQuestion] = useState(
    ONBOARDING_STAGES[0].starterQuestion,
  );

  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentStage = ONBOARDING_STAGES[stageIndex];

  const handleNext = (nextQuestion: string, answer: string) => {
    setAnswers((prev) => [
      ...prev,
      {
        stage: currentStage.id,
        question,
        answer,
      },
    ]);

    const nextFollowUpCount = followUpCount + 1;

    if (nextFollowUpCount > currentStage.maxFollowUps) {
      const nextStageIndex = stageIndex + 1;

      if (nextStageIndex >= ONBOARDING_STAGES.length) {
        console.log("Onboarding Complete");

        // TODO:
        // Generate Future Self Profile
        // Redirect to Dashboard

        return;
      }

      setStageIndex(nextStageIndex);

      setQuestion(ONBOARDING_STAGES[nextStageIndex].starterQuestion);

      setFollowUpCount(0);

      return;
    }

    setFollowUpCount(nextFollowUpCount);

    setQuestion(nextQuestion);
  };

  return (
    <main className="mt-4 w-full flex flex-col gap-1">
      <Questions question={question} />

      <Chat
        question={question}
        stage={currentStage}
        followUpCount={followUpCount}
        answers={answers}
        onNext={handleNext}
      />
    </main>
  );
};

export default OnboardingFlow;
