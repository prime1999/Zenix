"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useOnboardingStore } from "@/stores/onboardingStore";

const RealtimeInterface = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const userInsights = useOnboardingStore((state) => state.userInsights);

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
    <aside className="absolute top-7 right-7 w-[320px] border-2 border-input rounded-md bg-transparent p-5">
      <div className="flex flex-col">
        <div className="flex items-start gap-2">
          {" "}
          <div className="relative h-6 w-6">
            <div
              ref={glowRef}
              className="absolute inset-0 rounded-full bg-primary-purple blur-3xl opacity-40"
            />

            <div
              ref={ringRef}
              className="absolute inset-0 rounded-full border-2 border-primary-purple"
            />

            <div
              ref={innerRef}
              className="absolute inset-3 rounded-full border-2 border-primary-purple/70"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-medium font-sans">
              What Zenix is Learning
            </h3>
            <p className="text-xs text-muted-foreground">
              This updates as we talk.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <InsightSection title="Interests" items={userInsights.interests} />

        <InsightSection title="Motivations" items={userInsights.motivations} />

        <InsightSection title="Values" items={userInsights.values} />

        <InsightSection
          title="Future Vision"
          items={userInsights.futureVision}
        />

        <InsightSection title="Obstacles" items={userInsights.obstacles} />
      </div>
    </aside>
  );
};

type InsightSectionProps = {
  title: string;
  items: string[];
};

const InsightSection = ({ title, items }: InsightSectionProps) => {
  if (!items.length) return null;

  return (
    <div>
      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
        {title}
      </h4>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs rounded-full border border-primary-purple/30 px-2 py-1 bg-primary-purple/5"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RealtimeInterface;
