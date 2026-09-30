import axiosClient from "@/lib/axios/axiosClient";
import { envConfig } from "@/config/envConfig";
import { MOCK_TESTIMONIALS } from "@/data/home";
import type { ApiResponse } from "@/types/user";
import type { Testimonial } from "@/types/home";
import { mockResponse } from "./mock";

const testimonialsApi = {
  getTestimonials: async (): Promise<ApiResponse<Testimonial[]>> => {
    if (envConfig.useMockApi) return mockResponse(MOCK_TESTIMONIALS);

    const res =
      await axiosClient.get<ApiResponse<Testimonial[]>>("/testimonials");
    return res.data;
  },
};

export default testimonialsApi;
