/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

"use client";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import {
  FieldValues,
  Resolver,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";

interface FormWrapperProps<TFieldValues extends FieldValues = FieldValues> {
  onSubmit: SubmitHandler<TFieldValues>;
  children: React.ReactNode;
  defaultValues?: UseFormProps<TFieldValues>["defaultValues"];
  resolver?: Resolver<TFieldValues>;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLFormElement>) => void;
  resetFields?: string[];
  methods?: any;
}

const FormWrapper = <TFieldValues extends FieldValues = FieldValues>({
  children,
  resolver,
  defaultValues,
  className,
  onSubmit,
  onKeyDown,
  resetFields = [],
  methods,
}: FormWrapperProps<TFieldValues>) => {
  const formConfig: UseFormProps<TFieldValues> = {
    defaultValues,
    resolver,
  };

  const internalForm = useForm<TFieldValues>(formConfig);
  const form = methods ? methods : internalForm;

  const submit: SubmitHandler<TFieldValues> = async (data) => {
    onSubmit(data);

    if (resetFields?.length > 0) {
      resetFields?.forEach((field) => {
        form.setValue(field, "");
      });
    }
  };

  // form error get
  // const formError = form.formState.errors;
  // console.log(formError);

  return (
    <Form {...form}>
      <form
        className={cn("w-full space-y-4", className)}
        onSubmit={form.handleSubmit(submit)}
        onKeyDown={onKeyDown}
      >
        {children}
      </form>
    </Form>
  );
};

export default FormWrapper;
