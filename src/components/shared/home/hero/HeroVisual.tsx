import Image from "next/image";
import {
  CategoryHighlightCard,
  HappyStudentsCard,
  LearningProgressCard,
} from "@/components/shared/cards/StatCards";
import { FadeIn } from "@/components/shared/motion/FadeIn";
import { HAPPY_STUDENT_AVATARS, HERO_HIGHLIGHTS } from "@/data/home";
import { cn } from "@/lib/utils";

/*
 * The stage is the student's bounding box. The lime arc and floating cards
 * are positioned in % of it, so the whole composition resizes by changing
 * --w; --k scales the cards to match.
 *
 * No transforms/z-index on the stage itself: the arc, the section's 3D
 * decorations, the student and the cards must share one stacking context
 * (arc < decorations < student < cards).
 */
const stage = "relative mx-auto aspect-[1019/950] hero-visual";

const cardSlot = "absolute z-[3] origin-top-left hero-card";

export function HeroVisual({ className }: { className?: string }) {
  const { category, learningProgress, happyStudents } = HERO_HIGHLIGHTS;

  return (
    <div className={cn(stage, className)}>
      {/* Lime arc: a large circle behind the student, cut off by the section */}
      <div
        aria-hidden="true"
        className="bg-bs-lime-500 absolute top-[7.37%] left-[-67.71%] z-0 aspect-square w-[225.7%] rounded-full"
      />

      <Image
        src="/images/home/learner.png"
        alt="Smiling student wearing headphones and holding a laptop"
        width={1019}
        height={950}
        priority
        sizes="(min-width: 1024px) 510px, (min-width: 768px) 440px, (min-width: 640px) 380px, 290px"
        className="absolute inset-0 z-[2] h-full w-full"
      />

      <FadeIn
        onMount
        delay={0.2}
        className={cn(cardSlot, "top-[18.95%] left-[-18.74%] hidden sm:block")}
      >
        <CategoryHighlightCard
          title={category.title}
          meta={[category.courses, category.students]}
        />
      </FadeIn>

      <FadeIn
        onMount
        delay={0.35}
        className={cn(
          cardSlot,
          "top-[40%] left-[48%] sm:top-[21.58%] sm:left-[67.22%]"
        )}
      >
        <LearningProgressCard value={learningProgress} />
      </FadeIn>

      <FadeIn
        onMount
        delay={0.5}
        className={cn(cardSlot, "top-[60.63%] left-[-18%] sm:left-[-33.56%]")}
      >
        <HappyStudentsCard avatars={HAPPY_STUDENT_AVATARS} {...happyStudents} />
      </FadeIn>
    </div>
  );
}
