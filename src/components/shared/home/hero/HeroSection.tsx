import { HeroDecorations } from "./HeroDecorations";
import { HeroSearch } from "./HeroSearch";
import { HeroVisual } from "./HeroVisual";

/**
 * The site navbar overlays the top of this section, so the top padding
 * reserves its height (72px / 120px).
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-bs-grid relative isolate overflow-hidden"
    >
      <HeroDecorations />

      <div className="layout-container relative z-[2] pt-26 text-center md:pt-38 lg:pt-42">
        <h1
          id="hero-title"
          className="typo-heading-s sm:typo-heading-m lg:typo-heading-l mx-auto max-w-[900px] text-balance text-white"
        >
          Get Access to Hundreds <br className="hidden sm:block" />
          Courses Available
        </h1>
        <p className="typo-body-m sm:typo-body-l text-bs-gray-50 mx-auto mt-4 max-w-[820px] sm:mt-6 lg:mt-8 lg:max-w-[720px] xl:max-w-[820px]">
          Unlock your creativity, gain valuable knowledge, and grow your
          business with our wide range of courses.
        </p>
        <HeroSearch className="mt-8 lg:mt-15" />
      </div>

      <HeroVisual className="mt-10 lg:mt-9" />
    </section>
  );
}
