import { NextRequest } from "next/server";
import { APIKit } from "@/helpers/api-kit";
import { authErrorResponse, completeAuthResponse } from "../_utils";

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 *
 * Same cookie piping as /api/auth/login.
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const backendRes = await APIKit.auth.register(payload);
    return completeAuthResponse(
      backendRes,
      "Account created successfully",
      "Registration failed"
    );
  } catch (error: unknown) {
    return authErrorResponse(error, "Registration failed");
  }
}
