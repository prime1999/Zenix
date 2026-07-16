"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
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

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
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
            Welcome back 👋
            {/* Let's get get to know you 🤝 */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
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
                  type={showPassword ? "text" : "password"}
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
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-dark text-white p-2 font-sans font-semibold hover:bg-dark/90 disabled:cursor-not-allowed disabled:bg-dark/50"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
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
              <hr className="flex-1 border-t border-black/10" />
              <span className="px-3 text-xs tracking-wider text-black/40 font-sans">
                or continue with
              </span>
              <hr className="flex-1 border-t border-black/10" />
            </div>
            <button
              type="button"
              className="flex items-center gap-4 justify-center w-full bg-white rounded-full p-2 font-sans font-semibold cursor-pointer hover:bg-white/90"
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
