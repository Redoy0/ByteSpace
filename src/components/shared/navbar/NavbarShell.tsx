"use client";

import { usePathname } from "next/navigation";
import { OVERLAY_NAV_ROUTES } from "@/constant/navigation";
import { cn } from "@/lib/utils";

/**
 * Positions the header and sets its colour scheme.
 *
 * - Overlay routes (home), or `overlay` (404): transparent, sits on top of
 *   the blue canvas.
 * - Everything else: sticky white bar.
 *
 * Children read the scheme through CSS variables (--nav-fg, --nav-hover,
 * --nav-active) so they can stay server components where possible.
 */
export function NavbarShell({
  children,
  overlay,
}: {
  children: React.ReactNode;
  /** Force the transparent scheme on pages that aren't routes (not-found). */
  overlay?: boolean;
}) {
  const pathname = usePathname();
  const isOverlay = overlay ?? OVERLAY_NAV_ROUTES.includes(pathname ?? "");

  return (
    <header
      data-overlay={isOverlay}
      className={cn(
        "z-40 w-full",
        isOverlay
          ? "absolute inset-x-0 top-0 [--nav-active:#fff] [--nav-fg:var(--bs-gray-50)] [--nav-hover:var(--bs-lime-400)]"
          : "sticky top-0 border-b border-(--bs-gray-100) bg-white/90 backdrop-blur-md [--nav-active:var(--bs-gray-950)] [--nav-fg:var(--bs-gray-600)] [--nav-hover:var(--bs-blue-800)]"
      )}
    >
      {children}
    </header>
  );
}
