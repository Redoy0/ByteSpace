"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Bookmark01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  courseTitle: string;
  className?: string;
}

/**
 * Save-for-later toggle on course cards. Local state only until a wishlist
 * endpoint exists (then: APIKit → React Query mutation).
 * Hidden in the resting design; appears on card hover / keyboard focus or
 * once saved.
 */
export function BookmarkButton({
  courseTitle,
  className,
}: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={
        saved ? `Remove ${courseTitle} from saved` : `Save ${courseTitle}`
      }
      onClick={() => setSaved((v) => !v)}
      className={cn(
        "text-bs-ink focus-visible:outline-bs-blue flex size-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-opacity hover:bg-white focus-visible:opacity-100 focus-visible:outline-2",
        saved
          ? "text-bs-blue opacity-100"
          : "opacity-0 group-focus-within:opacity-100 group-hover:opacity-100",
        className
      )}
    >
      <HugeiconsIcon
        icon={Bookmark01Icon}
        size={18}
        strokeWidth={1.8}
        className={saved ? "fill-current" : undefined}
      />
    </button>
  );
}
