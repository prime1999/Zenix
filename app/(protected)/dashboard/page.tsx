import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/supabase/action";
import { FaWhatsapp } from "react-icons/fa";
import Logo from "@/components/reusables/Logo";
import Creating from "@/components/Loaders/Creating";

const page = async () => {
  const user = await getAuthenticatedUser();

  if (!user || !user.user) {
    redirect("/auth/login");
  }

  if (!user.profile.onboarding_completed) {
    redirect("/onboarding");
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
      <div className="w-full mx-auto md:8/12 lg:w-5/12 flex flex-col items-center justify-center gap-4">
        <Creating />
        <Logo />
        <div className="mx-auto flex flex-col gap-1 items-center justify-center text-center">
          <h6 className="font-sans font-semibold">
            Nice meeting you {user?.profile?.user_name} 😊
          </h6>
          <p className="text-xs text-dark/50">
            Zenix now has a clearer understanding of who you are and who you're
            working toward becoming. Your Future Self is being prepared.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center mt-4">
          <Link
            href="https://wa.me/2347068280718?text=Hi%20Priime,%20I%20just%20completed%20the%20Zenix%20onboarding%20and%20here%20is%20my%20feedback."
            target="_blank"
            className="w-72 text-sm font-semibold p-2 flex gap-2 justify-center items-center rounded-md border border-input bg-transparent shadow-xs cursor-pointer duration-500 transition hover:bg-white/20"
          >
            <FaWhatsapp className="text-green-500 text-xl" />
            Share Feedback
          </Link>
          <p className="font-sans italic text-sm">
            The future you're aiming for starts with the actions you take today.
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
