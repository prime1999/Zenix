import Link from "next/link";
import { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Logo from "@/components/reusables/Logo";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      {params?.error === "You are not an allowed tester" ? (
        <p className="font-sans text-center text-sm text-muted-foreground">
          You are not an allowed tester 😞.
        </p>
      ) : params?.error ? (
        <p className="font-sans text-center text-sm text-muted-foreground">
          met an <span className="font-semibold">{params.error}</span> error
          when checking up on you 😞.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          met an{" "}
          <span className="font-semibold text-destructive">unspecified</span>{" "}
          error occurred when check up on you 😞.
        </p>
      )}
    </>
  );
}

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) => {
  const params = await searchParams;
  return (
    <div
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative overflow-hidden"
      style={{
        backgroundColor: "#ebe6ed",
        backgroundImage:
          "radial-gradient(circle at 50% 45%, rgba(188, 131, 245, 0.45) 0%, rgba(235, 230, 237, 0) 65%)",
      }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-semibold font-sans">Oops!</h1> <Logo />
          <div>
            <Suspense>
              <ErrorContent searchParams={searchParams} />
            </Suspense>
          </div>
        </div>

        {params?.error === "You are not an allowed tester" ? (
          <p className="mt-4 text-center text-sm font-sans">
            The app is still in the testing phase. Wanna join the beta-testers?
          </p>
        ) : (
          <p className="mt-4 text-center text-sm font-sans">
            But it's all good 😊, what were you trying to do
          </p>
        )}
        {params?.error === "You are not an allowed tester" ? (
          <Link
            href="https://wa.me/2347068280718?text=Hi%20Priime,%20I%20tried%20signing%20up%20for%20Zenix%20but%20my%20email%20is%20not%20part%20of%20the%20current%20testing%20group.%20I%20would%20love%20to%20join%20the%20beta%20testers."
            target="_blank"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary-purple mt-4 py-2 text-sm font-sans font-semibold cursor-pointer duration-500 transition hover:bg-primary-purple/90"
          >
            <FaWhatsapp className="text-lg" />
            Join beta-testers
          </Link>
        ) : (
          <div className="flex items-center justify-center gap-4 text-background mt-4 text-sm font-sans">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 bg-dark cursor-hover"
            >
              Signing up?
            </Link>
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 bg-dark cursor-hover"
            >
              Logging in?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
