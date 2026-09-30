"use client";

import { useQuery } from "@tanstack/react-query";
import { testimonialsQueryOptions } from "@/lib/tanstackQuery/queries/homeQueries";

export const useTestimonials = () => useQuery(testimonialsQueryOptions());
