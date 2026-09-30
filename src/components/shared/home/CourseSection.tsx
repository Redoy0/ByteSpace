import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { FEATURED_CATEGORY } from "@/data/categories";
import { getQueryClient } from "@/lib/tanstackQuery/getQueryClient";
import {
  categoriesQueryOptions,
  coursesQueryOptions,
} from "@/lib/tanstackQuery/queries/courseQueries";
import { CourseBrowser } from "./CourseBrowser";

/**
 * "Discover Your Passion" (ui/HomePage.png). The featured courses and the
 * category list are prefetched on the server, so the grid renders without a
 * loading state; picking a category then refetches on the client.
 */
export async function CourseSection() {
  const queryClient = getQueryClient();
  // Prefetch only: a failed request is left for CourseBrowser to report
  const noop = () => {};
  await Promise.all([
    queryClient.query(categoriesQueryOptions()).catch(noop),
    queryClient
      .query(coursesQueryOptions({ category: FEATURED_CATEGORY.slug }))
      .catch(noop),
  ]);

  return (
    <section
      aria-labelledby="courses-title"
      className="bg-white py-14 md:py-20 xl:pt-[72px] xl:pb-[72px]"
    >
      <div className="layout-container">
        <div className="mx-auto max-w-[917px] text-center">
          <h2
            id="courses-title"
            className="typo-heading-s md:typo-heading-m text-[#040819]"
          >
            Discover Your Passion,
            <br />
            Build Your Skills
          </h2>
          <p className="typo-body-m sm:typo-body-l text-bs-gray-400 mt-4">
            At Bytespace Courses, we bring you closer to life-changing
            knowledge. Explore a variety of courses across different fields,
            from technology to the arts, and make a difference in your career
            and life.
          </p>
        </div>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <CourseBrowser />
        </HydrationBoundary>
      </div>
    </section>
  );
}
