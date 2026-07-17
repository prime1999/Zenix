"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

// Register the TextPlugin so GSAP can handle manipulating strings
gsap.registerPlugin(TextPlugin);

interface TypingAnimationProps {
  phrases?: string[];
  prefix?: string;
}

export function TypingAnimation({
  phrases = [
    "Chat with your future self.",
    "Learn from who you'll become.",
    "Receive guidance tailored to you.",
    "Follow the path to your future.",
  ],
}: TypingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      // Create a master timeline that loops infinitely (-1)
      const masterTl = gsap.timeline({ repeat: -1 });

      phrases.forEach((phrase) => {
        const typeDuration = phrase.length * 0.06; // Adjust timing based on length (feels more realistic)
        const deleteDuration = phrase.length * 0.03;

        // Sequence: Type in -> Pause -> Clear back to empty -> Pause
        masterTl
          .to(textRef.current, {
            duration: typeDuration,
            text: { value: phrase },
            ease: "none",
          })
          .to({}, { duration: 1.8 }) // How long the full phrase sits on screen
          .to(textRef.current, {
            duration: deleteDuration,
            text: { value: "" },
            ease: "none",
          })
          .to({}, { duration: 0.4 }); // Short pause after erasing before the next sentence starts
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="text-center font-sans text-xs text-primary-dark"
    >
      <span className="select-none ml-2" ref={textRef}></span>
      <span className="w-[3px] h-[1.2em] bg-sky-400 ml-1 animate-pulse shrink-0" />
    </div>
  );
}
