"use client";

import Link from "next/link";
import { ROLE_HOME } from "@/constant/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { performCompleteLogout } from "@/lib/auth/clientLogout";
import { useUser } from "@/providers/UserProvider";
import type { User } from "@/types/user";

export const getDisplayName = (user: User) =>
  user.name?.trim() || user.email.split("@")[0];

export function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar className="border-bs-lime size-10 border-2">
      {user.profileImage && (
        <AvatarImage src={user.profileImage} alt="" className="object-cover" />
      )}
      <AvatarFallback className="bg-bs-lime text-bs-ink typo-label-m uppercase">
        {getDisplayName(user).charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}

/** Signed-in state: avatar button → dashboard / sign out. */
export function UserMenu({ user }: { user: User }) {
  const { setUser } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--nav-hover)"
        aria-label="Open account menu"
      >
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl">
        <DropdownMenuLabel className="font-normal">
          <p className="typo-label-m text-bs-ink truncate">
            {getDisplayName(user)}
          </p>
          <p className="typo-body-xs text-bs-gray-500 truncate">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ROLE_HOME[user.role]}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => performCompleteLogout(setUser, "/")}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
