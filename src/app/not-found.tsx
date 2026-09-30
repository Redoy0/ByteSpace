import Link from "next/link";
import Navbar from "@/components/shared/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { PUBLIC_ROUTES } from "@/constant/routes";
import { cn } from "@/lib/utils";

// Each digit drops in a beat after the last, so they then float in a wave
const DIGITS = [
  { digit: "4", delay: "[--delay:0s]" },
  { digit: "0", delay: "[--delay:0.25s]" },
  { digit: "4", delay: "[--delay:0.5s]" },
];

export default function NotFound() {
  return (
    <div className="bg-bs-grid flex min-h-dvh flex-col">
      <Navbar overlay />

      <main
        id="main-content"
        className="layout-container flex flex-1 flex-col items-center justify-center pt-30 pb-16 text-center lg:pt-40 lg:pb-28"
      >
        {/* The negative margin (in em, so it scales) pulls the heading up over the fade */}
        <p className="font-heading -mb-[0.24em] text-[160px] leading-none font-semibold tracking-tight sm:text-[280px] lg:text-[400px] xl:text-[480px]">
          <span className="sr-only">404</span>
          <span aria-hidden="true">
            {DIGITS.map(({ digit, delay }) => (
              <span
                key={delay}
                className={cn(
                  "text-lime-fade motion-safe:animate-drop-bob inline-block",
                  delay
                )}
              >
                {digit}
              </span>
            ))}
          </span>
        </p>
        <h1 className="typo-heading-s sm:typo-heading-m lg:typo-heading-l relative text-white">
          The page you are looking <br className="hidden sm:block" />
          for doesn’t exist
        </h1>
        <p className="typo-body-m sm:typo-body-l text-bs-gray-100 mt-6 lg:mt-9">
          Try to use a correct url or go back to homepage to start again
        </p>
        <Button asChild variant="lime" size="pill-md" className="mt-8">
          <Link href={PUBLIC_ROUTES.home}>Back to Home</Link>
        </Button>
      </main>
    </div>
  );
}
