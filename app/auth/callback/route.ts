import { NextResponse } from "next/server";

import { createClientOnServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClientOnServer();

  // =====================================
  // Exchange OAuth code for user session
  // =====================================

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    console.error("OAuth Exchange Error:", exchangeError);

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // =====================================
  // Get authenticated user
  // =====================================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/auth/error?error=user_not_found`);
  }

  // =====================================
  // GOOGLE OAUTH TESTER CHECK
  //
  // We cannot check the email BEFORE
  // Google authentication because we
  // don't know which Google account
  // the user will choose.
  //
  // Therefore:
  // 1. Authenticate user
  // 2. Read authenticated email
  // 3. Verify it exists in allowed_emails
  // 4. Immediately sign out if not allowed
  // =====================================

  const { data: allowedEmail, error: allowedEmailError } = await supabase
    .from("testers")
    .select("email")
    .eq("email", user.email?.toLowerCase())
    .maybeSingle();

  if (allowedEmailError) {
    return NextResponse.redirect(
      `${origin}/auth/error?error=allowed_email_check_failed`,
    );
  }

  if (!allowedEmail) {
    await supabase.auth.signOut();

    return NextResponse.redirect(
      `${origin}/auth/error?error=You are not an allowed tester`,
    );
  }

  // =====================================
  // Check if profile already exists
  // =====================================

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, onboarding_completed")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Profile Fetch Error:", profileError);

    return NextResponse.redirect(
      `${origin}/auth/error?error=profile_fetch_failed`,
    );
  }

  // =====================================
  // First Login
  //
  // Create profile and send user
  // directly into onboarding.
  // =====================================

  if (!profile) {
    const { error: createProfileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        onboarding_completed: false,
      });

    if (createProfileError) {
      console.error("Profile Creation Error:", createProfileError);

      return NextResponse.redirect(
        `${origin}/auth/error?error=profile_creation_failed`,
      );
    }

    return NextResponse.redirect(`${origin}/onboarding`);
  }

  // =====================================
  // Existing User
  //
  // If onboarding isn't complete,
  // continue onboarding.
  // =====================================

  if (!profile.onboarding_completed) {
    return NextResponse.redirect(`${origin}/onboarding`);
  }

  // =====================================
  // Fully Onboarded User
  // =====================================

  return NextResponse.redirect(`${origin}/dashboard`);
}
