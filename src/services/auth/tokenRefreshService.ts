/**
 * Token Refresh Service
 *
 * Refresh is triggered in exactly two situations:
 *  1. REACTIVE  — axiosClient 401 interceptor (token rejected by backend).
 *  2. PROACTIVE — useTokenRefresh hook (token expired or within 5 min of expiry).
 *
 * Both paths call /api/auth/refresh-token which forwards the browser's
 * HttpOnly refresh token cookie to the backend.
 */

import { setAccessToken, clearAllTokens } from "@/lib/tokenManager";

interface RefreshTokenResponse {
  success: boolean;
  token?: string;
  message?: string;
}

// ── JWT helpers ──────────────────────────────────────────────────────────────

const decodeTokenExp = (token: string): number | null => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return (JSON.parse(json) as { exp?: number })?.exp ?? null;
  } catch {
    return null;
  }
};

const NEAR_EXPIRY_SECONDS = 5 * 60; // 5 minutes

/** Returns true when the token's exp timestamp is in the past. */
export const isTokenExpired = (token: string): boolean => {
  const exp = decodeTokenExp(token);
  if (exp === null) return true;
  return exp < Math.floor(Date.now() / 1000);
};

/**
 * Returns true when the token expires within the next 5 minutes
 * but has not yet expired.
 */
export const isTokenNearExpiry = (token: string): boolean => {
  const exp = decodeTokenExp(token);
  if (exp === null) return false;
  const secondsLeft = exp - Math.floor(Date.now() / 1000);
  return secondsLeft > 0 && secondsLeft <= NEAR_EXPIRY_SECONDS;
};

// ── Refresh with deduplication ───────────────────────────────────────────────

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Exchange the HttpOnly refresh token cookie for a new access token.
 * Multiple simultaneous callers share the same in-flight request.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch("/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result: RefreshTokenResponse = await response.json();

      if (!response.ok || !result.success || !result.token) {
        clearAllTokens();
        return null;
      }

      setAccessToken(result.token);
      return result.token;
    } catch {
      clearAllTokens();
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
