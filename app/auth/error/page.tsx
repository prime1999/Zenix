import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/components/reusables/Logo";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      {params?.error ? (
        <p className="font-sans text-center text-sm text-muted-foreground">
          met an <span className="font-semibold">{params.error}</span> error
          occurred when check up on you 😞
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

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
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
          <h1 className="text-sm font-sans"></h1>
          <div>
            <Suspense>
              <ErrorContent searchParams={searchParams} />
            </Suspense>
          </div>
        </div>

        <p className="mt-4 text-center text-sm font-sans">
          But it's all good 😊, what were you trying to do?
        </p>
        <div className="flex items-center justify-center gap-4 text-background mt-4 text-sm font-sans">
          <Link href="/" className="rounded-lg px-4 py-2 bg-dark cursor-hover">
            Signing up?
          </Link>
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 bg-dark cursor-hover"
          >
            Logging in?
          </Link>
        </div>
      </div>
    </div>
  );
}
