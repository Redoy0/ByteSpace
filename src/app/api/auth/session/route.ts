import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decodeJWT } from "@/utils/decodeJWT";
import { ACCESS_TOKEN_COOKIE } from "@/constant/routes";

export async function GET() {
  try {
    const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = decodeJWT(token);

    return NextResponse.json({
      authenticated: true,
      user: decoded,
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
