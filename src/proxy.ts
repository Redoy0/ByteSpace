import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { envConfig } from "./config/envConfig";
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  AUTH_ROUTES,
  ROLE_AREA_PREFIX,
  ROLE_HOME,
} from "./constant/routes";
import { isUserRole, USER_ROLES, type UserRole } from "./types/user";
import { decodeJWT } from "./utils/decodeJWT";

/**
 * Attempt to silently refresh the access token by calling the internal
 * Next.js refresh-token API route.
 *
 * We pass the full Cookie header from the incoming request so the route
 * handler can forward the HttpOnly refresh token cookie to the backend.
 *
 * Returns the new access token string on success, or null on failure.
 */
async function tryRefreshToken(request: NextRequest): Promise<string | null> {
  try {
    const res = await fetch(new URL("/api/auth/refresh-token", request.url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward ALL cookies so the route handler can pass the HttpOnly
        // refresh token cookie through to the backend
        Cookie: request.headers.get("cookie") || "",
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.success && data?.token ? data.token : null;
  } catch {
    return null;
  }
}

/** Persist a freshly refreshed access token on the outgoing response. */
function withAccessToken(response: NextResponse, token: string): NextResponse {
  response.cookies.set(ACCESS_TOKEN_COOKIE, token, {
    httpOnly: false,
    maxAge: ACCESS_TOKEN_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: !envConfig.isDevlopment,
  });
  return response;
}

const getRoleFromToken = (
  token: string | null | undefined
): UserRole | null => {
  if (!token) return null;
  const role = decodeJWT(token)?.role;
  return isUserRole(role) ? role : null;
};

const matchesPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. Resolve the current session from the access token cookie ─────────
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const decoded = accessToken ? decodeJWT(accessToken) : null;
  const tokenExpired = !!(
    decoded?.exp && decoded.exp < Math.floor(Date.now() / 1000)
  );

  // Treat an expired token as unauthenticated until a refresh succeeds
  let role: UserRole | null =
    decoded && !tokenExpired && isUserRole(decoded.role) ? decoded.role : null;
  let refreshedToken: string | null = null;

  const refreshIfExpired = async () => {
    if (!tokenExpired || refreshedToken) return;
    refreshedToken = await tryRefreshToken(request);
    role = getRoleFromToken(refreshedToken);
  };

  const finish = (response: NextResponse) =>
    refreshedToken ? withAccessToken(response, refreshedToken) : response;

  // ── 2. Redirect signed-in users away from login / register ──────────────
  const isAuthRoute = Object.values(AUTH_ROUTES).some((route) =>
    matchesPrefix(pathname, route)
  );

  if (isAuthRoute) {
    await refreshIfExpired();
    if (role) {
      return finish(
        NextResponse.redirect(new URL(ROLE_HOME[role], request.url))
      );
    }
    return finish(NextResponse.next());
  }

  // ── 3. Role-protected areas (/student, /creator, /admin) ────────────────
  const requiredRole = USER_ROLES.find((r) =>
    matchesPrefix(pathname, ROLE_AREA_PREFIX[r])
  );

  if (requiredRole) {
    await refreshIfExpired();

    if (!role) {
      const loginUrl = new URL(AUTH_ROUTES.login, request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (role !== requiredRole) {
      return finish(
        NextResponse.redirect(new URL(ROLE_HOME[role], request.url))
      );
    }
  }

  return finish(NextResponse.next());
}

// Export proxy as default for Next.js
export default proxy;

// Configure matcher to exclude static files and API routes
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /api routes
     * - /_next (Next.js internals including static, image, data)
     * - Static files with extensions
     * - Metadata files (favicon.ico, robots.txt, sitemap*.xml, manifest.json)
     */
    "/((?!api|_next|favicon\\.ico|robots\\.txt|sitemap.*|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)",
  ],
};
