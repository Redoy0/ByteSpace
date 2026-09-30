import { cn } from "@/lib/utils";

const SIZES = {
  md: "size-[670px]",
  lg: "size-[1140px]",
};

interface GlowProps {
  size?: keyof typeof SIZES;
  /** Stronger centre (0.6 instead of 0.4). */
  strong?: boolean;
  /** Positioning, e.g. "-top-40 left-10". */
  className?: string;
}

/** Soft lime background glow. Place inside a `relative` parent. */
export function Glow({ size = "lg", strong, className }: GlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-bs-lime-glow pointer-events-none absolute",
        SIZES[size],
        strong && "[--glow-alpha:0.6]",
        className
      )}
    />
  );
}
