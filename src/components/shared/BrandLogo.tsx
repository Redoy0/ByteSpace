import Image from "next/image";
import { cn } from "@/lib/utils";

const SRC = {
  /** Dark wordmark, for light backgrounds. */
  dark: "/logo/logo_black.png",
  /** Light wordmark, for the blue hero / dark backgrounds. */
  light: "/logo/logo.png",
} as const;

/**
 * ByteSpace logo from public/logo. The files are 171×37 with the artwork in
 * the top 34px, so at the default height it lines up like the 34px SVG did.
 */
export function BrandLogo({
  tone = "dark",
  className,
  priority = false,
}: {
  tone?: keyof typeof SRC;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SRC[tone]}
      alt="ByteSpace"
      width={171}
      height={37}
      priority={priority}
      className={cn("h-[37px] w-auto", className)}
    />
  );
}
