"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ByteSpaceLogo } from "@/components/icons/svgIcons";
import { envConfig } from "@/config/envConfig";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Auto-reload for chunk errors is handled by the inline script in layout.tsx.
    // This boundary is for application-level errors that need user action.
    // eslint-disable-next-line no-console
    console.error("App Error Boundary:", error);
  }, [error]);

  return (
    <main className="bg-bs-gray-50 flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <ByteSpaceLogo className="mb-10" />
      <h1 className="text-bs-ink text-3xl font-semibold md:text-4xl">
        Something went wrong
      </h1>
      <p className="text-bs-gray-500 mt-3 max-w-md">
        An unexpected error occurred. Please try again — if the problem
        persists, come back a little later.
      </p>
      {envConfig.isDevlopment && error?.message && (
        <pre className="mt-6 max-h-40 max-w-xl overflow-auto rounded-xl bg-red-50 p-4 text-left text-xs whitespace-pre-wrap text-red-800">
          {error.message}
        </pre>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="lime" size="pill" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="outline" size="pill" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
