import { onboardingPayload } from "../types";

export const generateNextQuestion = async (payload: onboardingPayload) => {
  const res = await fetch("/api/onboarding", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.log(text);
    return;
  }
  return res.json();
};
