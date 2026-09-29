"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  categoriesQueryOptions,
  courseQueryOptions,
  coursesQueryOptions,
} from "@/lib/tanstackQuery/queries/courseQueries";
import type { CourseQueryParams } from "@/types/course";

export const useCourses = (params: CourseQueryParams) =>
  useQuery({
    ...coursesQueryOptions(params),
    // Keep showing the previous category while the next one loads
    placeholderData: keepPreviousData,
  });

export const useCourse = (slug: string) =>
  useQuery({ ...courseQueryOptions(slug), enabled: !!slug });

export const useCategories = () => useQuery(categoriesQueryOptions());
