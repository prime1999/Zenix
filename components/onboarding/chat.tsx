"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";

import { Textarea } from "../ui/textarea";

type UserInsights = {
  interests: string[];
  motivations: string[];
  values: string[];
  futureVision: string[];
  obstacles: string[];
};

type Props = {
  question: string;

  stage: {
    id: string;
    goal: string;
    maxFollowUps: number;
  };

  followUpCount: number;

  answers: {
    stage: string;
    question: string;
    answer: string;
  }[];

  userInsights: UserInsights;

  onNext: (
    nextQuestion: string,
    answer: string,
    insights?: Partial<UserInsights>,
  ) => void;
};

const Chat = ({
  question,
  stage,
  followUpCount,
  answers,
  userInsights,
  onNext,
}: Props) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question,
          answer,
          answers,
          stage,
          followUpCount,
          userInsights,
        }),
      });

      const data = await res.json();

      onNext(data.nextQuestion, answer, data.insights);

      setAnswer("");
    } catch (error) {
      console.error("Onboarding Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative">
      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Feel free to express yourself..."
        className="mt-6 h-24"
      />

      <button
        disabled={loading || answer.trim() === ""}
        onClick={handleSubmit}
        className="absolute right-3 bottom-2 bg-primary-purple text-white rounded-full p-2 cursor-pointer disabled:opacity-50"
      >
        <ArrowUp size={13} />
      </button>
    </main>
  );
};

export default Chat;
