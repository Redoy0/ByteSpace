"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  isPhoneNumberField,
  modifyFormNumberInput,
  modifyPhoneNumberInput,
} from "@/utils/modifyFormNumberInput";
import { InputMask, Replacement } from "@react-input/mask";
import React, { JSX } from "react";
import { useFormContext } from "react-hook-form";
import RequiredSign from "./RequiredSign";
import PasswordEyeReverse from "@/components/ui/password-eye-reverse";

interface UInputProps extends React.ComponentProps<"input"> {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  labelClassName?: string;
  loading?: boolean;
  max?: number;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  mask?: string;
  maskReplacement?: string | Replacement;
  helperText?: string;
  variant?: "primary" | null;
  forgetPassButton?: React.ReactNode;
  showRequiredSign?: boolean;
  showOptionalSign?: boolean;
  prefixIcon?: JSX.Element;
  suffix?: React.ReactNode;
  errorMessageWidth?: string;
  hideMessage?: boolean;
  isUpperCase?: boolean;
}

const BSInput = React.forwardRef<HTMLInputElement, UInputProps>(
  (
    {
      loading,
      type = "text",
      label,
      placeholder,
      name,
      accept,
      className,
      disabled,
      max,
      readOnly,
      labelClassName,
      showPassword = false,
      setShowPassword,
      mask,
      maskReplacement,
      helperText,
      forgetPassButton,
      showRequiredSign = false,
      showOptionalSign = false,
      prefixIcon,
      suffix,
      errorMessageWidth,
      hideMessage,
      isUpperCase = false,
      autoComplete,
    }: UInputProps,
    ref
  ) => {
    const { control, setValue } = useFormContext() ?? {};
    const shouldFormatPhoneNumber = isPhoneNumberField(name);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <FormItem className="w-full gap-2 font-sans">
            {label && (
              <FormLabel
                className={cn(
                  "inline-flex items-center gap-0 font-sans",
                  labelClassName
                )}
              >
                <span>{label}</span>
                {showRequiredSign && (
                  <span>
                    <RequiredSign />
                  </span>
                )}
                {showOptionalSign && (
                  <span className="text-xs text-neutral-500">(Optional)</span>
                )}
              </FormLabel>
            )}

            <FormControl>
              {type === "password" ? (
                <div className="relative">
                  {prefixIcon && (
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
                      {prefixIcon}
                    </div>
                  )}
                  <Input
                    className={cn(
                      "border-input focus-visible:ring-ring h-10 w-full rounded-[8px] border bg-transparent px-4 text-base placeholder:text-neutral-400 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
                      setShowPassword && "pr-12",
                      prefixIcon && "pl-11",
                      className
                    )}
                    {...field}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    disabled={disabled || loading}
                    accept={accept}
                    onChange={field.onChange}
                    aria-invalid={errors[name] ? "true" : "false"}
                    ref={ref}
                  />
                  {setShowPassword && (
                    <PasswordEyeReverse
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  )}
                </div>
              ) : mask ? (
                <InputMask
                  {...field}
                  className={cn(
                    "border-input focus-visible:ring-ring aria-[invalid=true]:ring-destructive h-12 w-full rounded-md border bg-transparent px-3 font-sans text-base placeholder:text-neutral-400 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:ring-1",
                    className
                  )}
                  mask={mask}
                  replacement={maskReplacement}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  disabled={disabled || loading}
                  ref={ref}
                />
              ) : type === "number" ? (
                <div className={prefixIcon || suffix ? "relative" : ""}>
                  {prefixIcon && (
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
                      {prefixIcon}
                    </div>
                  )}

                  <Input
                    className={cn(
                      "border-input focus-visible:ring-ring h-10 w-full rounded-[8px] border bg-transparent px-4 text-base placeholder:text-neutral-400 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
                      prefixIcon && "pl-11",
                      className
                    )}
                    {...field}
                    onChange={(e) => {
                      modifyFormNumberInput(e, setValue, name);
                      // Call the original field onChange to trigger validation
                      field.onChange(e.target.value);
                    }}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    disabled={disabled || loading}
                    accept={accept}
                    maxLength={max}
                    readOnly={readOnly}
                    aria-invalid={errors[name] ? "true" : "false"}
                    ref={ref}
                  />
                  {suffix && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500">
                      {suffix}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  {prefixIcon && (
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
                      {prefixIcon}
                    </div>
                  )}
                  <Input
                    className={cn(
                      "border-input focus-visible:ring-ring h-10 w-full rounded-[8px] border bg-transparent px-4 text-base placeholder:text-neutral-400 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
                      prefixIcon && "pl-11",
                      className
                    )}
                    {...field}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    disabled={disabled || loading}
                    onChange={(e) => {
                      if (shouldFormatPhoneNumber) {
                        modifyPhoneNumberInput(e, setValue, name);
                        return;
                      }

                      if (isUpperCase) {
                        return setValue(name, e.target.value.toUpperCase());
                      }
                      return setValue(name, e.target.value);
                    }}
                    accept={accept}
                    maxLength={shouldFormatPhoneNumber ? 12 : max}
                    inputMode={shouldFormatPhoneNumber ? "numeric" : undefined}
                    readOnly={readOnly}
                    aria-invalid={errors[name] ? "true" : "false"}
                    ref={ref}
                  />
                  {suffix && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500">
                      {suffix}
                    </div>
                  )}
                </div>
              )}
            </FormControl>

            {helperText && (
              <FormDescription className="text-sm text-neutral-500">
                {helperText}
              </FormDescription>
            )}

            {!hideMessage && (
              <>
                {forgetPassButton ? (
                  <div className="flex items-center justify-between">
                    <FormMessage className="mt-0! block flex-1" />
                    <span className="mt-2.5 ml-auto block md:mt-0">
                      {forgetPassButton}
                    </span>
                  </div>
                ) : errorMessageWidth ? (
                  <div className={cn("", errorMessageWidth)}>
                    <FormMessage />
                  </div>
                ) : (
                  <FormMessage />
                )}
              </>
            )}
          </FormItem>
        )}
      />
    );
  }
);

BSInput.displayName = "BSInput";

export default BSInput;
