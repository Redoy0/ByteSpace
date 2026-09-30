import type { UserRole } from "@/types/user";

export const AUTH_ROUTES = {
  login: "/login",
  register: "/register",
} as const;

export const PUBLIC_ROUTES = {
  home: "/",
  courses: "/courses",
  creators: "/creators",
  cart: "/cart",
} as const;

/** Protected area prefix for each role — used by proxy.ts route guards. */
export const ROLE_AREA_PREFIX: Record<UserRole, string> = {
  student: "/student",
  creator: "/creator",
  admin: "/admin",
};

/** Landing page after sign-in for each role. */
export const ROLE_HOME: Record<UserRole, string> = {
  student: "/student/dashboard",
  creator: "/creator/dashboard",
  admin: "/admin/dashboard",
};

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const ACCESS_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days — matches JWT expiry
