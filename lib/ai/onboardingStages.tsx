export const ONBOARDING_STAGES = [
  {
    id: "identity",
    starterQuestion: "Before we begin... what should I call you?",
    goal: "Learn the user's preferred name and begin the conversation.",
    maxFollowUps: 0,
  },
  {
    id: "interests",
    starterQuestion:
      "Nice to meet you. Tell me a little about yourself. What do you genuinely enjoy spending your time on?",
    goal: "Understand what naturally interests, excites, and energizes the user.",
    maxFollowUps: 2,
  },
  {
    id: "vision",
    starterQuestion:
      "Now imagine there were no limits.\n\nNo lack of money.\nNo lack of time.\nNo fear of failure.\n\nWho would you want to become?",
    goal: "Understand the user's future vision and the person they want to become.",
    maxFollowUps: 3,
  },
  {
    id: "barriers",
    starterQuestion:
      "What's the biggest thing standing between you and that version of yourself today?",
    goal: "Identify fears, habits, limitations, and challenges.",
    maxFollowUps: 2,
  },
  {
    id: "reflection",
    starterQuestion:
      "If your future self could give you one piece of advice right now, what do you think they would say?",
    goal: "Encourage self-reflection and gather final insights.",
    maxFollowUps: 1,
  },
];
