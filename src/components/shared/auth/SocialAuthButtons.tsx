"use client";

import { toast } from "sonner";
import { FacebookIcon, GoogleIcon } from "@/components/icons/svgIcons";

const PROVIDERS = [
  { name: "Facebook", Icon: FacebookIcon },
  { name: "Google", Icon: GoogleIcon },
];

// There's no social sign-in on the backend yet, so these only say so.
export function SocialAuthButtons() {
  return (
    <div className="mt-12 lg:mt-19">
      <div className="typo-body-m text-bs-gray-400 flex items-center gap-3">
        <span className="bg-bs-gray-200 h-px flex-1" />
        or
        <span className="bg-bs-gray-200 h-px flex-1" />
      </div>

      <div className="mt-8 flex justify-center gap-4 lg:mt-10">
        {PROVIDERS.map(({ name, Icon }) => (
          <button
            key={name}
            type="button"
            aria-label={`Continue with ${name}`}
            onClick={() => toast.info(`${name} sign-in isn't available yet.`)}
            className="hover:bg-bs-gray-50 focus-visible:outline-bs-blue-800 flex size-18 items-center justify-center rounded-3xl border border-(--bs-gray-200) text-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Icon className="size-10" />
          </button>
        ))}
      </div>
    </div>
  );
}
