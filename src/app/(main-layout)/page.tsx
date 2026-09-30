import { CourseSection } from "@/components/shared/home/CourseSection";
import { CreatorCTASection } from "@/components/shared/home/CreatorCTASection";
import { CreatorSection } from "@/components/shared/home/CreatorSection";
import { GrowthSection } from "@/components/shared/home/GrowthSection";
import { HeroSection } from "@/components/shared/home/hero/HeroSection";
import { LearningPathsSection } from "@/components/shared/home/LearningPathsSection";
import { LogoCloud } from "@/components/shared/home/LogoCloud";
import { TestimonialsSection } from "@/components/shared/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <CourseSection />
      <LearningPathsSection />
      <GrowthSection />
      <CreatorSection />
      <CreatorCTASection />
      <TestimonialsSection />
    </>
  );
}
