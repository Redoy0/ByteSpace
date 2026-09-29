import {
  BriefcaseBusiness,
  Camera,
  Code2,
  Megaphone,
  Palette,
  MonitorSmartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LEARNING_PATHS } from "@/data/home";

const iconMap = {
  design: Palette,
  development: Code2,
  software: MonitorSmartphone,
  business: BriefcaseBusiness,
  marketing: Megaphone,
  photography: Camera,
};

export function LearningPathsSection() {
  return (
    <section className="bg-white py-16 md:py-20 xl:py-[104px]">
      <div className="layout-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-bs-blue-800 mb-4 text-sm font-semibold tracking-[0.22em] uppercase">
            Learning paths
          </p>
          <h2 className="typo-heading-m md:typo-heading-l text-bs-ink">
            Explore Diverse Learning Paths at ByteSpace
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {LEARNING_PATHS.map((path) => {
            const Icon = iconMap[path.icon as keyof typeof iconMap] ?? Palette;

            return (
              <article
                key={path.slug}
                className={cn(
                  "group bg-bs-gray-50 hover:shadow-bs-card rounded-xl border border-bs-gray-100 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-bs-blue-200 hover:bg-white md:p-[18px]"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-bs-blue-50 text-bs-blue-800 flex h-12 w-12 items-center justify-center rounded-xl">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="typo-label-l text-bs-ink">{path.name}</p>
                    <p className="text-bs-gray-500 mt-1 text-sm">
                      Curated lessons & growth
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
