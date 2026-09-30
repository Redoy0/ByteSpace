import { envConfig } from "@/config/envConfig";
import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_MAX_AGE } from "@/constant/routes";
import type { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

/** Read every incoming cookie into a single Cookie header for the backend. */
export const buildCookieHeader = (
  all: Array<{ name: string; value: string }>
) => all.map((c) => `${c.name}=${c.value}`).join("; ");

/** Set the client-readable access token cookie on a response. */
export const setAccessTokenCookie = (res: NextResponse, token: string) => {
  res.cookies.set(ACCESS_TOKEN_COOKIE, token, {
    httpOnly: false,
    maxAge: ACCESS_TOKEN_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: !envConfig.isDevlopment,
  });
};

/**
 * Pipe every Set-Cookie header from the backend back to the browser
 * (the backend sets / rotates the HttpOnly refresh token cookie here).
 */
export const pipeSetCookies = (from: AxiosResponse, to: NextResponse) => {
  const raw = from.headers["set-cookie"];
  if (!raw) return;
  (Array.isArray(raw) ? raw : [raw]).forEach((c) =>
    to.headers.append("Set-Cookie", c)
  );
};

export const authErrorResponse = (
  error: unknown,
  fallback: string,
  fallbackStatus = 500
) => {
  const err = error as {
    message?: string;
    response?: { status?: number; data?: { message?: string } };
  };
  return NextResponse.json(
    {
      success: false,
      message: err?.response?.data?.message || err?.message || fallback,
    },
    { status: err?.response?.status ?? fallbackStatus }
  );
};

/**
 * Shared handler for login / register: forwards the backend response,
 * stores the access token cookie, and pipes the refresh token cookie.
 */
export const completeAuthResponse = (
  backendRes: AxiosResponse,
  successMessage: string,
  failureMessage: string
) => {
  const data = backendRes.data;

  if (!data?.success) {
    return NextResponse.json(
      { success: false, message: data?.message || failureMessage },
      { status: 400 }
    );
  }

  const response = NextResponse.json({
    success: true,
    message: data.message || successMessage,
    data: data.user,
  });

  if (data.token) setAccessTokenCookie(response, data.token);
  pipeSetCookies(backendRes, response);

  return response;
};
