import Image from "next/image";
import { HappyStudentsCard } from "@/components/shared/cards/StatCards";
import { CourseCard } from "@/components/shared/home/CourseCard";
import { AUTH_SHOWCASE_COURSES } from "@/data/auth";
import { HAPPY_STUDENT_AVATARS, HERO_HIGHLIGHTS } from "@/data/home";
import { cn } from "@/lib/utils";

const DONUT = "/images/decorations/white-donut.png";

/*
 * Left-hand collage on the sign-in / sign-up pages (ui/Login.png): two course
 * cards, the Happy Students card and 3D shapes, positioned in design px
 * inside a 496×557 box. Purely decorative, so it's hidden from assistive
 * tech and inert (the cards' links and buttons can't be reached).
 */
export function AuthIllustration({ className }: { className?: string }) {
  const [backCourse, frontCourse] = AUTH_SHOWCASE_COURSES;

  return (
    <div
      aria-hidden="true"
      inert
      className={cn(
        "pointer-events-none relative h-[557px] w-[496px] select-none",
        className
      )}
    >
      <CourseCard
        course={backCourse}
        variant="showcase"
        priority
        className="absolute top-[90px] left-0 w-[373px]"
      />
      <CourseCard
        course={frontCourse}
        variant="showcase"
        priority
        className="absolute top-0 left-[111px] w-[373px]"
      />
      <HappyStudentsCard
        avatars={HAPPY_STUDENT_AVATARS}
        {...HERO_HIGHLIGHTS.happyStudents}
        variant="lime"
        className="absolute top-[435px] left-[226px]"
      />

      <Image
        src="/images/decorations/white-spring-sm.png"
        alt=""
        width={116}
        height={122}
        priority
        className="absolute top-[350px] left-[378px]"
      />

      {/* No lime ring asset yet: the white donut, tinted lime with its shading kept */}
      <div className="absolute top-10 left-[50px] isolate h-[93px] w-[101px]">
        <div
          className="bg-bs-lime absolute inset-0"
          style={{ mask: `url(${DONUT}) center / contain no-repeat` }}
        />
        <Image
          src={DONUT}
          alt=""
          fill
          priority
          sizes="101px"
          className="object-contain mix-blend-multiply"
        />
      </div>

      <Image
        src="/images/decorations/lime-pyramid.png"
        alt=""
        width={125}
        height={138}
        priority
        className="absolute top-[419px] left-0"
      />
    </div>
  );
}
