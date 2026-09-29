import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ByteSpaceLogo } from "@/components/icons/svgIcons";
import { PUBLIC_ROUTES } from "@/constant/routes";

const footerGroups = {
  navigation: [
    { label: "Home", href: PUBLIC_ROUTES.home },
    { label: "Courses", href: PUBLIC_ROUTES.courses },
    { label: "Creators", href: PUBLIC_ROUTES.creators },
    { label: "Support", href: "/support" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Legal", href: "/legal" },
  ],
};

const socials = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "YouTube", href: "#", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-bs-gray-950 text-bs-gray-100">
      <div className="layout-container py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-8">
          <div>
            <ByteSpaceLogo tone="light" className="h-8 md:h-9" />
            <p className="text-bs-gray-300 mt-5 max-w-sm text-sm leading-7">
              Learn new skills, grow your confidence, and build real momentum
              with expert-led learning experiences designed for modern creators
              and teams.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-bs-gray-200 hover:border-bs-lime hover:text-bs-lime flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="typo-label-l text-white">Navigate</h3>
            <ul className="text-bs-gray-300 mt-4 space-y-3 text-sm">
              {footerGroups.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="typo-label-l text-white">Company</h3>
            <ul className="text-bs-gray-300 mt-4 space-y-3 text-sm">
              {footerGroups.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="typo-label-l text-white">Stay in the loop</h3>
            <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2">
              <div className="text-bs-gray-300 flex items-center gap-2 pl-2">
                <Mail className="h-4 w-4" />
                <input
                  aria-label="Email address"
                  type="email"
                  placeholder="Email address"
                  className="placeholder:text-bs-gray-400 w-full bg-transparent text-sm text-white focus:outline-none"
                />
              </div>
              <Button
                type="button"
                variant="lime"
                size="sm"
                className="rounded-full px-4"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-bs-gray-400 mt-10 border-t border-white/10 pt-6 text-sm">
          © 2026 ByteSpace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
