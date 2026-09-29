"use client";

import type { LoginPayload, RegisterPayload } from "@/helpers/api-kit/auth";
import type { ApiResponse } from "@/types/user";

const postAuth = async <T = unknown>(
  url: string,
  payload: unknown,
  fallbackError: string,
  fallbackSuccess: string
): Promise<ApiResponse<T>> => {
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || fallbackError,
      };
    }

    return {
      success: true,
      message: result.message || fallbackSuccess,
      data: result.data,
    };
  } catch {
    return { success: false, message: fallbackError };
  }
};

export const loginRequest = <T = unknown>(payload: LoginPayload) =>
  postAuth<T>(
    "/api/auth/login",
    payload,
    "Login failed",
    "Logged in successfully"
  );

export const registerRequest = <T = unknown>(payload: RegisterPayload) =>
  postAuth<T>(
    "/api/auth/register",
    payload,
    "Registration failed",
    "Account created successfully"
  );
