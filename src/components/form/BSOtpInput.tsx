import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import React from "react";
import { useFormContext } from "react-hook-form";

interface UInputProps extends React.ComponentProps<"input"> {
  name: string;
  label?: string;
  maxLength?: number;
}

const BSOtpInput = ({
  label,
  name,
  className,
  disabled,
  maxLength = 6,
}: UInputProps) => {
  const { control } = useFormContext() ?? {};

  return (
    <>
      <style jsx>{`
        .otp-error-state [data-slot]:focus {
          --tw-ring-width: 0px !important;
          --tw-ring-color: transparent !important;
          --tw-ring-offset-width: 0px !important;
          box-shadow: none !important;
        }
      `}</style>
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FormItem className="w-full">
            {label && <FormLabel className="text-gray-900">{label}</FormLabel>}

            <FormControl>
              <div className="flex">
                <InputOTP
                  disabled={disabled}
                  className={`${className} flex justify-center ${error?.message ? "otp-error-state" : ""}`}
                  maxLength={maxLength}
                  pattern={REGEXP_ONLY_DIGITS}
                  autoFocus
                  {...field}
                >
                  <InputOTPGroup className="gap-2 sm:gap-3">
                    {Array.from({ length: maxLength }, (_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className={`h-11 w-11 rounded-lg border-2 text-base transition-all duration-300 ease-in-out focus:outline-none sm:h-12 sm:w-12 sm:text-lg ${
                          error?.message
                            ? "border-red-500 focus:border-red-500 focus:ring-0"
                            : "border-[#e0e0e0] focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]"
                        }`}
                        aria-invalid={!!error?.message}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </FormControl>
            <FormDescription className="sr-only">
              Please enter the one-time password.
            </FormDescription>
            <FormMessage className="mt-2 text-center text-sm text-red-600 md:text-start" />
          </FormItem>
        )}
      />
    </>
  );
};

BSOtpInput.displayName = "BSOtpInput";

export default BSOtpInput;
