"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EyeOff, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import googleIcon from "@/assets/icons/google.png";

const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-4xl tracking-widest font-viga bg-gradient-to-r from-dark to-primary-cyan bg-clip-text text-transparent">
            ZENIX
          </CardTitle>
          <CardDescription className="text-center text-black/70">
            Let's get get to know you 🤝
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-3">
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-black p-2 text-sm w-full rounded-md border focus:outline-0"
                />
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "password" : "text"}
                  required
                  value={password}
                  placeholder="your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-black p-2 text-sm w-full rounded-md border focus:outline-0"
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
                <input
                  id="password"
                  type={showRepeatPassword ? "password" : "text"}
                  required
                  value={password}
                  placeholder="your password"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="text-black p-2 text-sm w-full rounded-md border focus:outline-0"
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
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-dark text-white p-2 font-sans font-semibold hover:bg-dark/90 disabled:cursor-not-allowed disabled:bg-dark/50"
                disabled={isLoading}
              >
                {isLoading ? "Creating an account..." : "Sign up"}
              </button>
            </div>

            <div className="flex items-center my-4 w-full">
              <hr className="flex-1 border-t border-black/10" />
              <span className="px-3 text-xs tracking-wider text-black/40 font-sans">
                or continue with
              </span>
              <hr className="flex-1 border-t border-black/10" />
            </div>
            <button
              type="button"
              className="flex items-center gap-4 justify-center w-full rounded-lg bg-white/60 border p-2 font-sans font-semibold cursor-pointer hover:bg-white/20"
            >
              <Image
                src={googleIcon}
                width={20}
                height={20}
                alt="Google Icon"
              />
              Google
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
