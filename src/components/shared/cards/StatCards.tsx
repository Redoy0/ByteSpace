import { AvatarStack } from "@/components/shared/AvatarStack";
import { StarFilledIcon } from "@/components/icons/svgIcons";
import { cn } from "@/lib/utils";

/*
 * Small white "floating" info cards used over imagery in the hero, growth
 * and creator sections. Sizes follow the design frames (e.g. 208×70,
 * 232×130, 257×120) and they contain only presentational data.
 */

const floatingCard = "rounded-[16px] bg-white text-bs-ink";

interface CategoryHighlightCardProps {
  title: string;
  meta: string[];
  className?: string;
}

/** "UI/UX Design · 200 Courses • 1000+ Students" */
export function CategoryHighlightCard({
  title,
  meta,
  className,
}: CategoryHighlightCardProps) {
  return (
    <div className={cn(floatingCard, "w-[208px] p-4", className)}>
      <p className="typo-label-m">{title}</p>
      <p className="typo-body-xs text-bs-gray-400 mt-0.5 flex items-center gap-1.5 leading-tight">
        {meta.map((item, i) => (
          <span key={item} className="flex items-center gap-1.5">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="size-[3px] rounded-full bg-current"
              />
            )}
            {item}
          </span>
        ))}
      </p>
    </div>
  );
}

interface LearningProgressCardProps {
  value: number;
  label?: string;
  className?: string;
}

/** "Learning Progress 55%" with a lime progress bar. */
export function LearningProgressCard({
  value,
  label = "Learning Progress",
  className,
}: LearningProgressCardProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className={cn(floatingCard, "w-[232px] p-4", className)}>
      <p className="typo-body-s leading-snug">{label}</p>
      <p className="mt-3 text-[44px] leading-none font-bold tracking-tight">
        {pct}%
      </p>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className="bg-bs-gray-50 mt-4 h-2 w-full overflow-hidden rounded-full"
      >
        <div
          className="bg-bs-lime h-full rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface HappyStudentsCardProps {
  avatars: string[];
  rating: number;
  reviews: number;
  total: string;
  totalLabel: string;
  title?: string;
  className?: string;
}

/** "Happy Students 4.5 (240) ★" + avatar stack ending in "2K+". */
export function HappyStudentsCard({
  avatars,
  rating,
  reviews,
  total,
  totalLabel,
  title = "Happy Students",
  className,
}: HappyStudentsCardProps) {
  return (
    <div className={cn(floatingCard, "w-[257px] p-4", className)}>
      <p className="typo-label-m">{title}</p>
      <p className="typo-body-xs mt-0.5 flex items-center gap-1 leading-none">
        <span className="sr-only">Rated</span>
        {rating}
        <span className="text-bs-gray-400">
          ({reviews}
          <span className="sr-only"> reviews</span>)
        </span>
        <StarFilledIcon className="text-bs-lime size-3.5" />
      </p>
      <AvatarStack
        avatars={avatars}
        overflowLabel={total}
        label={totalLabel}
        className="mt-2.5"
      />
    </div>
  );
}
