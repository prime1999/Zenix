"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";

import { Textarea } from "../ui/textarea";

import { generateNextQuestion } from "@/lib/api/onboarding.action";

import { Answer, Stage, UserInsights } from "@/lib/types";

import { useOnboardingStore } from "@/stores/onboardingStore";

type Props = {
  stage: Stage;

  followUpCount: number;

  answers: Answer[];

  userInsights: UserInsights;

  onNext: (
    nextQuestion: string,
    answer: string,
    insights?: Partial<UserInsights>,
  ) => void;
};

const Chat = ({
  stage,
  followUpCount,
  answers,
  userInsights,
  onNext,
}: Props) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const question = useOnboardingStore((state) => state.question);
  const isComplete = useOnboardingStore((state) => state.isComplete);

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setLoading(true);

    try {
      const data = await generateNextQuestion({
        question,
        answer,
        answers,
        stage,
        followUpCount,
        userInsights,
      });

      if (!data.nextQuestion) {
        console.log("Missing nextQuestion", data);
        return;
      }

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
        disabled={loading || isComplete}
        className="mt-6 h-24"
      />

      <button
        disabled={loading || answer.trim() === "" || isComplete}
        onClick={handleSubmit}
        className="absolute right-3 bottom-2 bg-primary-purple text-white rounded-full p-2 cursor-pointer disabled:opacity-50"
      >
        <ArrowUp size={13} />
      </button>
    </main>
  );
};

export default Chat;
