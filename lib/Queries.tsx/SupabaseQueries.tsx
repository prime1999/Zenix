"use client";

// React-query imports
import { useMutation } from "@tanstack/react-query";
// Supabase imports
import { signIn, signUp } from "@/lib/supabase/action";

////////////////////////////////////////////////////////////////////
/// function for a user to sign up using email and password
///////////////////////////////////////////////////////////////////
export const useSignUp = () => {
  return useMutation({
    mutationFn: async (signUpInfo: any) => {
      try {
        console.log("signUpInfo: ", signUpInfo);
        const { email, password } = signUpInfo;
        const res = await signUp(email, password);
        return res;
      } catch (error) {
        console.log("Error signing up:", error);
        return null;
      }
    },
  });
};

////////////////////////////////////////////////////////////////////
/// function for a user to log in using email and password
///////////////////////////////////////////////////////////////////
export const useSignIn = () => {
  return useMutation({
    mutationFn: async (signInInfo: any) => {
      try {
        console.log("signInInfo: ", signInInfo);
        const { email, password } = signInInfo;
        const res = await signIn(email, password);
        return res;
      } catch (error) {
        console.log("Error signing in:", error);
        return null;
      }
    },
  });
};
