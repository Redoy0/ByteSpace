import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingBasket01Icon } from "@hugeicons/core-free-icons";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { PUBLIC_ROUTES } from "@/constant/routes";
import { MobileMenu } from "./MobileMenu";
import { NavbarActions } from "./NavbarActions";
import { NavbarShell } from "./NavbarShell";
import { NavLinks } from "./NavLinks";

/**
 * Site header — logo | centred primary nav | account + cart.
 * Desktop matches the 120px header in ui/landing/Header_Frame.png;
 * below md it collapses to logo + cart + drawer menu.
 */
export default function Navbar({ overlay }: { overlay?: boolean }) {
  return (
    <NavbarShell overlay={overlay}>
      <div className="layout-container grid h-18 grid-cols-[1fr_auto] items-center gap-4 md:h-[120px] md:grid-cols-[1fr_auto_1fr]">
        <Link
          href={PUBLIC_ROUTES.home}
          aria-label="ByteSpace home"
          className="justify-self-start rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--nav-hover) md:-translate-y-[7px]"
        >
          {/* NavbarShell's data-overlay picks the light logo over the blue hero */}
          <BrandLogo
            priority
            className="h-[30px] in-data-[overlay=true]:hidden md:h-[37px]"
          />
          <BrandLogo
            tone="light"
            priority
            className="hidden h-[30px] in-data-[overlay=true]:block md:h-[37px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4 justify-self-end md:gap-7">
          <div className="hidden md:block">
            <NavbarActions />
          </div>
          <Link
            href={PUBLIC_ROUTES.cart}
            aria-label="Cart"
            className="rounded-sm text-(--nav-fg) transition-colors hover:text-(--nav-hover) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--nav-hover)"
          >
            <HugeiconsIcon
              icon={ShoppingBasket01Icon}
              size={24}
              strokeWidth={1.8}
            />
          </Link>
          <MobileMenu />
        </div>
      </div>
    </NavbarShell>
  );
}
