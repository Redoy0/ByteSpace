import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  allowedDevOrigins: ["*"],

  experimental: {
    // Next 16.1 persists Turbopack's dev cache to disk by default. Tailwind v4
    // generates CSS by scanning source files that Turbopack doesn't track as
    // dependencies, so a warm restart could replay an old globals.css build
    // with newer classes missing (half-styled page). Rebuild in memory instead.
    turbopackFileSystemCacheForDev: false,
  },

  async headers() {
    // Production only: `next dev` serves chunks under stable (non content-
    // hashed) names, so "immutable" would pin a stale globals.css in the
    // browser cache for a year (page renders half-styled until hard reload).
    const cacheHeaders =
      process.env.NODE_ENV === "production"
        ? [
            // Critical: Prevent HTML pages from being cached with stale chunk hashes
            // This ensures browsers always fetch fresh HTML after deployment
            {
              source: "/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value:
                    "no-store, no-cache, must-revalidate, proxy-revalidate",
                },
              ],
            },
            // Immutable caching for hashed static chunks - safe because filenames change on each build
            {
              source: "/_next/static/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
          ]
        : [];

    return [
      ...cacheHeaders,

      // Auth routes
      {
        source: "/(login|register)(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      // Dashboards
      {
        source: "/(student|creator|admin)/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
