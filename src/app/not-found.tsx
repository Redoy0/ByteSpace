import Link from "next/link";
import Navbar from "@/components/shared/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { PUBLIC_ROUTES } from "@/constant/routes";

/**
 * 404 (ui/404.png): the site navbar over the blue grid, a fading lime "404"
 * with the heading overlapping its lower half. The grid rows start 2px up
 * like the design.
 */
export default function NotFound() {
  return (
    <div className="bg-bs-grid flex min-h-dvh flex-col [--grid-y:-2px]">
      <Navbar overlay />

      <main
        id="main-content"
        className="layout-container flex flex-1 flex-col items-center justify-center pt-[120px] pb-16 text-center lg:pt-[159px] lg:pb-[125px]"
      >
        {/* Negative bottom margin (in em) lets the heading ride over the fade */}
        <p className="text-lime-fade font-heading mr-[0.025em] mb-[-0.24em] text-[160px] leading-none font-semibold tracking-[-0.02em] sm:text-[280px] lg:text-[400px] xl:text-[480px]">
          404
        </p>
        <h1 className="typo-heading-s sm:typo-heading-m lg:typo-heading-l relative text-white lg:leading-[1.15]">
          The page you are looking <br className="hidden sm:block" />
          for doesn’t exist
        </h1>
        <p className="typo-body-m sm:typo-body-l text-bs-gray-100 mt-6 lg:mt-[35px]">
          Try to use a correct url or go back to homepage to start again
        </p>
        <Button
          asChild
          variant="lime"
          size="pill"
          className="mt-8 h-[46px] px-[25px] text-lg"
        >
          <Link href={PUBLIC_ROUTES.home}>Back to Home</Link>
        </Button>
      </main>
    </div>
  );
}
