import Link from "next/link";
import { ByteSpaceMark } from "@/components/icons/svgIcons";
import { PUBLIC_ROUTES } from "@/constant/routes";
import { AuthIllustration } from "./AuthIllustration";

interface AuthShellProps {
  /** Left-hand copy on the blue canvas. */
  intro: { title: string; description: string };
  /** Small blue line above the heading, e.g. "Sign In". */
  eyebrow: string;
  heading: string;
  /** The form (and anything under it). */
  children: React.ReactNode;
  /** Line pinned to the bottom of the card, e.g. "New user? Create an account". */
  footer: React.ReactNode;
}

/**
 * Sign-in / sign-up page frame (ui/Login.png, ui/Register.png): logo mark,
 * intro copy and illustration on the left, a 580×784 white card on the right.
 * At 1024px tall the card sits 120px from top and bottom like the design;
 * taller screens centre it.
 */
export function AuthShell({
  intro,
  eyebrow,
  heading,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="layout-container pt-6 lg:pt-[34px]">
        <Link
          href={PUBLIC_ROUTES.home}
          aria-label="ByteSpace home"
          className="focus-visible:outline-bs-lime flex w-fit rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 lg:ml-0.5"
        >
          <ByteSpaceMark className="h-[34px]" />
        </Link>
      </header>

      <div className="layout-container grid flex-1 content-start gap-10 pt-8 pb-10 lg:grid-cols-2 lg:content-center lg:pt-[52px] lg:pb-[120px]">
        <div className="flex flex-col lg:pl-0.5">
          <p className="typo-heading-xs text-bs-gray-50">{intro.title}</p>
          <p className="typo-body-m sm:typo-body-l text-bs-gray-50 mt-4 max-w-[480px]">
            {intro.description}
          </p>
          <AuthIllustration className="mt-auto mb-[42px] hidden origin-bottom-left scale-[.85] lg:block xl:scale-100" />
        </div>

        <section className="flex flex-col rounded-[28px] bg-white px-6 py-10 sm:px-10 lg:min-h-[784px] lg:px-16 lg:pt-16 lg:pb-10">
          <p className="typo-body-l text-bs-blue-800 leading-[1.2]">
            {eyebrow}
          </p>
          <h1 className="typo-heading-s sm:typo-heading-m text-bs-ink mt-[5px]">
            {heading}
          </h1>
          {children}
          <p className="typo-body-m text-bs-gray-700 mt-auto pt-10 text-center">
            {footer}
          </p>
        </section>
      </div>
    </div>
  );
}
