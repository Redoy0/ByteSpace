import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/providers/Provider";
import { envConfig } from "@/config/envConfig";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["500", "600"],
});

// Satoshi (Fontshare, ITF Free Font License — see src/assets/fonts/FFL.txt)
const satoshi = localFont({
  src: "../assets/fonts/Satoshi-Variable.woff2",
  display: "swap",
  variable: "--font-satoshi",
  weight: "300 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(envConfig.appBaseUrl),
  title: {
    default: "ByteSpace — Learn, Grow & Create",
    template: "%s | ByteSpace",
  },
  description:
    "ByteSpace is an online learning and creator platform. Discover courses across design, development, business and more — or share your expertise by publishing courses of your own.",
  applicationName: "ByteSpace",
  openGraph: {
    type: "website",
    siteName: "ByteSpace",
    title: "ByteSpace — Learn, Grow & Create",
    description:
      "Discover courses, build new skills, and publish your own courses on ByteSpace.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003be2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              /**
               * Chunk Error Recovery
               * 
               * Problem: After deployment, old JS chunk hashes in cached HTML become stale.
               * When users navigate, Next.js tries to load non-existent chunks → ChunkLoadError.
               * 
               * Solution: Detect chunk load failures and perform ONE hard reload to fetch
               * fresh HTML with updated chunk manifest. This runs before React hydration
               * to catch errors as early as possible.
               * 
               * This is the SINGLE source of chunk error recovery. Do not add duplicate
               * recovery logic in React components or error boundaries.
               */
              (function() {
                if (typeof window === "undefined") return;
                
                var RELOAD_KEY = "chunk_recovery_reload_time";
                var isReloading = false;

                function isChunkError(msg) {
                  if (!msg || typeof msg !== "string") return false;
                  var patterns = [
                    "ChunkLoadError",
                    "Loading chunk",
                    "Failed to load chunk",
                    "Loading CSS chunk",
                    "Loading failed for the <script>",
                    "Failed to fetch dynamically imported module",
                    "error loading dynamically imported module",
                    "Importing a module script failed"
                  ];
                  for (var i = 0; i < patterns.length; i++) {
                    if (msg.indexOf(patterns[i]) !== -1) return true;
                  }
                  return false;
                }

                function triggerRecovery(source) {
                  if (isReloading) return;
                  
                  var now = Date.now();
                  var lastReload = sessionStorage.getItem(RELOAD_KEY);
                  
                  // Prevent reload loops: only reload once per 15 seconds
                  if (lastReload && (now - Number(lastReload) < 15000)) {
                    console.warn("[ChunkRecovery] Skipping reload, too soon since last reload");
                    return;
                  }
                  
                  isReloading = true;
                  sessionStorage.setItem(RELOAD_KEY, String(now));
                  console.warn("[ChunkRecovery] Reloading due to:", source);
                  window.location.reload();
                }

                // 1. Catch synchronous script/link load failures
                window.addEventListener("error", function(e) {
                  var target = e.target || e.srcElement;
                  if (target && (target.tagName === "SCRIPT" || target.tagName === "LINK")) {
                    var src = target.src || target.href || "";
                    // Only trigger for Next.js static chunks
                    if (src.indexOf("/_next/static/") !== -1) {
                      triggerRecovery("Static asset failed: " + src);
                      return;
                    }
                  }
                  
                  // 2. Catch error messages containing chunk-related keywords
                  if (e.message && isChunkError(e.message)) {
                    triggerRecovery("Error message: " + e.message);
                  }
                }, true); // Use capture phase to catch early

                // 3. Catch async dynamic import failures (Promise rejections)
                window.addEventListener("unhandledrejection", function(e) {
                  var reason = e.reason;
                  var msg = "";
                  
                  if (reason) {
                    if (typeof reason === "string") {
                      msg = reason;
                    } else if (reason.message) {
                      msg = reason.message;
                    } else if (reason.toString) {
                      msg = reason.toString();
                    }
                  }
                  
                  if (isChunkError(msg)) {
                    if (e.preventDefault) e.preventDefault();
                    triggerRecovery("Unhandled rejection: " + msg);
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${satoshi.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
