"use client";

import { useState } from "react";
import { FEATURED_CATEGORY, VISIBLE_CATEGORY_COUNT } from "@/data/categories";
import { useCategories, useCourses } from "@/hooks/useCourses";
import { cn } from "@/lib/utils";
import { CourseCard } from "./CourseCard";

// From xl the chips break into three fixed rows; plain wrapping would pull
// "Productivity" up onto the second one.
const XL_ROW_BREAKS_AFTER = new Set(["creative-marketing", "photography"]);

const chipClass =
  "mx-2 my-2.5 inline-flex h-11 items-center rounded-full px-4.5 align-top text-base leading-none transition-[background-color,color,box-shadow,translate,scale] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bs-blue-800 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97]";

/** Category chips and the course grid they filter. */
export function CourseBrowser() {
  const [category, setCategory] = useState(FEATURED_CATEGORY.slug);
  const [showAll, setShowAll] = useState(false);

  const { data: categoriesRes } = useCategories();
  const {
    data: coursesRes,
    isError,
    isFetching,
    isPlaceholderData,
  } = useCourses({ category });

  const categories = categoriesRes?.data ?? [];
  const visible = showAll
    ? categories
    : categories.slice(0, VISIBLE_CATEGORY_COUNT);
  const courses = coursesRes?.data ?? [];
  const activeName =
    categories.find((c) => c.slug === category)?.name ?? "this category";

  return (
    <>
      {/* flow-root keeps the chips' negative margin from collapsing into mt */}
      <div className="mt-8 flow-root md:mt-10">
        <div
          role="group"
          aria-label="Course categories"
          className="-my-2.5 text-center leading-none"
        >
          {visible.map((c) => {
            const active = c.slug === category;

            return (
              <span key={c.slug}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c.slug)}
                  className={cn(
                    chipClass,
                    active
                      ? "bg-bs-lime text-bs-ink hover:bg-bs-lime-300 hover:shadow-[0_8px_18px_-8px_rgb(140_180_0/0.8)]"
                      : "bg-bs-gray-50 text-bs-gray-700 hover:bg-bs-lime-50 hover:text-bs-ink hover:shadow-[0_8px_18px_-10px_rgb(36_37_40/0.35)]"
                  )}
                >
                  {c.name}
                </button>
                {XL_ROW_BREAKS_AFTER.has(c.slug) && (
                  <br className="hidden xl:inline" />
                )}
              </span>
            );
          })}

          {categories.length > VISIBLE_CATEGORY_COUNT && (
            <button
              type="button"
              aria-expanded={showAll}
              onClick={() => setShowAll((v) => !v)}
              className="group text-bs-blue-800 hover:text-bs-blue-600 focus-visible:outline-bs-blue-800 mx-2 my-2.5 inline-flex h-11 items-center gap-1 rounded-full align-top text-base leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:rotate-90"
              >
                {showAll ? "−" : "+"}
              </span>
              <span className="underline-offset-4 group-hover:underline">
                {showAll ? "Less" : "More"}
              </span>
            </button>
          )}
        </div>
      </div>

      {isError ? (
        <p className="typo-body-l text-bs-gray-500 mt-12 text-center xl:mt-19">
          We couldn&apos;t load courses right now. Please try again shortly.
        </p>
      ) : courses.length === 0 && !isFetching ? (
        <div className="typo-body-l text-bs-gray-500 mt-12 flex min-h-96 items-center justify-center rounded-3xl border border-dashed border-(--bs-gray-200) px-6 text-center xl:mt-19">
          No {activeName} courses yet. Check back soon!
        </div>
      ) : (
        // Three columns only from xl, where the cards have room
        <div
          aria-busy={isFetching}
          className={cn(
            "mt-12 grid grid-cols-1 gap-6 transition-opacity duration-200 md:grid-cols-2 xl:mt-19 xl:grid-cols-3 xl:gap-10",
            isPlaceholderData && "opacity-60"
          )}
        >
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} priority={i < 3} />
          ))}
        </div>
      )}
    </>
  );
}
