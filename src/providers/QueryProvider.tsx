"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface ReactQueryProviderProps {
  children: React.ReactNode;
  /** Server-decoded JWT payload to pre-seed the cache before first render.
   *  Using setQueryData here (not initialData) means the value is a real
   *  cache entry — it respects invalidation and setUser(null) correctly. */
  initialUser?: Record<string, unknown> | null;
}

export default function ReactQueryProvider({
  children,
  initialUser,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          // Keep data fresh for 60 seconds. Without this, staleTime defaults to
          // 0 — every component mount triggers a background refetch, which means
          // the first render always shows the loading skeleton (and images are
          // absent) until the re-fetch completes. With a non-zero staleTime,
          // React Query serves the cached result immediately on re-mount, so
          // images are visible as soon as the component mounts.
          staleTime: 60 * 1000,
        },
      },
    });

    // Pre-seed the cache synchronously so the first render already has auth
    // state. Unlike initialData, setQueryData writes into the real cache, so
    // setUser(null) / invalidateQueries will clear it correctly on logout.
    if (initialUser !== undefined) {
      client.setQueryData(["currentUser"], initialUser ?? null);
    }

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
