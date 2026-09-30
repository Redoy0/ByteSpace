"use server";

import { envConfig } from "@/config/envConfig";
import { ACCESS_TOKEN_COOKIE } from "@/constant/routes";
import type { ApiResponse } from "@/types/user";
import { cookies } from "next/headers";

export const getAccessToken = async () => {
  return (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
};

export const logoutAction = async (): Promise<ApiResponse> => {
  try {
    // Forward all cookies to the backend so it can clear the HttpOnly
    // refresh token cookie. Node.js Axios does not attach cookies
    // automatically — we must build the Cookie header manually.
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const { APIKit } = await import("@/helpers/api-kit");
    await APIKit.auth.logout(cookieHeader).catch(() => {
      // Backend unreachable — local cleanup still runs
    });

    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    cookieStore.delete("refreshToken"); // clears it if backend set it as non-HttpOnly

    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Logout failed",
    };
  }
};

/**
 * Fetch the full profile of the signed-in user.
 * TODO: confirm `/auth/me` and its response shape with the backend.
 */
export const getCurrentUser = async (noCache = false): Promise<ApiResponse> => {
  try {
    const token = await getAccessToken();

    if (!token || token === "undefined" || token === "null") {
      return { success: false, message: "No valid access token found" };
    }

    const res = await fetch(`${envConfig.backendBaseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      ...(noCache ? { cache: "no-store" } : { next: { revalidate: 300 } }),
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message || `Failed to fetch user (Status: ${res.status})`,
      };
    }

    return {
      success: true,
      message: result.message ?? "OK",
      data: result.data?.user ?? result.data,
    };
  } catch (error) {
    const err = error as { code?: string; message?: string };
    return {
      success: false,
      message:
        err.code === "ECONNREFUSED"
          ? "Backend server is unreachable. Please check if the backend is running."
          : err.message || "An unexpected error occurred",
    };
  }
};
