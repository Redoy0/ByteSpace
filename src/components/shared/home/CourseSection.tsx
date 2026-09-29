import {
  COURSE_CATEGORIES,
  FEATURED_CATEGORY,
  VISIBLE_CATEGORY_COUNT,
} from "@/data/categories";
import { MOCK_COURSES } from "@/data/courses";
import { cn } from "@/lib/utils";
import { CourseCard } from "./CourseCard";

export function CourseSection() {
  const featured = MOCK_COURSES.filter((course) => course.isFeatured).slice(
    0,
    6
  );

  return (
    <section className="bg-white py-14 md:py-20 xl:pt-[96px] xl:pb-[72px]">
      <div className="layout-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="typo-heading-s md:typo-heading-m text-bs-ink">
            Discover Your Passion,
            <br />
            Build Your Skills
          </h2>
          <p className="text-bs-gray-500 mx-auto mt-4 max-w-3xl text-sm leading-6 md:text-base">
            At Bytespace Courses, we bring you closer to life-changing
            knowledge. Explore a variety of courses across different fields,
            from technology to the arts, and make a difference in your career
            and life.
          </p>
        </div>

        <div
          className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center md:mt-9"
          style={{ columnGap: "8px", rowGap: "10px" }}
        >
          {COURSE_CATEGORIES.slice(0, VISIBLE_CATEGORY_COUNT).map(
            (category) => {
              const active = category.slug === FEATURED_CATEGORY.slug;

              return (
                <button
                  key={category.slug}
                  type="button"
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[11px] leading-4 font-medium transition-colors",
                    active
                      ? "border-bs-lime bg-bs-lime text-bs-ink"
                      : "bg-bs-gray-50 text-bs-gray-700 hover:text-bs-blue-800 border-(--bs-gray-100) hover:border-(--bs-blue-200)"
                  )}
                >
                  {category.name}
                </button>
              );
            }
          )}
          <button
            type="button"
            className="text-bs-blue-800 hover:text-bs-blue-600 rounded-full px-1.5 py-1.5 text-[11px] leading-4 font-medium transition-colors"
          >
            + More
          </button>
        </div>

        {/* 3 columns only from 1280px, where cards reach the design's 373px */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
          {featured.map((course, i) => (
            <CourseCard key={course.id} course={course} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
