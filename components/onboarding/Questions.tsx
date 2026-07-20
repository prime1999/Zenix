"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type QuestionsProps = {
  question: string;
};

const Questions = ({ question }: QuestionsProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    console.log("question", question);
    const chars = question.split("");

    textRef.current.textContent = "";

    const tween = gsap.to(
      {},
      {
        duration: chars.length * 0.03,
        ease: "none",
        onUpdate() {
          const progress = Math.floor(this.progress() * chars.length);

          if (textRef.current) {
            textRef.current.textContent = chars.slice(0, progress).join("");
          }
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, [question]);

  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <main className="border-b border-primary-purple font-sans p-2 flex min-h-[20px] mt-2 w-[400px]">
      <h2 className="text-sm">
        <span ref={textRef} />
        <span ref={cursorRef} className="inline-block ml-1">
          |
        </span>
      </h2>
    </main>
  );
};

export default Questions;
