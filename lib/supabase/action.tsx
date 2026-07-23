// ============================================================
// Supabase Client
// ============================================================

import { createClient } from "@/lib/supabase/client";
import { createClientOnServer } from "./server";
import { Answer, UserInsights } from "../types";

// Create a reusable browser client instance.
const supabase = createClient();

// ============================================================
// Authentication Services
// ============================================================

/**
 * Create a new user account using email and password.
 */
export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Updated to your new route name (e.g., /dashboard or /onboarding)
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      //console.log("Error signing up:", error);
      return {
        code: 400,
        status: "error",
        message: error.message,
        data: null,
      };
    }

    //console.log("Sign up successful:", data);

    if (data.user) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          onboarding_completed: false,
        });

      if (profileError) {
        // console.log("Error creating user profile:", profileError);
        return {
          code: 400,
          status: "error",
          message: "Failed to create user profile",
          data: null,
        };
      }

      return {
        code: 200,
        status: "success",
        message: "User signed up successfully",
        data: profileData,
      };
    }

    return {
      code: 400,
      status: "error",
      message: "User was created but profile initialization failed",
      data: null,
    };
  } catch (error) {
    // console.log("Error signing up:", error);
    return {
      code: 400,
      status: "error",
      message: "Failed to sign up user",
      data: null,
    };
  }
};

/**
 * Sign in an existing user with email and password.
 */
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      //console.log("Error signing in:", error);
      return {
        code: 400,
        status: "error",
        message: error.message,
        data: null,
      };
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, onboarding_completed")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      //console.log("Error fetching user profile:", profileError);
      return {
        code: 400,
        status: "error",
        message: "Failed to fetch user profile",
        data: null,
      };
    }

    //console.log("Sign in successful:", data);
    return {
      code: 200,
      status: "success",
      message: "User logged in successfully",
      data: profileData,
    };
  } catch (error) {
    //console.log("Error signing in:", error);
    return {
      code: 400,
      status: "error",
      message: "Failed to log user in",
      data: null,
    };
  }
};

/**
 * Start the Google OAuth authentication flow.
 */
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      //console.log("Error using Google:", error);
      return {
        code: 400,
        status: "error",
        message: error.message,
        data: null,
      };
    }

    return {
      code: 200,
      status: "success",
      message: "Redirecting to Google",
      data,
    };
  } catch (error) {
    //console.log("Error using Google:", error);
    return {
      code: 400,
      status: "error",
      message: "Failed to use Google",
      data: null,
    };
  }
};

/**
 * Get authenticated user safely on Server Components or Server Actions.
 */
export const getAuthenticatedUser = async () => {
  try {
    const supabase = await createClientOnServer();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      //console.error("Profile Error:", profileError);
      return null;
    }

    return {
      user,
      profile: profile,
    };
  } catch (error) {
    //console.error("Auth Error:", error);

    return null;
  }
};

// ============================================================
// Onboarding Services
// ============================================================

/**
 * complete the onboarding process
 */
type CompleteOnboardingParams = {
  userInsights: UserInsights;
  answers: Answer[];
};

export async function completeOnboarding({
  userInsights,
  answers,
}: CompleteOnboardingParams) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await supabase.from("onboarding_profiles").insert({
    user_id: user.id,
    name: userInsights.name,
    interests: userInsights.interests,
    motivations: userInsights.motivations,
    values: userInsights.values,
    future_vision: userInsights.futureVision,
    obstacles: userInsights.obstacles,
    strengths: userInsights.strengths,
  });

  await supabase.from("onboarding_answers").insert(
    answers.map((answer) => ({
      user_id: user.id,
      stage: answer.stage,
      question: answer.question,
      answer: answer.answer,
    })),
  );

  await supabase
    .from("profiles")
    .update({
      onboarding_completed: true,
      user_name: userInsights.name,
    })
    .eq("id", user.id);
}
