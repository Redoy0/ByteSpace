import {
  FloatingShapes,
  type FloatingShape,
} from "@/components/shared/decorations/FloatingShapes";

// Positions are px at xl, measured from the top of the hero.
const SHAPES: FloatingShape[] = [
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

export function HeroDecorations() {
  return <FloatingShapes shapes={SHAPES} eager />;
}
