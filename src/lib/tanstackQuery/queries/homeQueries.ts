import { queryOptions } from "@tanstack/react-query";
import { APIKit } from "@/helpers/api-kit";

export const testimonialsQueryOptions = () =>
  queryOptions({
    queryKey: ["testimonials"],
    queryFn: () => APIKit.testimonials.getTestimonials(),
    staleTime: 10 * 60 * 1000,
  });
