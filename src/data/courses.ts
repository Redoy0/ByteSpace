import type { Course } from "@/types/course";

/**
 * Temporary mock course catalogue used while the backend is unavailable.
 * Served through APIKit.courses — UI components never import this directly.
 */

const LEARNERS = [
  "/images/avatars/learner-2.png",
  "/images/avatars/learner-1.png",
  "/images/avatars/learner-3.png",
  "/images/avatars/learner-4.png",
];

const STUDIO = { name: "purepearl studio", slug: "purepearl-studio" };

const base = {
  creator: STUDIO,
  level: "Beginner",
  rating: 4.5,
  lessonCount: 17,
  durationMinutes: 136,
  commentCount: 59,
  price: 25,
  priceUnit: "lifetime",
  learnerCount: 30,
  learnerAvatars: LEARNERS,
} satisfies Partial<Course>;

export const MOCK_COURSES: Course[] = [
  {
    ...base,
    id: "c1",
    slug: "learn-figma-from-basic",
    title: "Learn Figma from Basic",
    thumbnail: "/images/courses/course-1.webp",
    category: "ui-ux-design",
    isFeatured: true,
  },
  {
    ...base,
    id: "c2",
    slug: "build-digital-asset",
    title: "Build Digital Asset",
    thumbnail: "/images/courses/course-2.webp",
    category: "graphic-design",
    isFeatured: true,
  },
  {
    ...base,
    id: "c3",
    slug: "the-power-of-big-data",
    title: "the Power of Big Data",
    thumbnail: "/images/courses/course-3.webp",
    category: "data-science",
    isFeatured: true,
  },
  {
    ...base,
    id: "c4",
    slug: "balancing-productivity-and-wellbeing",
    title: "Balancing Productivity and Wellbeing",
    thumbnail: "/images/courses/course-4.webp",
    category: "productivity",
    isFeatured: true,
  },
  {
    ...base,
    id: "c5",
    slug: "mastering-money-management",
    title: "Mastering Money Management",
    thumbnail: "/images/courses/course-5.webp",
    category: "finance",
    isFeatured: true,
  },
  {
    ...base,
    id: "c6",
    slug: "from-idea-to-startup-success",
    title: "From Idea to Startup Success",
    thumbnail: "/images/courses/course-6.webp",
    category: "freelance-entrepreneurship",
    isFeatured: true,
  },
  {
    ...base,
    id: "c7",
    slug: "design-systems-in-practice",
    title: "Design Systems in Practice",
    thumbnail: "/images/courses/course-1.webp",
    category: "ui-ux-design",
    level: "Intermediate",
    price: 39,
    originalPrice: 59,
  },
  {
    ...base,
    id: "c8",
    slug: "iconography-for-product-designers",
    title: "Iconography for Product Designers",
    thumbnail: "/images/courses/course-2.webp",
    category: "ui-ux-design",
    price: 19,
  },
  {
    ...base,
    id: "c9",
    slug: "dashboards-that-tell-a-story",
    title: "Dashboards That Tell a Story",
    thumbnail: "/images/courses/course-3.webp",
    category: "data",
    level: "Intermediate",
  },
  {
    ...base,
    id: "c10",
    slug: "modern-web-development-workspace",
    title: "Set Up a Modern Web Dev Workspace",
    thumbnail: "/images/courses/course-4.webp",
    category: "web-development",
  },
  {
    ...base,
    id: "c11",
    slug: "marketing-analytics-essentials",
    title: "Marketing Analytics Essentials",
    thumbnail: "/images/courses/course-5.webp",
    category: "marketing",
    price: 29,
    originalPrice: 45,
  },
  {
    ...base,
    id: "c12",
    slug: "running-creative-workshops",
    title: "Running Creative Workshops",
    thumbnail: "/images/courses/course-6.webp",
    category: "coaching",
  },
];
