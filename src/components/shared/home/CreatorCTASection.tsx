import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CreatorCTASection() {
  return (
    <section className="bg-bs-blue-800 relative overflow-hidden py-16 md:py-20 xl:py-[104px]">
      <div className="absolute inset-0">
        <div className="bg-bs-lime-400/20 absolute top-8 -left-16 h-48 w-48 rounded-full blur-3xl" />
        <div className="bg-bs-lime-300/20 absolute right-8 bottom-8 h-52 w-52 rounded-full blur-3xl" />
        <div className="absolute top-6 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full border border-white/10" />
      </div>

      <div className="layout-container relative z-10">
        <div className="mx-auto max-w-4xl text-center text-white">
          <p className="text-bs-lime-300 mb-4 text-sm font-semibold tracking-[0.2em] uppercase">
            Become a creator
          </p>
          <h2 className="typo-heading-m md:typo-heading-l">
            Unlock Your Potential as a
            <br className="hidden sm:block" />
            Creator with ByteSpace
          </h2>
          <p className="text-bs-gray-100 mx-auto mt-4 max-w-2xl text-base md:text-lg">
            Share your knowledge, build a loyal audience, and grow a thriving
            online learning business with the tools, support, and community
            ByteSpace provides.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              variant="lime"
              size="pill"
              className="text-bs-ink gap-2 px-8"
            >
              Join as Creator
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
