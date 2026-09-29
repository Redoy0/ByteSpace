"use client";

import { useTokenRefresh } from "@/hooks/useTokenRefresh";

interface TokenRefreshProviderProps {
  children: React.ReactNode;
}

/**
 * Mounts the background token-refresh loop for authenticated layouts.
 * The refresh token is an HttpOnly cookie — no prop needed.
 */
export const TokenRefreshProvider: React.FC<TokenRefreshProviderProps> = ({
  children,
}) => {
  useTokenRefresh();
  return <>{children}</>;
};
