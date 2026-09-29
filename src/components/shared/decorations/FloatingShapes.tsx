import Image from "next/image";
import { cn } from "@/lib/utils";

export interface FloatingShape {
  src: string;
  /** Which viewport edge the shape is anchored to (as in the design). */
  side: "left" | "right";
  /** Distance from that edge, in design px (1440 frame). */
  inset: number;
  /** Distance from the section top — or bottom, if set instead — in design px. */
  top?: number;
  bottom?: number;
  /** Rendered size in design px (the file may be a 2x export). */
  w: number;
  h: number;
  /** Float animation offset (s) so shapes don't bob in sync. */
  delay: number;
  /** md+ visibility tweaks where a shape would collide with the content. */
  desktop?: string;
  /** Classes for the < md composition (null = hidden on phones). */
  mobile: string | null;
}

const ORIGIN = {
  "top-left": "origin-top-left",
  "top-right": "origin-top-right",
  "bottom-left": "origin-bottom-left",
  "bottom-right": "origin-bottom-right",
} as const;

const floatClass = "motion-safe:animate-float";

/**
 * Decorative 3D shapes for a `relative overflow-hidden` section.
 *
 * md+: each shape keeps its design distance from the left or right edge of
 * the viewport, so edge shapes always bleed off the real screen edge at any
 * width. Below 1280px they shrink (65%) towards that corner.
 * < md: a lighter, re-positioned subset.
 */
export function FloatingShapes({
  shapes,
  eager = false,
}: {
  shapes: FloatingShape[];
  /** Load immediately (above the fold). */
  eager?: boolean;
}) {
  const loading = eager ? "eager" : "lazy";

  return (
    <div aria-hidden="true" className="pointer-events-none">
      {shapes.map((s) => (
        <Image
          key={s.src}
          src={s.src}
          alt=""
          width={s.w}
          height={s.h}
          loading={loading}
          className={cn(
            "absolute z-[1] hidden md:block md:scale-[.65] xl:scale-100",
            ORIGIN[`${s.bottom === undefined ? "top" : "bottom"}-${s.side}`],
            floatClass,
            s.desktop
          )}
          style={{
            [s.side]: s.inset,
            top: s.top,
            bottom: s.bottom,
            width: s.w,
            height: s.h,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* < md : compact set */}
      {shapes
        .filter((s) => s.mobile)
        .map((s) => (
          <Image
            key={`${s.src}-mobile`}
            src={s.src}
            alt=""
            width={s.w}
            height={s.h}
            loading={loading}
            className={cn(
              "absolute z-[1] h-auto md:hidden",
              floatClass,
              s.mobile
            )}
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}
    </div>
  );
}
