// ============================================================
// Supabase Client
// ============================================================

import { createClient } from "@/lib/supabase/client";
import { createClientOnServer } from "./server";

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
      console.log("Error signing up:", error);
      return {
        code: 400,
        status: "error",
        message: error.message,
        data: null,
      };
    }

    console.log("Sign up successful:", data);

    if (data.user) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          onboarding_completed: false,
        });

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
 */
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Error signing in:", error);
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

/**
 * Get authenticated user safely on Server Components or Server Actions.
 */
export const getAuthenticatedUser = async () => {
  try {
    // 💡 FIX: Create and await the server client inside the function execution
    const supabaseServer = await createClientOnServer();
    const { data, error } = await supabaseServer.auth.getUser();

    if (error || !data?.user) {
      return null;
    }

    return data.user;
  } catch (error) {
    return null;
  }
};
