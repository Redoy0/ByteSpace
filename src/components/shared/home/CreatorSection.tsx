import Image from "next/image";
import { Check } from "lucide-react";
import { Tilt } from "@/components/shared/motion/Tilt";
import { CREATOR_FEATURES } from "@/data/home";

/**
 * "Create & Manage Courses Easily" (ui/Landing/Frame 15.png, bottom half).
 * The revenue cards, creator and Happy Students card are one exported
 * composition with a baked-in drop shadow.
 */
export function CreatorSection() {
  return (
    <section
      aria-labelledby="creator-title"
      className="bg-bs-creator relative isolate overflow-hidden pt-8 pb-16 md:pb-20 xl:pb-[127px]"
    >
      {/*
       * Figma: 664×678 at -287, 946 in the 1460px frame, i.e. 164px past the
       * section bottom. Pinned to -287px at 1440; follows the content wider.
       */}
      <div
        aria-hidden="true"
        className="bg-bs-lime-glow pointer-events-none absolute bottom-[-164px] left-[max(-287px,calc(50%_-_1007px))] h-[678px] w-[664px] [--glow-alpha:0.6]"
      />

      <div className="layout-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="lg:order-2">
            <h2
              id="creator-title"
              className="typo-heading-s md:typo-heading-m text-bs-ink"
            >
              Create &amp; Manage <br className="hidden sm:block" />
              Courses Easily.
            </h2>
            <p className="typo-body-m sm:typo-body-l text-bs-gray-700 mt-6 max-w-[560px] lg:mt-10">
              <strong className="text-bs-ink font-bold">ByteSpace</strong>{" "}
              supports individuals or entities in the creation, publication, and
              administration of educational courses.
            </p>

            <ul className="mt-6 space-y-4 lg:mt-10">
              {CREATOR_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="bg-bs-blue-800 flex size-5 shrink-0 items-center justify-center rounded-full text-white"
                  >
                    <Check className="size-3" strokeWidth={3.5} />
                  </span>
                  <span className="typo-body-l text-bs-ink leading-6">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/*
           * The box is the composition's top 587×598 (down to the photo's
           * edge), so the text centres on it; the shadow hangs below. Below lg
           * the 4% nudge centres the cards rather than cards + empty margin.
           */}
          <div className="relative mx-auto aspect-[587/598] w-full max-w-[587px] max-lg:translate-x-[4%] lg:order-1">
            {/* Tilts towards the mouse; the image itself bobs gently */}
            <Tilt className="absolute inset-0">
              <Image
                src="/images/creatorSection/left-creator.png"
                alt="Creator wearing a headset and holding a tablet, beside revenue cards and a Happy Students rating card"
                width={587}
                height={719}
                sizes="(min-width: 1280px) 580px, (min-width: 1024px) 50vw, 587px"
                className="motion-safe:animate-float-soft absolute top-0 left-0 h-auto w-full"
                // Out of step with the growth image
                style={{ animationDelay: "-3.5s" }}
              />
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
