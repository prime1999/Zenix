// ============================================================
// Supabase Client
// ============================================================

// Import the browser-side Supabase client factory.
import { createClient } from "@/lib/supabase/client";

// Create a reusable Supabase client instance.
const supabase = createClient();

// ============================================================
// Authentication Services
// ============================================================

/**
 * Create a new user account using email and password.
 *
 * Flow:
 * 1. Create auth user in Supabase Auth.
 * 2. Create matching profile record.
 * 3. Mark onboarding as incomplete.
 */
export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Used only when email verification is enabled.
        emailRedirectTo: `${window.location.origin}/protected`,
      },
    });

    // Stop execution if account creation fails.
    if (error) {
      console.log("Error signing up:", error);

      return {
        code: 400,
        status: "error",
        message: error.message,
        data: null,
      };
    }

    console.log("Sign up successful:", data);

    // Create a profile row linked to the auth user.
    if (data.user) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert({
          // Use the auth user id as the profile id.
          id: data.user.id,

          // User has not completed onboarding yet.
          onboarding_completed: false,
        });

      // Prevent users from continuing without a profile.
      if (profileError) {
        console.log("Error creating user profile:", profileError);

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

    // Safety fallback if user creation succeeds but user object is missing.
    return {
      code: 400,
      status: "error",
      message: "User was created but profile initialization failed",
      data: null,
    };
  } catch (error) {
    console.log("Error signing up:", error);

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
 *
 * Flow:
 * 1. Authenticate credentials.
 * 2. Fetch profile information.
 * 3. Return onboarding status for routing decisions.
 */
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Stop execution if authentication fails.
    if (error) {
      console.log("Error signing in:", error);

      return {
        code: 400,
        status: "error",
        message: error.message,
        data: null,
      };
    }

    // Fetch only the fields needed to determine
    // whether the user should go to onboarding or dashboard.
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, onboarding_completed")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      console.log("Error fetching user profile:", profileError);

      return {
        code: 400,
        status: "error",
        message: "Failed to fetch user profile",
        data: null,
      };
    }

    console.log("Sign in successful:", data);

    return {
      code: 200,
      status: "success",
      message: "User logged in successfully",
      data: profileData,
    };
  } catch (error) {
    console.log("Error signing in:", error);

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
 *
 * Flow:
 * User
 *   → Google
 *   → Supabase
 *   → /auth/callback
 *
 * The authenticated user is not available here.
 * User data becomes available inside the callback route
 * after exchanging the auth code for a session.
 */
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Supabase redirects here after Google authentication.
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.log("Error using Google:", error);

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
    console.log("Error using Google:", error);

    return {
      code: 400,
      status: "error",
      message: "Failed to use Google",
      data: null,
    };
  }
};
