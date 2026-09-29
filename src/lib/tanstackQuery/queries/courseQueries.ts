import { queryOptions } from "@tanstack/react-query";
import { APIKit } from "@/helpers/api-kit";
import type { CourseQueryParams } from "@/types/course";

export const courseKeys = {
  all: ["courses"] as const,
  list: (params: CourseQueryParams) => ["courses", "list", params] as const,
  detail: (slug: string) => ["courses", "detail", slug] as const,
  categories: ["categories"] as const,
};

export const coursesQueryOptions = (params: CourseQueryParams) =>
  queryOptions({
    queryKey: courseKeys.list(params),
    queryFn: () => APIKit.courses.getCourses(params),
  });

export const courseQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: courseKeys.detail(slug),
    queryFn: () => APIKit.courses.getCourse(slug),
  });

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: courseKeys.categories,
    queryFn: () => APIKit.categories.getCategories(),
    staleTime: 10 * 60 * 1000,
  });
