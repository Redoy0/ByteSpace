import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Button } from "@/components/ui/button";
import { PUBLIC_ROUTES } from "@/constant/routes";
import { cn } from "@/lib/utils";

const category = (slug: string) => `${PUBLIC_ROUTES.courses}?category=${slug}`;

const LINK_COLUMNS = [
  [
    { label: "Featured Courses", href: PUBLIC_ROUTES.courses },
    { label: "Featured Categories", href: PUBLIC_ROUTES.courses },
    { label: "Business", href: category("business") },
    { label: "IT", href: category("it-software") },
    { label: "Design", href: category("design") },
  ],
  [
    { label: "Development", href: category("development") },
    { label: "Marketing", href: category("marketing") },
    { label: "Photography", href: category("photography") },
    { label: "Finance", href: category("finance") },
    { label: "Sport", href: category("sport") },
  ],
  [
    { label: "Become a Creator", href: PUBLIC_ROUTES.creators },
    { label: "Affiliate Program", href: "/affiliate" },
    { label: "Contact", href: "/contact" },
    { label: "Help", href: "/help" },
    { label: "About", href: "/about" },
  ],
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookies Settings", href: "/cookies" },
];

const linkClass =
  "rounded-sm transition-colors hover:text-bs-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bs-blue-800";

export function Footer() {
  return (
    <footer className="text-bs-ink border-t border-(--bs-gray-200) bg-white">
      <div className="layout-container pt-12 pb-10 md:pt-18 md:pb-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <Link
              href={PUBLIC_ROUTES.home}
              aria-label="ByteSpace home"
              className={cn("inline-block", linkClass)}
            >
              <BrandLogo />
            </Link>
            <p className="typo-body-s mt-2.5">
              Stay Up to date with our latest features and releases by joining
              our newsletter.
            </p>

            {/* The form row's width also sets where the disclaimer wraps */}
            <div className="mt-11 flex max-w-125 items-start gap-3 sm:gap-6">
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email"
                autoComplete="email"
                className="typo-body-m placeholder:text-bs-ink focus-visible:ring-bs-blue-800/20 h-13 min-w-0 flex-1 rounded-full border border-(--bs-gray-200) bg-white px-6 outline-none focus-visible:border-(--bs-blue-800) focus-visible:ring-4"
              />
              <Button
                type="button"
                variant="lime"
                size="pill-md"
                className="shrink-0"
              >
                Search
              </Button>
            </div>
            <p className="typo-body-xs mt-6 max-w-125">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3 lg:pt-12"
          >
            {LINK_COLUMNS.map((links, i) => (
              <ul
                key={links[0].label}
                className={cn(
                  "typo-body-s flex flex-col gap-4 leading-5.5",
                  // phones: 2 columns, so the last list spreads across both
                  i === LINK_COLUMNS.length - 1 &&
                    "max-sm:col-span-2 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-10"
                )}
              >
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-(--bs-gray-200) pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-32">
          <p className="typo-body-xs">
            © {new Date().getFullYear()} ByteSpace. All rights reserved.
          </p>
          <ul className="typo-body-xs flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
