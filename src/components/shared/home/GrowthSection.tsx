import Image from "next/image";
import { Glow } from "@/components/shared/decorations/Glow";
import { Tilt } from "@/components/shared/motion/Tilt";
import { PLATFORM_STATS } from "@/data/home";

// Only clipped on x, and stacked above the creator section, so the image's
// drop shadow can spill into the next section.
export function GrowthSection() {
  return (
    <section
      aria-labelledby="growth-title"
      className="bg-bs-growth relative z-1 overflow-x-clip pt-16 pb-10 md:pt-20 xl:pt-30"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Glow className="-top-[470px] left-[max(-150px,calc(50%-870px))]" />
      </div>

      <div className="layout-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <h2
              id="growth-title"
              className="typo-heading-s md:typo-heading-m lg:typo-heading-s xl:typo-heading-m text-bs-ink"
            >
              Your Path to Professional <br className="hidden sm:block" />
              Growth Starts Here!
            </h2>
            <p className="typo-body-m sm:typo-body-l text-bs-gray-700 mt-6 max-w-[475px] lg:mt-10">
              Explore our curated selection of courses tailored to enhance your
              capabilities and accelerate your career journey. Whether you are
              looking to sharpen specific skills, gain industry expertise, or
              embark on a new career path entirely, we have the resources you
              need.
            </p>

            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 sm:gap-x-14 lg:mt-10">
              {PLATFORM_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="typo-body-m sm:typo-body-l text-bs-gray-700">
                    {stat.label}
                  </dt>
                  <dd className="text-bs-blue-800 text-4xl leading-tight font-medium">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The box covers the cards only; the image's shadow hangs below it */}
          <div className="relative mx-auto aspect-[703/551] w-full max-w-[560px] max-lg:translate-x-[6%] lg:w-[120%] lg:max-w-none">
            <Tilt className="absolute inset-0">
              <Image
                src="/images/GrowthSection/Image.png"
                alt="Smiling student holding a laptop beside a Figma course card and a 55% learning progress card"
                width={703}
                height={697}
                sizes="(min-width: 1280px) 703px, (min-width: 1024px) 60vw, 560px"
                className="motion-safe:animate-float-soft absolute top-0 left-0 h-auto w-full"
              />
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
