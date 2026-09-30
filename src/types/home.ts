export type LearningPathIcon =
  | "design"
  | "development"
  | "software"
  | "business"
  | "marketing"
  | "photography";

export interface LearningPath {
  slug: string;
  name: string;
  icon: LearningPathIcon;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export interface PlatformStat {
  label: string;
  value: string;
}
