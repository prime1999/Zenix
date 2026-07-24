import Link from "next/link";
import { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";

import Logo from "@/components/reusables/Logo";

type SearchParams = Promise<{
  error?: string;
}>;

async function ErrorContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  if (params?.error === "You are not an allowed tester") {
    return (
      <>
        <p className="text-center text-sm font-sans text-muted-foreground">
          You are not part of the current Zenix testing group 😞.
        </p>

        <p className="mt-4 text-center text-sm font-sans">
          Zenix is currently in private testing. Want to join the beta testers?
        </p>

        <Link
          href="https://wa.me/2347068280718?text=Hi%20Priime,%20I%20tried%20signing%20up%20for%20Zenix%20but%20my%20email%20is%20not%20part%20of%20the%20current%20testing%20group.%20I%20would%20love%20to%20join%20the%20beta%20testers."
          target="_blank"
          className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary-purple py-2 text-sm font-semibold font-sans transition duration-500 hover:bg-primary-purple/90"
        >
          <FaWhatsapp className="text-lg" />
          Join beta-testers
        </Link>
      </>
    );
  }

  if (params?.error) {
    return (
      <>
        <p className="text-center text-sm font-sans text-muted-foreground">
          We encountered a <span className="font-semibold">{params.error}</span>{" "}
          error while checking on you 😞.
        </p>

        <p className="mt-4 text-center text-sm font-sans">
          But it's all good 😊. What were you trying to do?
        </p>

        <div className="w-full mt-4 flex items-center justify-center gap-4 text-sm">
          <Link
            href="/auth/signup"
            className="rounded-lg bg-dark px-4 py-2 text-background"
          >
            Signing up?
          </Link>

          <Link
            href="/auth/login"
            className="rounded-lg bg-dark px-4 py-2 text-background"
          >
            Logging in?
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="text-center text-sm text-muted-foreground">
        An unspecified error occurred while checking on you 😞.
      </p>

      <p className="mt-4 text-center text-sm font-sans">
        But it's all good 😊. What were you trying to do?
      </p>

      <div className="w-full mt-4 flex items-center justify-center gap-4 text-sm">
        <Link
          href="/auth/signup"
          className="rounded-lg bg-dark px-4 py-2 text-background"
        >
          Signing up?
        </Link>

        <Link
          href="/auth/login"
          className="rounded-lg bg-dark px-4 py-2 text-background"
        >
          Logging in?
        </Link>
      </div>
    </>
  );
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden p-6 md:p-10"
      style={{
        backgroundColor: "#ebe6ed",
        backgroundImage:
          "radial-gradient(circle at 50% 45%, rgba(188, 131, 245, 0.45) 0%, rgba(235, 230, 237, 0) 65%)",
      }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-sans text-2xl font-semibold">Oops!</h1>

          <Logo />

          <Suspense
            fallback={
              <p className="text-center text-sm text-muted-foreground">
                Checking what happened...
              </p>
            }
          >
            <ErrorContent searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
