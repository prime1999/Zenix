import { NextResponse } from "next/server";
import { createClientOnServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClientOnServer();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        //TODO: Handle this error better. This should never happen, but if it does, we should log it and redirect to an error page.
        return NextResponse.redirect(
          `${origin}/auth/error?error=User not found`,
        );
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, onboarding_completed")
        .eq("id", user.id)
        .single();

      // First login → no profile yet
      if (profile === null) {
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
