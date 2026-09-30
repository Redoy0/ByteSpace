"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getAccessToken, clearAllTokens } from "@/lib/tokenManager";
import {
  refreshAccessToken,
  isTokenExpired,
  isTokenNearExpiry,
} from "@/services/auth/tokenRefreshService";
import { AUTH_ROUTES } from "@/constant/routes";

/**
 * Proactive background token refresh hook.
 *
 * Rules:
 *  - Only runs when the user has an access token (is authenticated).
 *  - Only calls the refresh API when the token is actually expired or
 *    within the last 10 seconds before expiry (testing; 5 min in prod).
 *  - Does NOT refresh on every mount or when the token is still healthy.
 *  - After a successful refresh, invalidates the React Query "currentUser"
 *    cache so UserProvider re-fetches with the new token.
 */
export const useTokenRefresh = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRefreshingRef = useRef(false);

  const handleTokenRefresh = useCallback(async () => {
    if (isRefreshingRef.current) return;

    const accessToken = getAccessToken();

    // No token → user is not logged in, nothing to do
    if (!accessToken) return;

    // Token is still healthy → skip
    if (!isTokenExpired(accessToken) && !isTokenNearExpiry(accessToken)) return;

    isRefreshingRef.current = true;

    try {
      const newToken = await refreshAccessToken();

      if (newToken) {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      } else {
        clearAllTokens();
        queryClient.setQueryData(["currentUser"], null);

        router.push(AUTH_ROUTES.login);
      }
    } catch {
      // silent — will retry on next interval
    } finally {
      isRefreshingRef.current = false;
    }
  }, [router, queryClient]);

  useEffect(() => {
    // Check immediately on mount — guards will skip if token is healthy
    handleTokenRefresh();

    // Re-check every 4 minutes //for test: 30*1000
    const CHECK_INTERVAL = 4 * 60 * 1000;
    intervalRef.current = setInterval(handleTokenRefresh, CHECK_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [handleTokenRefresh]);

  return { refreshToken: handleTokenRefresh };
};
