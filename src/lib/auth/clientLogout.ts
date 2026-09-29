"use client";

import { clearAllTokens } from "@/lib/tokenManager";
import { logoutAction } from "@/services/auth/authService";
import { AUTH_ROUTES } from "@/constant/routes";

/**
 * Clear client-side access token and call the server action to clear
 * HttpOnly refresh token cookie via the backend.
 */
export const clientLogout = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    clearAllTokens();
    return await logoutAction();
  } catch {
    clearAllTokens();
    return { success: false, message: "Logout failed" };
  }
};

/**
 * Full logout: clear tokens, reset user cache, redirect to login.
 *
 * @param setUser  - from useUser() — clears React Query cache
 * @param redirectUrl - login page to navigate to after logout
 */
export const performCompleteLogout = async (
  // eslint-disable-next-line no-unused-vars
  setUser: (user: null) => void,
  redirectUrl: string = AUTH_ROUTES.login
): Promise<{ success: boolean; message: string }> => {
  try {
    const result = await clientLogout();
    setUser(null);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 100);
    }
    return result;
  } catch {
    return { success: false, message: "Complete logout failed" };
  }
};
