import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

interface FormErrorProps {
  children?: Readonly<React.ReactNode>;
  className?: string;
}

export default function FormError({ children, className }: FormErrorProps) {
  return (
    <div
      className={cn(
        "text-destructive flex items-center gap-2 text-sm font-medium",
        className
      )}
    >
      <div className="flex size-8 items-center justify-center">
        <HugeiconsIcon
          icon={AlertCircleIcon}
          size={20}
          color="var(--destructive)"
        />
      </div>

      <p>{children}</p>
    </div>
  );
}
