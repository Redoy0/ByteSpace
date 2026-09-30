import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

/**
 * Per-request QueryClient for Server Components.
 * Used to prefetch data on the server and hand it to the client through
 * <HydrationBoundary>, so API-driven sections stream in without a
 * client-side loading waterfall.
 */
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    })
);
