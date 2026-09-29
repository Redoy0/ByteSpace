import Image from "next/image";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { PLATFORM_STATS } from "@/data/home";
import { Button } from "@/components/ui/button";

export function GrowthSection() {
  return (
    <section className="bg-bs-glow relative overflow-hidden py-16 md:py-20 xl:py-[104px]">
      <div className="layout-container relative z-10">
        <div className="growth-layout grid items-center gap-8 md:gap-10 xl:gap-16">
          <div>
            <p className="text-bs-blue-800 mb-4 text-sm font-semibold tracking-[0.22em] uppercase">
              Professional growth
            </p>
            <h2 className="typo-heading-m md:typo-heading-l text-bs-ink">
              Your Path to Professional
              <br className="hidden sm:block" />
              Growth Starts Here!
            </h2>
            <p className="text-bs-gray-600 mt-4 max-w-xl text-base md:text-lg">
              Learn from expert instructors, build career-ready skills, and turn
              your passion into progress with practical, industry-focused
              lessons.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {PLATFORM_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="shadow-bs-card rounded-2xl bg-white/80 p-4 backdrop-blur-sm"
                >
                  <div className="text-bs-ink text-2xl font-semibold md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-bs-gray-600 mt-1 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                type="button"
                variant="lime"
                size="pill"
                className="gap-2 px-6"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <button
                type="button"
                className="text-bs-ink hover:text-bs-blue-800 inline-flex items-center gap-2 rounded-full border border-bs-gray-200 bg-white px-5 py-3 text-sm font-medium transition-colors hover:border-bs-blue-200"
              >
                <span className="bg-bs-blue-50 text-bs-blue-800 flex h-8 w-8 items-center justify-center rounded-full">
                  <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                </span>
                Watch intro
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-[560px]">
              <div className="bg-bs-lime-300/60 absolute top-10 -left-8 h-40 w-40 rounded-full blur-3xl" />
              <div className="bg-bs-blue-300/40 absolute -right-6 bottom-8 h-36 w-36 rounded-full blur-3xl" />

              <div className="shadow-bs-float relative overflow-hidden rounded-[32px] border border-white/70 bg-white p-4 sm:p-5">
                <div className="bg-bs-gray-50 relative overflow-hidden rounded-[24px]">
                  <Image
                    src="/images/home/learner.png"
                    alt="Learner working through a course"
                    width={620}
                    height={520}
                    priority
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="shadow-bs-card mt-4 flex items-center justify-between gap-4 rounded-2xl bg-white p-3">
                  <div>
                    <p className="text-bs-gray-500 text-sm">Course progress</p>
                    <p className="text-bs-ink mt-1 text-lg font-semibold">
                      78% complete
                    </p>
                  </div>
                  <div className="bg-bs-lime-50 text-bs-ink flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium">
                    <CheckCircle2 className="text-bs-blue-800 h-4 w-4" />
                    On track
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
