import Image from "next/image";
import { HappyStudentsCard } from "@/components/shared/cards/StatCards";
import { CourseCard } from "@/components/shared/home/CourseCard";
import { AUTH_SHOWCASE_COURSES } from "@/data/auth";
import { HAPPY_STUDENT_AVATARS, HERO_HIGHLIGHTS } from "@/data/home";
import { cn } from "@/lib/utils";

const DONUT = "/images/decorations/white-donut.png";

/*
 * Decorative collage beside the auth forms: two course cards, the Happy
 * Students card and a few 3D shapes, absolutely positioned in a fixed box.
 * Hidden from assistive tech and inert, so the cards' links can't be focused.
 * Each piece drops in on a stagger, then keeps floating.
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
        className="motion-safe:animate-drop-float absolute top-[90px] left-0 w-[373px]"
      />
      <CourseCard
        course={frontCourse}
        variant="showcase"
        priority
        className="motion-safe:animate-drop-float absolute top-0 left-[111px] w-[373px] [--delay:0.12s]"
      />
      <HappyStudentsCard
        avatars={HAPPY_STUDENT_AVATARS}
        {...HERO_HIGHLIGHTS.happyStudents}
        variant="lime"
        className="motion-safe:animate-drop-float absolute top-[435px] left-[226px] [--delay:0.24s]"
      />

      <Image
        src="/images/decorations/white-spring-sm.png"
        alt=""
        width={116}
        height={122}
        priority
        className="motion-safe:animate-drop-bob absolute top-[350px] left-[378px] [--delay:0.4s]"
      />

      {/* No lime ring asset yet: the white donut, tinted lime with its shading kept */}
      <div className="motion-safe:animate-drop-bob absolute top-10 left-[50px] isolate h-[93px] w-[101px] [--delay:0.32s]">
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
        className="motion-safe:animate-drop-bob absolute top-[419px] left-0 [--delay:0.48s]"
      />
    </div>
  );
}
