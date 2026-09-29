import { PlaceholderLogo } from "@/components/icons/svgIcons";
import { PLACEHOLDER_LOGOS } from "@/data/home";

/**
 * Light logo strip under the hero (ui/Landing/Frame 2.png).
 *
 * The logos are placeholders, so the strip is decorative and hidden from
 * assistive tech. When real partner logos arrive, render them as a list of
 * images with the partner name as alt text and drop aria-hidden.
 */
export function LogoCloud() {
  return (
    <section aria-hidden="true" className="bg-bs-gray-50">
      <div className="layout-container py-10 md:py-14 xl:py-20">
        <ul className="text-bs-gray-400 flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:gap-x-5 md:flex-nowrap md:gap-x-7 lg:gap-x-10 xl:gap-x-[70px]">
          {PLACEHOLDER_LOGOS.map((mark) => (
            <li key={mark}>
              <PlaceholderLogo
                mark={mark}
                className="h-6 w-auto md:h-7 lg:h-9 xl:h-[41px]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
