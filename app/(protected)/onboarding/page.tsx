import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/supabase/action";
import Logo from "@/components/reusables/Logo";
import Chat from "@/components/onboarding/chat";
import Questions from "@/components/onboarding/Questions";
import OnboardingFlow from "@/components/onboarding/onboardFlow";

const page = async () => {
  const user = await getAuthenticatedUser();
  console.log(user);
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <main
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative overflow-hidden"
      style={{
        backgroundColor: "#ebe6ed",
        backgroundImage:
          "radial-gradient(circle at 50% 45%, rgba(188, 131, 245, 0.45) 0%, rgba(235, 230, 237, 0) 65%)",
      }}
    >
      <div>
        {" "}
        <Logo />
        <div className="flex flex-col gap-1 items-center justify-center mt-2 text-sm font-sans">
          {" "}
          <h6 className="font-semibold">
            Hi there 👋, ready to meet the future you?
          </h6>
          <p>
            In the next few minutes, we will help create a future version of
            you.
          </p>
        </div>
        <OnboardingFlow />
      </div>
    </main>
  );
};

export default page;
