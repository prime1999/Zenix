import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

import Logo from "@/components/reusables/Logo";

type PageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const ErrorContent = ({ error }: { error?: string }) => {
  return (
    <>
      {error === "You are not an allowed tester" ? (
        <p className="font-sans text-center text-sm text-muted-foreground">
          You are not an allowed tester 😞.
        </p>
      ) : error ? (
        <p className="font-sans text-center text-sm text-muted-foreground">
          Met an <span className="font-semibold">{error}</span> error when
          checking up on you 😞.
        </p>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Met an{" "}
          <span className="font-semibold text-destructive">unspecified</span>{" "}
          error while checking up on you 😞.
        </p>
      )}
    </>
  );
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const error = params?.error;
  const isTesterError = error === "You are not an allowed tester";

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

          <ErrorContent error={error} />
        </div>

        {isTesterError ? (
          <p className="mt-4 text-center text-sm font-sans">
            The app is still in the testing phase. Want to join the beta
            testers?
          </p>
        ) : (
          <p className="mt-4 text-center text-sm font-sans">
            But it's all good 😊. What were you trying to do?
          </p>
        )}

        {isTesterError ? (
          <Link
            href="https://wa.me/2347068280718?text=Hi%20Priime,%20I%20tried%20signing%20up%20for%20Zenix%20but%20my%20email%20is%20not%20part%20of%20the%20current%20testing%20group.%20I%20would%20love%20to%20join%20the%20beta%20testers."
            target="_blank"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary-purple py-2 text-sm font-semibold font-sans transition duration-500 hover:bg-primary-purple/90"
          >
            <FaWhatsapp className="text-lg" />
            Join beta-testers
          </Link>
        ) : (
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
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
        )}
      </div>
    </div>
  );
}
