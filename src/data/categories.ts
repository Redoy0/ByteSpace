import type { Category } from "@/types/course";

/** Temporary mock data — replace with APIKit.categories once the API exists. */
export const FEATURED_CATEGORY: Category = {
  slug: "featured",
  name: "Featured",
};

export const COURSE_CATEGORIES: Category[] = [
  FEATURED_CATEGORY,
  { slug: "music", name: "Music" },
  { slug: "drawing-painting", name: "Drawing & Painting" },
  { slug: "marketing", name: "Marketing" },
  { slug: "animation", name: "Animation" },
  { slug: "social-media", name: "Social Media" },
  { slug: "ui-ux-design", name: "UI/UX Design" },
  { slug: "creative-marketing", name: "Creative Marketing" },
  { slug: "digital-illustration", name: "Digital Illustration" },
  { slug: "film-video", name: "Film & Video" },
  { slug: "crafts", name: "Crafts" },
  { slug: "freelance-entrepreneurship", name: "Freelance & Entrepreneurship" },
  { slug: "graphic-design", name: "Graphic Design" },
  { slug: "photography", name: "Photography" },
  { slug: "productivity", name: "Productivity" },
  { slug: "web-development", name: "Web Development" },
  { slug: "data-science", name: "Data Science" },
  { slug: "cooking", name: "Cooking" },
  // Revealed by "+ More"
  { slug: "finance", name: "Finance" },
  { slug: "coaching", name: "Coaching" },
  { slug: "data", name: "Data" },
  { slug: "writing", name: "Writing" },
];

/** How many categories are visible before "+ More" is pressed. */
export const VISIBLE_CATEGORY_COUNT = 18;
