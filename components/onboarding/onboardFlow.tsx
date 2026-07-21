"use client";

import Chat from "./chat";
import Questions from "./Questions";

import { ONBOARDING_STAGES } from "@/lib/ai/onboardingStages";
import { UserInsights } from "@/lib/types";

import { useOnboardingStore } from "@/stores/onboardingStore";

const OnboardingFlow = () => {
  const stageIndex = useOnboardingStore((state) => state.stageIndex);

  const followUpCount = useOnboardingStore((state) => state.followUpCount);

  const question = useOnboardingStore((state) => state.question);

  const answers = useOnboardingStore((state) => state.answers);

  const userInsights = useOnboardingStore((state) => state.userInsights);

  const addAnswer = useOnboardingStore((state) => state.addAnswer);

  const addInsights = useOnboardingStore((state) => state.addInsights);

  const setQuestion = useOnboardingStore((state) => state.setQuestion);

  const nextStage = useOnboardingStore((state) => state.nextStage);

  const incrementFollowUpCount = useOnboardingStore(
    (state) => state.incrementFollowUpCount,
  );

  const setIsComplete = useOnboardingStore((state) => state.setIsComplete);

  const currentStage = ONBOARDING_STAGES[stageIndex];

  const handleNext = (
    nextQuestion: string,
    answer: string,
    insights?: Partial<UserInsights>,
  ) => {
    addAnswer({
      stage: currentStage.id,
      question,
      answer,
    });

    if (insights) {
      addInsights(insights);
    }

    const nextFollowUp = followUpCount + 1;

    if (nextFollowUp > currentStage.maxFollowUps) {
      const nextStageIndex = stageIndex + 1;

      if (nextStageIndex >= ONBOARDING_STAGES.length) {
        setIsComplete(true);

        console.log("Onboarding Complete");

        console.log("Final Answers:", useOnboardingStore.getState().answers);

        console.log(
          "Final Insights:",
          useOnboardingStore.getState().userInsights,
        );

        return;
      }

      nextStage();

      setQuestion(ONBOARDING_STAGES[nextStageIndex].starterQuestion);

      return;
    }

    incrementFollowUpCount();

    setQuestion(nextQuestion);
  };

  return (
    <main className="mt-4 w-full flex flex-col gap-1">
      <Questions />

      <Chat
        stage={currentStage}
        followUpCount={followUpCount}
        answers={answers}
        userInsights={userInsights}
        onNext={handleNext}
      />
    </main>
  );
};

export default OnboardingFlow;
