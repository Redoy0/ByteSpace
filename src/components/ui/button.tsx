import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    loadingText?: string;
    glassEffect?: boolean;
    arrowIcon?: boolean;
  };

const buttonVariants = cva(
  `inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md font-sans text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`,
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-primary hover:text-primary-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // ByteSpace
        // Lifts on hover, presses back down on click (motion-safe only)
        lime: "bg-bs-lime text-bs-ink hover:bg-bs-lime-500 hover:shadow-[0_10px_22px_-10px_rgb(36_37_40/0.45)] active:bg-bs-lime-500 active:shadow-none motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]",
        white: "bg-white text-bs-ink hover:bg-white/90",
        "ghost-light": "text-white hover:bg-white/10",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        // ByteSpace pill buttons
        pill: "h-11 rounded-full px-6 text-base font-normal",
        "pill-md": "h-11.5 rounded-full px-6 text-lg font-normal",
        "pill-lg": "h-12 rounded-full px-7 text-lg font-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const glassSpanStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(153,153,153,0.06) 100%)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  pointerEvents: "none",
  willChange: "transform",
  transform: "translateZ(0)",
  zIndex: 0,
};

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  loadingText,
  disabled,
  glassEffect = false,
  arrowIcon = false,
  children,
  ...props
}: ButtonProps) {
  // Slot requires exactly one React element child — it clones our props
  // (data-slot, className, disabled, etc.) onto that single child, so it
  // can never be handed a Fragment or multiple siblings. asChild therefore
  // can't be combined with loading/glassEffect/arrowIcon (which all need
  // extra sibling markup); it's only valid for the plain pass-through case.
  const isSlot = asChild && !loading && !glassEffect;

  if (isSlot) {
    return (
      <Slot
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(
          buttonVariants({ variant, size }),
          className
        )}
        {...props}
        {...(disabled !== undefined ? { disabled } : {})}
      >
        {children}
      </Slot>
    );
  }

  const arrowIconElement = arrowIcon ? (
    <HugeiconsIcon
      icon={ArrowRight02Icon}
      size={22}
      strokeWidth={1.5}
      className={cn("shrink-0", glassEffect && "relative z-10")}
    />
  ) : null;

  const innerContent = loading ? (
    <>
      <span
        className={cn(
          "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent",
          glassEffect && "relative z-10"
        )}
      />
      {loadingText && (
        <span className={cn(glassEffect && "relative z-10")}>
          {loadingText}
        </span>
      )}
    </>
  ) : glassEffect ? (
    <>
      <span className="relative z-10">{children}</span>
      {arrowIconElement}
    </>
  ) : (
    <>
      {children}
      {arrowIconElement}
    </>
  );

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        buttonVariants({ variant, size }),
        glassEffect && "relative overflow-hidden",
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {glassEffect ? (
        <>
          <span aria-hidden="true" style={glassSpanStyle} />
          {innerContent}
        </>
      ) : (
        innerContent
      )}
    </button>
  );
}

export { Button, buttonVariants };
