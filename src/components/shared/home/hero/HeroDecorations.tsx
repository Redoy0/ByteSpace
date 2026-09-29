import Image from "next/image";
import { cn } from "@/lib/utils";

interface Shape {
  src: string;
  /** Which viewport edge the shape is anchored to (as in the design). */
  side: "left" | "right";
  /** Distance from that edge / from the section top, in design px (1440 frame). */
  inset: number;
  top: number;
  w: number;
  h: number;
  /** Float animation offset (s) so shapes don't bob in sync. */
  delay: number;
  /** md+ visibility tweaks where a shape would collide with the content. */
  desktop?: string;
  /** Classes for the < md composition (null = hidden on phones). */
  mobile: string | null;
}

// Sliced from ui/Landing/3d ornament.png (bottom-aligned in the 1440×1024 hero).
const SHAPES: Shape[] = [
  {
    src: "/images/decorations/lime-spiral.png",
    side: "left",
    inset: 0,
    top: 285,
    w: 195,
    h: 269,
    delay: 0,
    mobile: "-left-9 top-[92px] w-[84px]",
  },
  {
    src: "/images/decorations/white-spring-sm.png",
    side: "left",
    inset: 215,
    top: 506,
    w: 116,
    h: 122,
    delay: 1.2,
    // < 1280px it runs into the search bar
    desktop: "md:hidden xl:block",
    mobile: "left-1 top-[412px] w-[46px]",
  },
  {
    src: "/images/decorations/white-donut.png",
    side: "left",
    inset: 67,
    top: 741,
    w: 239,
    h: 219,
    delay: 2.1,
    mobile: null,
  },
  {
    src: "/images/decorations/lime-cylinder.png",
    side: "right",
    inset: 0,
    top: 255,
    w: 164,
    h: 300,
    delay: 0.6,
    mobile: "-right-6 top-[150px] w-[64px]",
  },
  {
    src: "/images/decorations/white-pyramid.png",
    side: "right",
    inset: 184,
    top: 485,
    w: 125,
    h: 138,
    delay: 1.6,
    // 1024–1279px: overlaps the Search button
    desktop: "lg:hidden xl:block",
    mobile: "right-2 top-[404px] w-[44px]",
  },
  {
    src: "/images/decorations/white-spring-lg.png",
    side: "right",
    inset: 53,
    top: 710,
    w: 191,
    h: 250,
    delay: 2.6,
    mobile: null,
  },
];

const floatClass = "motion-safe:animate-float";

/**
 * Decorative 3D shapes.
 *
 * md+: each shape keeps its design distance from the left or right edge of
 * the viewport, so edge shapes (spiral, cylinder) always bleed off the real
 * screen edge at any width. Below 1280px they shrink (65%) from that edge.
 * < md: a lighter, re-positioned subset.
 */
export function HeroDecorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none">
      {SHAPES.map((s) => (
        <Image
          key={s.src}
          src={s.src}
          alt=""
          width={s.w}
          height={s.h}
          loading="eager"
          className={cn(
            "absolute z-[1] hidden md:block md:scale-[.65] xl:scale-100",
            s.side === "left" ? "origin-top-left" : "origin-top-right",
            floatClass,
            s.desktop
          )}
          style={{
            [s.side]: s.inset,
            top: s.top,
            width: s.w,
            height: s.h,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* < md : compact set */}
      {SHAPES.filter((s) => s.mobile).map((s) => (
        <Image
          key={`${s.src}-mobile`}
          src={s.src}
          alt=""
          width={s.w}
          height={s.h}
          loading="eager"
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
