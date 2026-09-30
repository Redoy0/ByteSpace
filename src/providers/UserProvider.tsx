"use client";

import { getCurrentUser } from "@/services/auth/authService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isUserRole, type User } from "@/types/user";
import { ROLE_AREA_PREFIX } from "@/constant/routes";

/**
 * Safely narrows an unknown API response to User | null.
 * Use this at every call site instead of casting:
 *   setUser(parseUser(res.data))
 */
export function parseUser(data: unknown): User | null {
  if (data !== null && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const id = (obj._id ?? obj.id) as string | undefined;
    const email = obj.email as string | undefined;
    const role = obj.role;
    if (id && email && isUserRole(role)) {
      return { ...obj, _id: id } as User;
    }
  }
  return null;
}

interface UserContextType {
  user: User | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const AUTH_CHANNEL = "auth_sync";
// Unique id for this tab so we can ignore our own BroadcastChannel messages
const TAB_ID =
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? (crypto as Crypto & { randomUUID: () => string }).randomUUID()
    : Math.random().toString(36).slice(2);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  // Inside a protected role area always fetch a fresh profile
  const bypassCache = Object.values(ROLE_AREA_PREFIX).some((prefix) =>
    pathname?.startsWith(prefix)
  );

  const { data: userData, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      // If the access token is expired, try to refresh it silently before
      // calling getCurrentUser — otherwise getCurrentUser returns
      // { success: false, message: "No valid access token found" } immediately
      // and the user gets logged out even though their refresh token is valid.
      const { getAccessToken } = await import("@/lib/tokenManager");
      const { isTokenExpired, refreshAccessToken } =
        await import("@/services/auth/tokenRefreshService");

      const currentToken = getAccessToken();

      if (currentToken && isTokenExpired(currentToken)) {
        const newToken = await refreshAccessToken();
        if (!newToken) return null;
        // fall through to getCurrentUser with fresh cookie
      }

      const res = await getCurrentUser(bypassCache);
      return res.success ? parseUser(res.data) : null;
    },
    enabled: true,
    refetchOnWindowFocus: false,
    // Refetch on every mount so the navbar always has the full user profile
    // (name, email). The server pre-seeds the cache from the JWT, but JWTs
    // only carry _id / role / exp — not name or email fields. With a non-zero
    // staleTime the cached JWT data would be treated as fresh, so the query
    // never fetches /auth/me and the navbar shows an empty display name.
    staleTime: 0,
    retry: 1,
  });

  // Listen for auth events broadcast from other tabs
  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window))
      return;

    const channel = new BroadcastChannel(AUTH_CHANNEL);

    channel.onmessage = (event) => {
      const payload = event.data;
      if (!payload) return;

      const { type, tabId } =
        typeof payload === "object" && payload !== null
          ? (payload as { type: string; tabId: string })
          : { type: payload as string, tabId: undefined };

      if (tabId === TAB_ID) return;

      if (type === "logout") {
        queryClient.setQueryData(["currentUser"], null);
        router.push("/");
      } else if (type === "login") {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }
    };

    return () => channel.close();
  }, [router, queryClient]);

  const setUser = (user: User | null) => {
    // Seed the cache with the provided user immediately so UI updates
    // without waiting for a network round-trip.
    queryClient.setQueryData(["currentUser"], user);

    if (user === null) {
      // Logout: remove all cached data for this query.
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    } else {
      // Login / profile update: the login response may lack fields that
      // getCurrentUser returns (e.g. computed profile fields). Trigger a
      // background refetch so the full user object lands in the cache
      // shortly. We delay slightly to let the browser persist the auth
      // cookie from the login response before the refetch fires.
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }, 500);
    }

    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const channel = new BroadcastChannel(AUTH_CHANNEL);
      channel.postMessage({
        type: user === null ? "logout" : "login",
        tabId: TAB_ID,
      });
      channel.close();
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: userData || null,
        setUser,
        isLoading,
        isAuthenticated: !!userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
