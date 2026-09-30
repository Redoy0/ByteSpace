import Image from "next/image";
import { Glow } from "@/components/shared/decorations/Glow";
import { MOCK_TESTIMONIALS } from "@/data/home";

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="bg-bs-testimonials relative isolate overflow-hidden py-16 md:py-20 xl:pt-18 xl:pb-15"
    >
      <Glow className="-top-[245px] left-[calc(50%+125px)]" />
      <Glow size="md" strong className="-top-[135px] left-[calc(50%-330px)]" />

      <div className="layout-container relative">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-9">
          <h2
            id="testimonials-title"
            className="typo-heading-s md:typo-heading-m lg:typo-heading-s xl:typo-heading-m text-black"
          >
            Discover What Our <br className="hidden sm:block" />
            Community Is Saying
          </h2>
          <p className="typo-body-m sm:typo-body-l text-bs-gray-700">
            At ByteSpace, our vibrant community of learners and creators is at
            the heart of what we do. Hear directly from those who have
            experienced the transformative journey of learning and creating on
            our platform. Explore testimonials that reflect the diverse
            perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-3 xl:mt-18 xl:gap-10">
          {MOCK_TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="group rounded-3xl bg-white p-6 transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_24px_48px_-24px_rgb(0_59_226/0.35)] motion-safe:hover:-translate-y-1.5"
            >
              <figcaption>
                <Image
                  src={testimonial.avatar}
                  alt=""
                  width={80}
                  height={80}
                  className="ring-bs-lime/0 group-hover:ring-bs-lime size-20 rounded-full object-cover ring-4 transition-[box-shadow,scale] duration-300 motion-safe:group-hover:scale-105"
                />
                <p className="typo-heading-xs mt-6 leading-7 text-black">
                  {testimonial.name}
                </p>
                <p className="typo-body-l text-bs-blue-800">
                  {testimonial.role}
                </p>
              </figcaption>
              <blockquote className="typo-body-l text-bs-gray-700 mt-6">
                {`"${testimonial.quote}"`}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
