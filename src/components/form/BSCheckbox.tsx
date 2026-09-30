import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  showOptionalSign?: boolean;
  link?: URL;
  appTermsLink?: string;
}

export default function BSCheckbox({
  name,
  label,
  className,
  labelClassName,
  showOptionalSign = false,
  link,
  appTermsLink = "/terms-and-conditions",
}: CheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row items-center space-y-0 space-x-3">
            <FormControl>
              <Checkbox
                className={className}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>

            <FormLabel
              className={cn("font-lufga leading-none", labelClassName)}
            >
              {label ===
              "Agree App Terms & conditions & School Terms & conditions" ? (
                <div className="font-sans text-base text-[14px]">
                  <span>I Read & Agree App</span>{" "}
                  <Link
                    href={appTermsLink}
                    className="underline"
                    target="_blank"
                  >
                    Terms & conditions
                  </Link>{" "}
                  {link && (
                    <>
                      <span>& School</span>{" "}
                      <Link href={link} target="_blank" className="underline">
                        Terms & conditions
                      </Link>
                    </>
                  )}
                </div>
              ) : (
                <span>
                  {label}
                  {showOptionalSign && (
                    <span className="ml-1 text-xs text-neutral-500">
                      (Optional)
                    </span>
                  )}
                </span>
              )}
            </FormLabel>
          </div>

          <FormMessage
            className="ml-6 inline-block"
            style={{ marginTop: 4, paddingInline: 4 }}
          />
        </FormItem>
      )}
    />
  );
}
