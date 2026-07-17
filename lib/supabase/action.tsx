// supabase imports
import { createClient } from "@/lib/supabase/client";

// init the supabase client
const supabase = createClient();

///////////////////////////////////////////////////
/// Authentication
//////////////////////////////////////////////////
//------------------ Function to handle sign up ------------------//
export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/protected`,
      },
    });
    if (error) {
      console.log("Error signing up:", error);
      return {
        code: 400,
        status: "error",
        message: "Failed to sign up user",
      };
    }
    console.log("Sign up successful:", data);
    // create the user profile
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        onboarding_completed: false,
      });
      if (profileError) {
        console.log("Error creating user profile:", profileError);
        return {
          code: 400,
          status: "error",
          message: "Failed to create user profile",
        };
      }
    }
    return {
      code: 200,
      status: "success",
      message: "User signed up successfully",
    };
  } catch (error: unknown) {
    console.log("Error signing up:", error);
    return {
      code: 400,
      status: "error",
      message: "Failed to sign up user",
    };
  }
};

//------------------ Function to handle sign in ------------------//
export const signIn = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("Error signing in:", error);
      return {
        code: 400,
        status: "error",
        message: "Failed to log user in",
      };
    }
    return {
      code: 200,
      status: "success",
      message: "User logged in successfully",
    };
  } catch (error) {
    console.log("Error signing in:", error);
    return {
      code: 400,
      status: "error",
      message: "Failed to log user in",
    };
  }
};
