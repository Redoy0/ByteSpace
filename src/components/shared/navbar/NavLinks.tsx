"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveHref, MAIN_NAV } from "@/constant/navigation";

export const navLinkClass =
  "typo-body-m rounded-sm text-(--nav-fg) transition-colors hover:text-(--nav-hover) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--nav-hover) aria-[current=page]:text-(--nav-active)";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6">
      {MAIN_NAV.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={
              isActiveHref(pathname, item.href) ? "page" : undefined
            }
            className={navLinkClass}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
