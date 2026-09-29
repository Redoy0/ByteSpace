import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ByteSpaceLogo } from "@/components/icons/svgIcons";

export default function NotFound() {
  return (
    <main className="bg-bs-grid flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <ByteSpaceLogo tone="light" className="mb-10" />
      <p className="font-heading text-bs-lime text-7xl font-bold md:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-white/80">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Button variant="lime" size="pill" className="mt-8" asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
