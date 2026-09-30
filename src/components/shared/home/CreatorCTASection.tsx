import {
  FloatingShapes,
  type FloatingShape,
} from "@/components/shared/decorations/FloatingShapes";
import { Button } from "@/components/ui/button";

// w/h are the rendered size (some files are 2x exports or carry padding).
const SHAPES: FloatingShape[] = [
  {
    src: "/images/decorations/lime-spiral.png",
    side: "left",
    inset: 0,
    top: -98,
    w: 195,
    h: 269,
    delay: 0,
    mobile: "-left-8 -top-14 w-[84px]",
  },
  {
    src: "/images/decorations/white-spring-sm.png",
    side: "left",
    inset: 210,
    top: 34,
    w: 116,
    h: 122,
    delay: 1.2,
    // < 1280px these three run into the heading / paragraph
    desktop: "md:hidden xl:block",
    mobile: null,
  },
  {
    src: "/images/Cta/Cone.png",
    side: "left",
    inset: 0,
    top: 225,
    w: 140,
    h: 189,
    delay: 2.1,
    desktop: "md:hidden xl:block",
    mobile: null,
  },
  {
    src: "/images/decorations/lime-pyramid.png",
    side: "right",
    inset: 210,
    top: 21,
    w: 125,
    h: 138,
    delay: 1.6,
    desktop: "md:hidden xl:block",
    mobile: null,
  },
  {
    src: "/images/decorations/white-cylinder.png",
    side: "right",
    inset: 0,
    top: 41,
    w: 178,
    h: 308,
    delay: 0.6,
    // 768–1023px: covers the paragraph's line ends
    desktop: "md:hidden lg:block",
    mobile: null,
  },
  {
    src: "/images/Cta/halfcircle.png",
    side: "left",
    inset: 17,
    bottom: 0,
    w: 346,
    h: 190,
    delay: 0.9,
    mobile: null,
  },
  {
    src: "/images/Cta/limespring.png",
    side: "right",
    inset: 1,
    bottom: 0,
    w: 332,
    h: 199,
    delay: 2.6,
    mobile: "-right-12 -bottom-2 w-[132px]",
  },
];

export function CreatorCTASection() {
  return (
    <section
      aria-labelledby="creator-cta-title"
      className="bg-bs-grid relative isolate overflow-hidden py-16 md:py-20 xl:py-21"
    >
      <FloatingShapes shapes={SHAPES} />

      <div className="layout-container relative z-2 text-center">
        <h2
          id="creator-cta-title"
          className="typo-heading-s md:typo-heading-m text-bs-gray-50"
        >
          Unlock Your Potential as a <br className="hidden sm:block" />
          Creator with ByteSpace
        </h2>
        <p className="typo-body-m sm:typo-body-l text-bs-gray-50 mx-auto mt-6 max-w-[965px] md:mt-10">
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now and become a part of a community
          comprising over 10,000 local and international creators. Utilize our
          Course Editor, and showcase your expertise by publishing your finest
          course on the ByteSpace Course Library.
        </p>
        <div className="mt-8 flex justify-center md:mt-10">
          <Button
            type="button"
            variant="lime"
            size="pill-md"
            className="font-medium"
          >
            Join as Creator
          </Button>
        </div>
      </div>
    </section>
  );
}
