"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import googleIcon from "@/assets/icons/google.png";
import { useSignIn } from "@/lib/Queries.tsx/SupabaseQueries";
import { toast } from "sonner";
import Logo from "./reusables/Logo";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInMutation = useSignIn();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    signInMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("Sign in successful:", data);
          toast.success(data?.message, { position: "top-center" });
          // Update this route to redirect to an authenticated route. The user already has an active session.
          if (data && data.data?.onboarding_completed) {
            router.push("/dashboard");
          } else {
            router.push("/onboarding");
          }
        },
        onError: (error) => {
          console.log("Error signing in:", error);
          toast.error(error.message, { position: "top-center" });
        },
      },
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <Logo />
          <CardDescription className="text-center text-foreground">
            Welcome back 👋
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-foreground p-2 text-sm w-full rounded-md border focus:outline-0"
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
                  className="text-foreground p-2 text-sm w-full rounded-md border focus:outline-0"
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

              <button
                type="submit"
                className="w-full cursor-pointer text-sm rounded-full bg-dark text-primary-foreground p-2 font-sans font-semibold hover:bg-dark/90 disabled:cursor-not-allowed disabled:bg-dark/50"
                disabled={signInMutation.isPending}
              >
                {signInMutation.isPending ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              {" "}
              <Link
                href="/auth/forgot-password"
                className="text-xs underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
              <Link href="/" className="text-xs font-semibold">
                Create Account
              </Link>
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
              disabled={signInMutation.isPending}
              className="flex items-center gap-2 justify-center w-full text-sm rounded-lg border p-2 font-sans font-semibold cursor-pointer duration-500 hover:bg-white/20"
            >
              <Image
                src={googleIcon}
                width={20}
                height={20}
                alt="Google Icon"
              />
              Google
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
