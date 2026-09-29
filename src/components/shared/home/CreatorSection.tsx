import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { CREATOR_FEATURES } from "@/data/home";

export function CreatorSection() {
  return (
    <section className="bg-bs-glow py-12 md:py-16 xl:pb-[104px]">
      <div className="layout-container">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-16">
          <div className="lg:order-2">
            <p className="text-bs-blue-800 mb-4 text-sm font-semibold tracking-[0.22em] uppercase">
              For creators
            </p>
            <h2 className="typo-heading-m md:typo-heading-l text-bs-ink">
              Create &amp; Manage
              <br className="hidden sm:block" />
              Courses Easily.
            </h2>
            <p className="text-bs-gray-600 mt-4 max-w-xl text-base md:text-lg">
              Build your teaching brand, publish engaging learning experiences,
              and turn your expertise into a sustainable income stream without
              extra hassle.
            </p>

            <ul className="mt-8 space-y-4">
              {CREATOR_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="bg-bs-lime text-bs-ink flex h-8 w-8 items-center justify-center rounded-full">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="typo-label-m text-bs-ink">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:order-1">
            <div className="bg-bs-lime-200/70 absolute top-6 -left-4 h-24 w-24 rounded-full blur-2xl" />
            <div className="bg-bs-blue-200/60 absolute -right-8 bottom-2 h-28 w-28 rounded-full blur-2xl" />

            <div className="relative mx-auto max-w-[520px]">
              <Image
                src="/images/home/creator.png"
                alt="Creator working on a course"
                width={700}
                height={560}
                priority
                className="h-auto w-full object-contain drop-shadow-[0_24px_24px_rgba(7,30,95,0.18)]"
              />
              <div className="bg-bs-blue-800 shadow-bs-card absolute top-1/4 left-0 rounded-lg px-3 py-2 text-white">
                <p className="text-bs-blue-100 text-[10px] font-medium">
                  Total Revenue
                </p>
                <p className="mt-1 text-sm font-semibold">$1,200.38</p>
              </div>
              <div className="shadow-bs-card absolute right-0 bottom-1/4 rounded-lg bg-white px-3 py-2">
                <p className="text-bs-gray-500 text-[10px] font-medium">
                  Happy Students
                </p>
                <p className="text-bs-ink mt-1 text-sm font-semibold">2K+</p>
              </div>
            </div>

            <div className="shadow-bs-card absolute -bottom-4 left-6 flex items-center gap-2.5 rounded-full bg-white px-3.5 py-2">
              <span className="bg-bs-lime text-bs-ink flex h-8 w-8 items-center justify-center rounded-full">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <div className="text-bs-ink text-sm font-semibold">
                  Creator growth
                </div>
                <div className="text-bs-gray-500 text-xs">+32% in 3 months</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
