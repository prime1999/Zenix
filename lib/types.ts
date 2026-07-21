export type Answer = {
  stage: string;
  question: string;
  answer: string;
};

export type UserInsights = {
  name: string;
  interests: string[];
  motivations: string[];
  values: string[];
  futureVision: string[];
  obstacles: string[];
  strengths: string[];
};

export type Stage = {
  id: string;
  starterQuestion: string;
  goal: string;
  maxFollowUps: number;
};

export type onboardingPayload = {
  question: string;
  answer: string;
  answers: Answer[];
  stage: Stage;
  followUpCount: number;
  userInsights: UserInsights;
};

export type OnboardingStore = {
  // =========================
  // State
  // =========================

  stageIndex: number;

  followUpCount: number;

  question: string;

  answers: Answer[];

  userInsights: UserInsights;

  isComplete: boolean;

  // =========================
  // Actions
  // =========================

  setQuestion: (question: string) => void;

  setStageIndex: (stageIndex: number) => void;

  nextStage: () => void;

  setFollowUpCount: (count: number) => void;

  incrementFollowUpCount: () => void;

  setIsComplete: (isComplete: boolean) => void;

  addAnswer: (answer: Answer) => void;

  addInsights: (insights: Partial<UserInsights>) => void;

  setInsights: (userInsights: UserInsights) => void;

  reset: () => void;
};
