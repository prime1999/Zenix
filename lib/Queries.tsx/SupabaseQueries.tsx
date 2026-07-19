// ============================================================
// Supabase Queries
// ============================================================
"use client";

// React-query imports
import { useMutation } from "@tanstack/react-query";
// Supabase imports
import {
  getAuthenticatedUser,
  signIn,
  signInWithGoogle,
  signUp,
} from "@/lib/supabase/action";

// ============================================================
// Function for a user to sign up using email and password
// ============================================================
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

// ============================================================
// Function for a user to log in using email and password
// ============================================================
export const useSignIn = () => {
  return useMutation({
    mutationFn: async (signInInfo: any) => {
      try {
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

// ===============================================================
// Function for a user to sign up or sign in with Google OAuth
// ===============================================================
export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await signInWithGoogle();
        return res;
      } catch (error) {
        console.log("Error signing in with Google:", error);
        return null;
      }
    },
  });
};

// ====================================================
// Function to check authenticated user
// ====================================================
// export const useGetAuthenticatedUser = () => {
//   return useMutation({
//     mutationFn: async () => {
//       try {
//         const res = await getAuthenticatedUser();
//         return res;
//       } catch (error) {
//         console.log("Error checking authenticated user:", error);
//         return null;
//       }
//     },
//   });
// };
