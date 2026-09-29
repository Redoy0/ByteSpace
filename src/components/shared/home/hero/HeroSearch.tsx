import Form from "next/form";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { PUBLIC_ROUTES } from "@/constant/routes";
import { cn } from "@/lib/utils";

/**
 * Course search. A plain GET form to /courses?searchTerm=… (the param read
 * by useSearchUrlFilters) — works before hydration, and next/form turns it
 * into a client-side navigation afterwards.
 */
export function HeroSearch({ className }: { className?: string }) {
  return (
    <Form
      action={PUBLIC_ROUTES.courses}
      role="search"
      aria-label="Search courses"
      className={cn(
        "mx-auto flex w-full max-w-[580px] items-start gap-3 sm:gap-4",
        className
      )}
    >
      <label htmlFor="hero-search" className="sr-only">
        Search for a course, topic or creator
      </label>
      <div className="relative min-w-0 flex-1">
        <HugeiconsIcon
          icon={Search01Icon}
          size={20}
          strokeWidth={2}
          aria-hidden="true"
          className="text-bs-gray-400 pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 sm:left-6"
        />
        <input
          id="hero-search"
          name="searchTerm"
          type="search"
          autoComplete="off"
          placeholder="Course, topic, creator"
          className="typo-body-m sm:typo-body-l text-bs-ink placeholder:text-bs-gray-400 focus-visible:ring-bs-lime h-12 w-full rounded-full bg-white pr-5 pl-12 outline-none focus-visible:ring-4 sm:h-[52px] sm:pl-14"
        />
      </div>
      <Button
        type="submit"
        variant="lime"
        className="typo-body-m sm:typo-body-l h-12 rounded-full px-5 focus-visible:ring-white/60 sm:h-[46px] sm:px-6"
      >
        Search
      </Button>
    </Form>
  );
}
