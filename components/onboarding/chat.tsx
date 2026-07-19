"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Textarea } from "../ui/textarea";

type Props = {
  question: string;
  onNext: (nextQuestion: string, answer: string) => void;
};

const Chat = ({ question, onNext }: Props) => {
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
        }),
      });

      const data = await res.json();

      onNext(data.nextQuestion, answer);

      setAnswer("");
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
        disabled={loading}
        onClick={handleSubmit}
        className="absolute right-3 bottom-2 bg-primary-purple text-white rounded-full p-2"
      >
        <ArrowUp size={13} />
      </button>
    </main>
  );
};

export default Chat;
