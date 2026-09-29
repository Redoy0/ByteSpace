import Image from "next/image";
import { Star } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/data/home";

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 md:py-20 xl:py-[104px]">
      <div className="layout-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-bs-blue-800 mb-4 text-sm font-semibold tracking-[0.22em] uppercase">
            Community feedback
          </p>
          <h2 className="typo-heading-m md:typo-heading-l text-bs-ink">
            Discover What Our
            <br className="hidden sm:block" />
            Community Is Saying
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {MOCK_TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-bs-gray-50 shadow-bs-card rounded-2xl border border-bs-gray-100 p-5 md:p-6"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-bs-gray-200 bg-white">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-bs-ink font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-bs-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="text-bs-lime-700 mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={`${testimonial.id}-${index}`}
                    className="h-4 w-4 fill-current"
                  />
                ))}
              </div>

              <p className="text-bs-gray-700 mt-4 text-base leading-7">
                “{testimonial.quote}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
