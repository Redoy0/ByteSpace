"use client";

import Link from "next/link";
import { GUEST_NAV } from "@/constant/navigation";
import { useUser } from "@/providers/UserProvider";
import { navLinkClass } from "./NavLinks";
import { UserMenu } from "./UserMenu";

/** Desktop account area: Sign In / Join Us for guests, avatar menu when signed in. */
export function NavbarActions() {
  const { user } = useUser();

  if (user) return <UserMenu user={user} />;

  return (
    <div className="flex items-center gap-6">
      <Link href={GUEST_NAV.signIn.href} className={navLinkClass}>
        {GUEST_NAV.signIn.label}
      </Link>
      <Link href={GUEST_NAV.join.href} className={navLinkClass}>
        {GUEST_NAV.join.label}
      </Link>
    </div>
  );
}
