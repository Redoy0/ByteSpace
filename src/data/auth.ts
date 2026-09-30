import type { Course } from "@/types/course";
import { MOCK_COURSES } from "./courses";

/** Cards shown in the auth-page illustration (back, then front). Decorative only. */
export const AUTH_SHOWCASE_COURSES: Course[] = [
  "build-digital-asset",
  "the-power-of-big-data",
].map((slug) => {
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  if (!course) throw new Error(`Missing showcase course: ${slug}`);
  return course;
});
