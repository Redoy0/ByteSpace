import { NextResponse } from "next/server";
import { APIKit } from "@/helpers/api-kit";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE } from "@/constant/routes";
import {
  authErrorResponse,
  buildCookieHeader,
  pipeSetCookies,
} from "../_utils";

/**
 * POST /api/auth/logout
 *
 * Forwards all browser cookies to the backend so it can identify and
 * clear the HttpOnly refresh token cookie server-side.
 */
export async function POST() {
  try {
    const cookieHeader = buildCookieHeader((await cookies()).getAll());
    const res = await APIKit.auth.logout(cookieHeader);

    const response = NextResponse.json(
      res.data ?? { success: true, message: "Logged out successfully" }
    );
    response.cookies.delete(ACCESS_TOKEN_COOKIE);
    response.cookies.delete("refreshToken");
    pipeSetCookies(res, response);

    return response;
  } catch (error: unknown) {
    return authErrorResponse(error, "Logout failed");
  }
}
