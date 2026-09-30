import type { ComponentType, SVGProps } from "react";
import {
  ConnectWithoutContactIcon,
  DesignServicesIcon,
  DeveloperModeIcon,
  DomainIcon,
  LaptopIcon,
  PhotoCameraFrontIcon,
} from "@/components/icons/svgIcons";
import { LEARNING_PATHS } from "@/data/home";
import type { LearningPathIcon } from "@/types/home";

const ICONS: Record<
  LearningPathIcon,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  design: DesignServicesIcon,
  development: DeveloperModeIcon,
  software: LaptopIcon,
  business: DomainIcon,
  marketing: ConnectWithoutContactIcon,
  photography: PhotoCameraFrontIcon,
};

// No top padding: it follows the white course section, whose bottom padding
// provides the gap.
export function LearningPathsSection() {
  return (
    <section
      aria-labelledby="learning-paths-title"
      className="bg-white pb-16 md:pb-20 xl:pb-30"
    >
      <div className="layout-container">
        <div className="mx-auto max-w-[920px] text-center">
          <h2
            id="learning-paths-title"
            className="typo-heading-s text-bs-navy text-balance"
          >
            Explore Diverse Learning Paths at ByteSpace
          </h2>
          <p className="typo-body-m sm:typo-body-l text-bs-gray-400 mt-4">
            At ByteSpace, we believe in empowering individuals through
            knowledge. Our diverse range of courses spans various fields,
            ensuring there&apos;s something for everyone. Unleash your potential
            and explore our carefully curated categories.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:mt-17 lg:grid-cols-6 xl:gap-10">
          {LEARNING_PATHS.map((path) => {
            const Icon = ICONS[path.icon];

            return (
              <li
                key={path.slug}
                className="flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border border-(--bs-gray-200) bg-white"
              >
                <span className="bg-bs-lime flex size-15 items-center justify-center rounded-full">
                  <Icon className="text-bs-ink size-9" />
                </span>
                <span className="typo-label-xl text-bs-ink">{path.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
