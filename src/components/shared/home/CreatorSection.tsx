import Image from "next/image";
import { Check } from "lucide-react";
import { Glow } from "@/components/shared/decorations/Glow";
import { Tilt } from "@/components/shared/motion/Tilt";
import { CREATOR_FEATURES } from "@/data/home";

export function CreatorSection() {
  return (
    <section
      aria-labelledby="creator-title"
      className="bg-bs-creator relative isolate overflow-hidden pt-8 pb-16 md:pb-20 xl:pb-32"
    >
      <Glow
        size="md"
        strong
        className="-bottom-40 left-[max(-290px,calc(50%-1010px))]"
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

          {/* The box covers the cards only; the image's shadow hangs below it */}
          <div className="relative mx-auto aspect-[587/598] w-full max-w-[587px] max-lg:translate-x-[4%] lg:order-1">
            <Tilt className="absolute inset-0">
              <Image
                src="/images/creatorSection/left-creator.png"
                alt="Creator wearing a headset and holding a tablet, beside revenue cards and a Happy Students rating card"
                width={587}
                height={719}
                sizes="(min-width: 1280px) 580px, (min-width: 1024px) 50vw, 587px"
                className="motion-safe:animate-float-soft absolute top-0 left-0 h-auto w-full"
                // Offset so it doesn't bob in sync with the growth image
                style={{ animationDelay: "-3.5s" }}
              />
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
