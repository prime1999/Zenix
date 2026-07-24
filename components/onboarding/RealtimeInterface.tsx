"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useOnboardingStore } from "@/stores/onboardingStore";
import { useCompleteOnboarding } from "@/lib/Queries.tsx/SupabaseQueries";

const RealtimeInterface = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const userInsights = useOnboardingStore((state) => state.userInsights);
  const answers = useOnboardingStore((state) => state.answers);
  const isComplete = useOnboardingStore((state) => state.isComplete);
  const router = useRouter();

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

  const hasStarted = answers.length > 0;

  const hasInsights =
    !!userInsights.name ||
    userInsights.interests.length > 0 ||
    userInsights.motivations.length > 0 ||
    userInsights.values.length > 0 ||
    userInsights.futureVision.length > 0 ||
    userInsights.obstacles.length > 0 ||
    userInsights.strengths.length > 0;

  const completeOnboardingMutation = useCompleteOnboarding();

  // function to complete the onboarding process
  const completeOnboarding = () => {
    completeOnboardingMutation.mutate(
      { userInsights, answers },
      {
        onSuccess: (success) => {
          console.log("Onboarding completed successfully");
          console.log(success);
          router.push("/dashboard");
          // if (success) {
          // }
        },
      },
    );
  };

  return (
    <aside className="flex flex-col w-full md:w-[360px] h-full md:max-h-[500px] rounded-2xl md:border border-input bg-transparent shadow-xs overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border/50 md:bg-background/80 backdrop-blur-xl p-3 md:p-5">
        <div className="flex items-start gap-3">
          <div className="relative h-8 w-8 flex-shrink-0">
            <div
              ref={glowRef}
              className="absolute inset-0 rounded-full bg-primary-purple blur-xl opacity-40"
            />

            <div
              ref={ringRef}
              className="absolute inset-0 rounded-full border-2 border-primary-purple"
            />

            <div
              ref={innerRef}
              className="absolute inset-[6px] rounded-full border border-primary-purple/70"
            />
          </div>

          <div>
            <h3 className="font-medium text-lg md:text-sm">
              What Zenix Is Learning
            </h3>

            <p className="text-xs md:text-muted-foreground mt-1">
              Building your future-self profile in real time.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {userInsights.name && (
          <div>
            <p className="text-xs font-sans">
              Alright {userInsights.name}, let's get started!
            </p>
          </div>
        )}

        {!hasInsights && (
          <div className="flex h-full items-center justify-center text-center">
            <div className="max-w-[240px]">
              <p className="text-sm md:text-muted-foreground">
                {hasStarted
                  ? "Zenix is gathering your profile..."
                  : "Start answering questions..."}
              </p>

              <p className="text-xs md:text-muted-foreground mt-2 leading-relaxed">
                {hasStarted
                  ? "Learning about who you are, what drives you, and who you're becoming."
                  : "Zenix will begin building your profile here."}
              </p>
            </div>
          </div>
        )}

        <InsightSection title="Interests" items={userInsights.interests} />

        <InsightSection title="Motivations" items={userInsights.motivations} />

        <InsightSection title="Values" items={userInsights.values} />

        <InsightSection title="Strengths" items={userInsights.strengths} />

        <InsightSection
          title="Future Vision"
          items={userInsights.futureVision}
        />

        <InsightSection title="Obstacles" items={userInsights.obstacles} />
      </div>
      {isComplete && (
        <button
          type="button"
          disabled={completeOnboardingMutation.isPending}
          onClick={() => completeOnboarding()}
          className="m-4 bg-primary-purple text-white rounded-lg py-2 px-4 text-sm font-medium cursor-pointer duration-500 transition hover:bg-primary-purple/90"
        >
          Meet your future self
        </button>
      )}
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
      <h4 className="text-xs uppercase tracking-wider font-semibold font-sans">
        {title}
      </h4>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="mt-2 rounded-lg border border-input shadow-xs py-1 px-2 text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RealtimeInterface;
