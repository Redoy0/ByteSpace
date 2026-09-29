/**
 * Token Manager
 * Handles access token (cookies) operations.
 * The refresh token is an HttpOnly cookie managed entirely by the backend.
 */

import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { envConfig } from "@/config/envConfig";

const ACCESS_TOKEN_KEY = "accessToken";

/** Store the access token in a client-readable cookie. */
export const setAccessToken = (token: string): void => {
  setCookie(ACCESS_TOKEN_KEY, token, {
    maxAge: 7 * 24 * 60 * 60, // 7 days — matches JWT expiry //for test:60
    path: "/",
    sameSite: "lax",
    secure: !envConfig.isDevlopment,
  });
};

/** Read the access token from cookies (client-side only). */
export const getAccessToken = (): string | undefined => {
  if (typeof window !== "undefined") {
    return getCookie(ACCESS_TOKEN_KEY) as string | undefined;
  }
  return undefined;
};

/** Delete the access token cookie. */
export const removeAccessToken = (): void => {
  deleteCookie(ACCESS_TOKEN_KEY);
};

/**
 * Clear all client-side authentication state.
 * Also attempts to delete the refreshToken cookie — a no-op if it is
 * HttpOnly (the backend clears it via Set-Cookie on /auth/logout).
 */
export const clearAllTokens = (): void => {
  removeAccessToken();
  deleteCookie("refreshToken");
};

/** Returns true when the user has a client-accessible access token. */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};
