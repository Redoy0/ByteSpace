import { AUTH_ROUTES, PUBLIC_ROUTES } from "./routes";

export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: PUBLIC_ROUTES.home },
  { label: "Courses", href: PUBLIC_ROUTES.courses },
  { label: "Creators", href: PUBLIC_ROUTES.creators },
];

export const GUEST_NAV = {
  signIn: { label: "Sign In", href: AUTH_ROUTES.login },
  join: { label: "Join Us", href: AUTH_ROUTES.register },
} as const;

/**
 * Pages whose first section is the blue hero — the navbar sits on top of
 * it (transparent, light text) instead of taking its own row.
 */
export const OVERLAY_NAV_ROUTES: string[] = [PUBLIC_ROUTES.home];

export const isActiveHref = (pathname: string | null, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || !!pathname?.startsWith(`${href}/`);
