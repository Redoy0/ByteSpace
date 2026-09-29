"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import RequiredSign from "./RequiredSign";

interface BSTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  max?: number;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
  required?: boolean;
  formItemClassName?: string;
  labelClassName?: string;
  showCounter?: boolean;
  showOptionalSign?: boolean;
}

export default function BSTextarea({
  name,
  label,
  max,
  className,
  placeholder,
  disabled,
  formItemClassName,
  required,
  labelClassName,
  showCounter,
  showOptionalSign = false,
  ...props
}: BSTextareaProps) {
  const { control } = useFormContext() ?? {};
  const [remaining, setRemaining] = useState(max);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        if (showCounter) {
          // update remaining characters **directly during onChange**
          const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            field.onChange(e);
            if (showCounter) {
              const len = e.target.value.length;
              setRemaining((max as number) - len);
            }
          };
          return (
            <FormItem className={cn("", formItemClassName)}>
              <FormLabel
                className={cn(
                  "inline-flex items-center gap-0 font-sans",
                  labelClassName
                )}
              >
                <span>{label}</span>
                {required && (
                  <span>
                    <RequiredSign />
                  </span>
                )}
                {showOptionalSign && (
                  <span className="text-xs text-neutral-500">(Optional)</span>
                )}
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    className={cn(
                      "font-lufga min-h-[120px] rounded-[12px]! pr-12 placeholder:text-neutral-400",
                      className
                    )}
                    {...field}
                    {...props}
                    value={field.value || ""}
                    onChange={handleChange}
                    maxLength={max}
                    readOnly={props?.readOnly}
                    disabled={disabled}
                  />
                </FormControl>
                <span className="pointer-events-none absolute right-3 bottom-2 text-sm text-gray-400">
                  {remaining}
                </span>
              </div>
              <FormMessage />
            </FormItem>
          );
        }
        // Default behavior (no word counter)
        return (
          <FormItem className={cn("", formItemClassName)}>
            <FormLabel
              className={cn(
                "inline-flex items-center gap-0 font-sans",
                labelClassName
              )}
            >
              <span>{label}</span>
              {required && (
                <span>
                  <RequiredSign />
                </span>
              )}
              {showOptionalSign && (
                <span className="text-xs text-neutral-500">(Optional)</span>
              )}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className={cn(
                  "font-lufga min-h-[120px] rounded-[12px]! placeholder:text-neutral-400",
                  className
                )}
                {...field}
                {...props}
                maxLength={max}
                readOnly={props?.readOnly}
                disabled={disabled}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
