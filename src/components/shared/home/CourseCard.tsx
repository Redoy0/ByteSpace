import Image from "next/image";
import Link from "next/link";
import { AvatarStack } from "@/components/shared/AvatarStack";
import { BookmarkButton } from "@/components/shared/cards/BookmarkButton";
import { LevelBarsIcon, StarRoundedIcon } from "@/components/icons/svgIcons";
import { PUBLIC_ROUTES } from "@/constant/routes";
import { cn } from "@/lib/utils";
import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  className?: string;
  /** Eager-load the thumbnail (first row above the fold). */
  priority?: boolean;
  /** "showcase": the auth-page illustration's colours (lime star, dark count bubble). */
  variant?: "default" | "showcase";
}

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return [h && `${h} ${h === 1 ? "hour" : "hours"}`, m && `${m} mins`]
    .filter(Boolean)
    .join(" ");
};

/*
 * Course card — ui/Landing/Frame 8.png (373×384 at 1440px).
 * 24px radius, 1px gray-200 border, 16px inset; 341×196 thumbnail with
 * frosted meta pills; Poppins title; level pill + learner avatars; price.
 */
export function CourseCard({
  course,
  className,
  priority,
  variant = "default",
}: CourseCardProps) {
  const showcase = variant === "showcase";
  const avatars = course.learnerAvatars.slice(0, 4);
  const more = Math.max(0, course.learnerCount - avatars.length);
  const meta = [
    `${course.lessonCount} Lessons`,
    formatDuration(course.durationMinutes),
    `${course.commentCount} Comments`,
  ];

  return (
    <article
      className={cn(
        "group hover:shadow-bs-card relative flex flex-col rounded-[24px] border border-(--bs-gray-200) bg-white p-[15px] pb-5 transition-shadow duration-200",
        className
      )}
    >
      <div className="relative aspect-[341/195.5] overflow-hidden rounded-[12px]">
        <Image
          src={course.thumbnail}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 341px, (min-width: 768px) 46vw, 92vw"
          className="object-cover"
        />
        <ul
          aria-label="Course details"
          className="absolute right-3 bottom-5 left-3 flex gap-2 xl:gap-3"
        >
          {meta.map((item) => (
            <li
              key={item}
              className="text-bs-gray-700 flex h-[25.5px] items-center rounded-full bg-white/55 px-2.5 text-xs whitespace-nowrap backdrop-blur-sm xl:px-[13px]"
            >
              {item}
            </li>
          ))}
        </ul>
        <BookmarkButton
          courseTitle={course.title}
          className="absolute top-3 right-3 z-10"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <h3 className="typo-heading-xs min-w-0 truncate text-black">
          {/* Stretched link: the whole card opens the course */}
          <Link
            href={`${PUBLIC_ROUTES.courses}/${course.slug}`}
            className="focus-visible:outline-bs-blue rounded-sm after:absolute after:inset-0 after:rounded-[24px] focus-visible:outline-2"
          >
            {course.title}
          </Link>
        </h3>
        <p className="text-bs-gray-700 mt-[5px] mr-[3px] flex shrink-0 items-center gap-[3px] text-[17px] leading-none">
          <span className="sr-only">Rated</span>
          {course.rating.toFixed(1)}
          <StarRoundedIcon
            className={cn(
              "size-5",
              showcase ? "text-bs-lime" : "text-bs-gray-200"
            )}
          />
        </p>
      </div>

      <p className="typo-body-xs text-bs-gray-700 -mt-px">
        by <span className="text-bs-blue">{course.creator.name}</span>
      </p>

      <div className="mt-4 flex items-center gap-3">
        <span className="bg-bs-gray-50 text-bs-gray-700 flex h-8 items-center gap-2 rounded-full pr-[14px] pl-4 text-xs">
          <LevelBarsIcon className="h-[13px] w-3" />
          {course.level}
        </span>
        <AvatarStack
          avatars={avatars}
          size={32}
          overlap={8}
          overflowLabel={`${more}+`}
          overflowClassName={cn(
            "text-[11px] font-medium",
            showcase && "bg-bs-ink text-white"
          )}
          label={`${course.learnerCount} learners enrolled`}
        />
      </div>

      <p className="mt-[18px] flex items-baseline">
        <span className="text-bs-blue text-xl leading-none font-bold">
          ${course.price}
        </span>
        <span className="typo-body-xs text-bs-gray-700">
          /{course.priceUnit}
        </span>
      </p>
    </article>
  );
}
