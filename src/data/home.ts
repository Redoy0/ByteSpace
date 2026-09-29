import type { PlaceholderLogoMark } from "@/components/icons/svgIcons";
import type { LearningPath, PlatformStat, Testimonial } from "@/types/home";

/**
 * Temporary homepage content. Testimonials are sample copy from the design
 * reference — they are placeholders, not verified customer reviews.
 */

export const LEARNING_PATHS: LearningPath[] = [
  { slug: "design", name: "Design", icon: "design" },
  { slug: "development", name: "Development", icon: "development" },
  { slug: "it-software", name: "IT & Software", icon: "software" },
  { slug: "business", name: "Business", icon: "business" },
  { slug: "marketing", name: "Marketing", icon: "marketing" },
  { slug: "photography", name: "Photography", icon: "photography" },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: "/images/testimonials/sarah.webp",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    id: "t2",
    name: "James L.",
    role: "Lifelong Learner",
    avatar: "/images/testimonials/james.webp",
    quote:
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
  },
  {
    id: "t3",
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: "/images/testimonials/alex.webp",
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
  },
];

/**
 * Placeholder platform figures from the design reference.
 * TODO: replace with real numbers from the API before launch.
 */
export const PLATFORM_STATS: PlatformStat[] = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

export const HAPPY_STUDENT_AVATARS = Array.from(
  { length: 7 },
  (_, i) => `/images/avatars/learner-${i + 1}.png`
);

export const CREATOR_FEATURES = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

/** Floating cards in the hero — illustrative sample figures from the design. */
export const HERO_HIGHLIGHTS = {
  category: {
    title: "UI/UX Design",
    courses: "200 Courses",
    students: "1000+ Students",
  },
  learningProgress: 55,
  happyStudents: {
    rating: 4.5,
    reviews: 240,
    total: "2K+",
    totalLabel: "Over 2,000 happy students",
  },
};

/**
 * Logo strip — generic placeholders from the design. Replace with real
 * partner logos (name + image) once partnerships exist; never present these
 * as actual ByteSpace partners.
 */
export const PLACEHOLDER_LOGOS: PlaceholderLogoMark[] = [
  "wave",
  "sun",
  "bolt",
  "clover",
  "rings",
];
