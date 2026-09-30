import type { Course } from "@/types/course";
import { MOCK_COURSES } from "./courses";

/**
 * Sample cards in the sign-in / sign-up illustration (ui/Login.png): the
 * back card, then the front card. Decorative only — not a live catalogue.
 */
export const AUTH_SHOWCASE_COURSES: Course[] = [
  "build-digital-asset",
  "the-power-of-big-data",
].map((slug) => {
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  if (!course) throw new Error(`Missing showcase course: ${slug}`);
  return course;
});
