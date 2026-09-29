import { NextRequest } from "next/server";
import { APIKit } from "@/helpers/api-kit";
import { authErrorResponse, completeAuthResponse } from "../_utils";

/**
 * POST /api/auth/login
 * Body: { email, password }
 *
 * Why this route exists:
 * Any Set-Cookie header the backend sends in response to a server-side
 * fetch() lands in the Node.js process — the browser never sees it, so the
 * HttpOnly refresh token cookie would never be stored.
 *
 * The browser calls this route directly; the handler forwards the request to
 * the backend via APIKit (axiosClient), then copies every Set-Cookie header
 * back to the browser and sets the (non-HttpOnly) access token cookie so it's
 * readable by client code and proxy.ts.
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const backendRes = await APIKit.auth.login(payload);
    return completeAuthResponse(
      backendRes,
      "Logged in successfully",
      "Login failed"
    );
  } catch (error: unknown) {
    return authErrorResponse(error, "Login failed");
  }
}
