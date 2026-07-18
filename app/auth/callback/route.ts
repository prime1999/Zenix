import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user:", user);
      if (!user) {
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, onboarding_completed")
        .eq("id", user.id)
        .single();

      console.log("profile:", profile);

      // First login → no profile yet
      if (!profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          onboarding_completed: false,
        });

        return NextResponse.redirect(`${origin}/onboarding`);
      }

      // Existing user but onboarding not completed
      if (!profile.onboarding_completed) {
        return NextResponse.redirect(`${origin}/onboarding`);
      }

      // Existing user with completed onboarding
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
