import axiosClient from "@/lib/axios/axiosClient";
import { envConfig } from "@/config/envConfig";
import { COURSE_CATEGORIES } from "@/data/categories";
import type { ApiResponse } from "@/types/user";
import type { Category } from "@/types/course";
import { mockResponse } from "./mock";

const categoriesApi = {
  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    if (envConfig.useMockApi) return mockResponse(COURSE_CATEGORIES);

    const res = await axiosClient.get<ApiResponse<Category[]>>("/categories");
    return res.data;
  },
};

export default categoriesApi;
