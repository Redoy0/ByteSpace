/**
 * Initial ByteSpace domain models.
 * TODO: align field names with the backend contract once it is available.
 */

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface CreatorSummary {
  name: string;
  slug: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  creator: CreatorSummary;
  /** Category slug */
  category: string;
  level: CourseLevel;
  rating: number;
  lessonCount: number;
  durationMinutes: number;
  commentCount: number;
  price: number;
  originalPrice?: number;
  /** e.g. "lifetime" access */
  priceUnit: string;
  learnerCount: number;
  /** A few learner avatars shown on the card */
  learnerAvatars: string[];
  isFeatured?: boolean;
}

export interface Category {
  slug: string;
  name: string;
}

export interface CourseQueryParams {
  /** Category slug, or "featured" */
  category?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
