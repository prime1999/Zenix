"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useOnboardingStore } from "@/stores/onboardingStore";

const Questions = () => {
  const question = useOnboardingStore((state) => state.question);

  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = question.split("");

    textRef.current.textContent = "";

    const tween = gsap.to(
      {},
      {
        duration: Math.max(chars.length * 0.03, 0.5),
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

    const cursorTween = gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
    });

    return () => {
      cursorTween.kill();
    };
  }, []);

  return (
    <main className="border-b border-primary-purple font-sans p-2 flex mt-2 w-full min-h-12">
      <h2 className="text-sm leading-relaxed">
        <span ref={textRef} />
        <span ref={cursorRef} className="inline-block ml-1">
          |
        </span>
      </h2>
    </main>
  );
};

export default Questions;
