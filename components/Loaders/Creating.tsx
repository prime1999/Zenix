"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Creating = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ringRef.current || !innerRef.current || !glowRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ringRef.current, {
        rotation: 360,
        repeat: -1,
        duration: 8,
        ease: "none",
      });

      gsap.to(innerRef.current, {
        scale: 1.08,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });

      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <div className="relative h-12 w-12 flex-shrink-0 p-4">
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-full bg-primary-purple blur-xl opacity-40"
      />

      <div
        ref={ringRef}
        className="absolute inset-0 rounded-full border-3 border-primary-purple"
      />

      <div
        ref={innerRef}
        className="absolute inset-[6px] rounded-full border-2 border-primary-purple/70"
      />
    </div>
  );
};

export default Creating;
