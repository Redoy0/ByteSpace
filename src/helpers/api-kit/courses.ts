import axiosClient from "@/lib/axios/axiosClient";
import { envConfig } from "@/config/envConfig";
import { normalizeQueryParams } from "@/lib/query-params";
import { MOCK_COURSES } from "@/data/courses";
import type { ApiResponse } from "@/types/user";
import type {
  Course,
  CourseQueryParams,
  PaginatedResponse,
} from "@/types/course";
import { mockResponse } from "./mock";

const DEFAULT_LIMIT = 6;

const queryMockCourses = async ({
  category = "featured",
  searchTerm,
  page = 1,
  limit = DEFAULT_LIMIT,
}: CourseQueryParams): Promise<PaginatedResponse<Course>> => {
  const term = searchTerm?.trim().toLowerCase();
  const filtered = MOCK_COURSES.filter((course) =>
    category === "featured" ? course.isFeatured : course.category === category
  ).filter(
    (course) =>
      !term ||
      course.title.toLowerCase().includes(term) ||
      course.creator.name.toLowerCase().includes(term)
  );

  const start = (page - 1) * limit;
  const { success, message, data } = await mockResponse(
    filtered.slice(start, start + limit)
  );
  return {
    success,
    message,
    data,
    meta: { page, limit, total: filtered.length },
  };
};

const coursesApi = {
  getCourses: async (
    params: CourseQueryParams = {}
  ): Promise<PaginatedResponse<Course>> => {
    if (envConfig.useMockApi) return queryMockCourses(params);

    const res = await axiosClient.get<PaginatedResponse<Course>>("/courses", {
      params: normalizeQueryParams({ limit: DEFAULT_LIMIT, ...params }),
    });
    return res.data;
  },

  getCourse: async (slug: string): Promise<ApiResponse<Course>> => {
    if (envConfig.useMockApi) {
      const course = MOCK_COURSES.find((c) => c.slug === slug);
      return course
        ? mockResponse(course)
        : { success: false, message: "Course not found" };
    }

    const res = await axiosClient.get<ApiResponse<Course>>(`/courses/${slug}`);
    return res.data;
  },
};

export default coursesApi;
