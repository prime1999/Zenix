import { create } from "zustand";

import { ONBOARDING_STAGES } from "@/lib/ai/onboardingStages";
import { Answer, OnboardingStore, UserInsights } from "@/lib/types";

const createInitialInsights = (): UserInsights => ({
  name: "",

  interests: [],
  motivations: [],
  values: [],
  futureVision: [],
  obstacles: [],
  strengths: [],
});

const mergeArrays = (
  existing: string[] = [],
  incoming: string[] = [],
): string[] => [...new Set([...existing, ...incoming])];

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  // ==================================
  // State
  // ==================================

  stageIndex: 0,

  followUpCount: 0,

  question: ONBOARDING_STAGES[0].starterQuestion,

  answers: [],

  userInsights: createInitialInsights(),

  isComplete: false,

  // ==================================
  // Actions
  // ==================================

  setQuestion: (question) =>
    set({
      question,
    }),

  setStageIndex: (stageIndex) =>
    set({
      stageIndex,
      followUpCount: 0,
    }),

  nextStage: () =>
    set((state) => ({
      stageIndex: Math.min(state.stageIndex + 1, ONBOARDING_STAGES.length - 1),
      followUpCount: 0,
    })),

  setFollowUpCount: (followUpCount) =>
    set({
      followUpCount,
    }),

  incrementFollowUpCount: () =>
    set((state) => ({
      followUpCount: state.followUpCount + 1,
    })),

  setIsComplete: (isComplete) =>
    set({
      isComplete,
    }),

  addAnswer: (answer: Answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
    })),

  addInsights: (newInsights) =>
    set((state) => ({
      userInsights: {
        name: newInsights.name?.trim() || state.userInsights.name,

        interests: mergeArrays(
          state.userInsights.interests,
          newInsights.interests ?? [],
        ),

        motivations: mergeArrays(
          state.userInsights.motivations,
          newInsights.motivations ?? [],
        ),

        values: mergeArrays(
          state.userInsights.values,
          newInsights.values ?? [],
        ),

        futureVision: mergeArrays(
          state.userInsights.futureVision,
          newInsights.futureVision ?? [],
        ),

        obstacles: mergeArrays(
          state.userInsights.obstacles,
          newInsights.obstacles ?? [],
        ),

        strengths: mergeArrays(
          state.userInsights.strengths,
          newInsights.strengths ?? [],
        ),
      },
    })),

  setInsights: (userInsights) =>
    set({
      userInsights,
    }),

  reset: () =>
    set({
      stageIndex: 0,
      followUpCount: 0,
      question: ONBOARDING_STAGES[0].starterQuestion,
      answers: [],
      userInsights: createInitialInsights(),
      isComplete: false,
    }),
}));
