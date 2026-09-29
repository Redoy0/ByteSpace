import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarStackProps {
  avatars: string[];
  /** Label for the trailing lime bubble, e.g. "2K+" or "26+". */
  overflowLabel?: string;
  /** Diameter in px. */
  size?: number;
  /** Negative overlap between circles in px. */
  overlap?: number;
  /** Accessible summary, e.g. "Over 2,000 happy students". */
  label: string;
  className?: string;
  /** Typography for the lime count bubble. */
  overflowClassName?: string;
}

/** Overlapping circular avatars ending in a lime count bubble. */
export function AvatarStack({
  avatars,
  overflowLabel,
  size = 43,
  overlap = 16,
  label,
  className,
  overflowClassName = "typo-label-s font-semibold",
}: AvatarStackProps) {
  const circle = { width: size, height: size };

  return (
    <div role="img" aria-label={label} className={cn("flex", className)}>
      {avatars.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={size}
          height={size}
          style={{ ...circle, marginLeft: i === 0 ? 0 : -overlap }}
          className="shrink-0 rounded-full object-cover"
        />
      ))}
      {overflowLabel && (
        <span
          aria-hidden="true"
          style={{ ...circle, marginLeft: avatars.length ? -overlap : 0 }}
          className={cn(
            "bg-bs-lime text-bs-ink flex shrink-0 items-center justify-center rounded-full",
            overflowClassName
          )}
        >
          {overflowLabel}
        </span>
      )}
    </div>
  );
}
