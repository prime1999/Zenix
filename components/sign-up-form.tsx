"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EyeOff, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import googleIcon from "@/assets/icons/google.png";
import {
  useSignUp,
  useSignInWithGoogle,
} from "@/lib/Queries.tsx/SupabaseQueries";
import { TypingAnimation } from "./animations/TypingAnimation";
import Spinner from "./Loaders/Spinner";
import Logo from "./reusables/Logo";

const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const signUpMutation = useSignUp();
  const signInWithGoogleMutation = useSignInWithGoogle();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      toast.error("Passwords do not match", { position: "top-center" });
      return;
    }

    signUpMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("Sign up successful:", data);
          toast.success(data?.message, { position: "top-center" });
          router.push("/onboarding");
        },
        onError: (error) => {
          console.log("Error signing up:", error);
          toast.error(error.message, { position: "top-center" });
        },
      },
    );
  };

  // sign up with google auth
  const useGoogleAuth = () => {
    signInWithGoogleMutation.mutate(undefined);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <Logo />
          <TypingAnimation />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-3">
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 text-sm w-full rounded-md border focus:outline-0"
                />
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  placeholder="your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 text-sm w-full rounded-md border focus:outline-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="relative">
                <Input
                  id="repeat-password"
                  type={showRepeatPassword ? "text" : "password"}
                  required
                  value={repeatPassword}
                  placeholder="confirm your password"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="p-2 text-sm w-full rounded-md border focus:outline-0"
                />
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
                  aria-label={
                    showRepeatPassword ? "Hide password" : "Show password"
                  }
                >
                  {showRepeatPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer text-sm rounded-full bg-dark text-primary-foreground p-2 font-sans font-semibold hover:bg-dark/90 disabled:cursor-not-allowed disabled:bg-dark/50"
                disabled={signUpMutation.isPending}
              >
                {signUpMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner /> <p>Creating an account...</p>
                  </span>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>

            <div className="flex items-center my-4 w-full">
              <hr className="flex-1 border-t border-border" />
              <span className="px-3 text-xs tracking-wider text-muted-foreground font-sans">
                or continue with
              </span>
              <hr className="flex-1 border-t border-border" />
            </div>
            <button
              type="button"
              disabled={
                signUpMutation.isPending || signInWithGoogleMutation.isPending
              }
              onClick={() => useGoogleAuth()}
              className="flex items-center gap-2 justify-center w-full text-sm rounded-lg border p-2 font-sans font-semibold cursor-pointer duration-500 hover:bg-white/20"
            >
              {signInWithGoogleMutation.isPending ? (
                <span className="flex items-center gap-2 justify-center">
                  <Spinner />
                  <p>Connecting...</p>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {" "}
                  <Image
                    src={googleIcon}
                    width={20}
                    height={20}
                    alt="Google Icon"
                  />
                  Google
                </span>
              )}
            </button>
            <div className="mt-2 text-center text-xs">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
