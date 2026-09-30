import { NextResponse } from "next/server";
import { APIKit } from "@/helpers/api-kit";
import { cookies } from "next/headers";
import {
  authErrorResponse,
  buildCookieHeader,
  pipeSetCookies,
} from "../_utils";

/**
 * POST /api/auth/refresh-token
 *
 * WHY we manually forward cookies:
 * axiosClient has withCredentials:true but that flag only works in a browser
 * context. When this route handler calls APIKit it runs on the Node.js
 * server — Axios on Node does NOT automatically attach the browser's
 * cookies. We read every cookie from the incoming request and forward them
 * in the outbound Cookie header ourselves.
 */
export async function POST() {
  try {
    const cookieHeader = buildCookieHeader((await cookies()).getAll());
    const res = await APIKit.auth.refreshToken(cookieHeader);

    // Pipe any rotated refresh token cookie back to the browser
    const response = NextResponse.json(res.data);
    pipeSetCookies(res, response);
    return response;
  } catch (error: unknown) {
    return authErrorResponse(error, "Token refresh failed", 401);
  }
}
