"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { ByteSpaceLogo } from "@/components/icons/svgIcons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GUEST_NAV, isActiveHref, MAIN_NAV } from "@/constant/navigation";
import { ROLE_HOME } from "@/constant/routes";
import { performCompleteLogout } from "@/lib/auth/clientLogout";
import { cn } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";
import { getDisplayName, UserAvatar } from "./UserMenu";

/** < md: hamburger → right-hand drawer with navigation and account actions. */
export function MobileMenu() {
  const pathname = usePathname();
  const { user, setUser } = useUser();

  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open menu"
        className="-mr-2 rounded-full p-2 text-(--nav-fg) transition-colors hover:text-(--nav-hover) focus-visible:outline-2 focus-visible:outline-(--nav-hover) md:hidden"
      >
        <HugeiconsIcon icon={Menu01Icon} size={26} strokeWidth={1.8} />
      </SheetTrigger>

      <SheetContent side="right" className="w-[86vw] max-w-sm gap-0 p-0">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Site navigation and account links
        </SheetDescription>

        <div className="flex h-18 items-center border-b border-bs-gray-100 px-5">
          <SheetClose asChild>
            <Link href="/" aria-label="ByteSpace home">
              <ByteSpaceLogo className="h-7" />
            </Link>
          </SheetClose>
        </div>

        <nav aria-label="Mobile" className="px-3 py-4">
          <ul className="flex flex-col gap-1">
            {MAIN_NAV.map((item) => {
              const active = isActiveHref(pathname, item.href);
              return (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "typo-label-l flex items-center gap-3 rounded-xl px-3 py-3.5 transition-colors",
                        active
                          ? "bg-bs-blue-50 text-bs-blue"
                          : "text-bs-ink hover:bg-bs-gray-50"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-2 rounded-full",
                          active ? "bg-bs-lime" : "bg-transparent"
                        )}
                      />
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto border-t border-bs-gray-100 p-5">
          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <UserAvatar user={user} />
                <div className="min-w-0">
                  <p className="typo-label-m text-bs-ink truncate">
                    {getDisplayName(user)}
                  </p>
                  <p className="typo-body-xs text-bs-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <SheetClose asChild>
                <Button variant="lime" size="pill" asChild>
                  <Link href={ROLE_HOME[user.role]}>Dashboard</Link>
                </Button>
              </SheetClose>
              <Button
                variant="outline"
                size="pill"
                onClick={() => performCompleteLogout(setUser, "/")}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <SheetClose asChild>
                <Button variant="outline" size="pill" asChild>
                  <Link href={GUEST_NAV.signIn.href}>
                    {GUEST_NAV.signIn.label}
                  </Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="lime" size="pill" asChild>
                  <Link href={GUEST_NAV.join.href}>{GUEST_NAV.join.label}</Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
