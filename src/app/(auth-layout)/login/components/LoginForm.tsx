"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import BSInput from "@/components/form/BSInput";
import FormError from "@/components/form/FormError";
import FormWrapper from "@/components/form/FormWrapper";
import {
  authInputClass,
  authLabelClass,
  authSubmitClass,
} from "@/components/shared/auth/authFieldStyles";
import { Button } from "@/components/ui/button";
import { loginRequest } from "@/lib/auth/loginRequest";
import { getPostAuthRedirect } from "@/lib/auth/postAuthRedirect";
import { loginSchema, type LoginFormValues } from "@/lib/zod/authSchema";
import { parseUser, useUser } from "@/providers/UserProvider";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setFormError(null);

    const res = await loginRequest(values);
    if (!res.success) {
      setFormError(res.message);
      setIsSubmitting(false);
      return;
    }

    // Stay in the submitting state until the next page takes over
    const user = parseUser(res.data);
    setUser(user);
    toast.success(res.message);
    router.replace(getPostAuthRedirect(user, searchParams.get("redirect")));
  };

  return (
    <FormWrapper<LoginFormValues>
      onSubmit={onSubmit}
      resolver={zodResolver(loginSchema)}
      defaultValues={{ email: "", password: "" }}
      className="mt-[41px] space-y-6"
    >
      <BSInput
        name="email"
        type="email"
        label="Email"
        placeholder="designer@example.com"
        autoComplete="email"
        labelClassName={authLabelClass}
        className={authInputClass}
      />
      <BSInput
        name="password"
        type="password"
        label="Password"
        placeholder="********"
        autoComplete="current-password"
        labelClassName={authLabelClass}
        className={authInputClass}
      />

      {formError && <FormError>{formError}</FormError>}

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="lime"
          size="pill"
          loading={isSubmitting}
          loadingText="Signing in…"
          className={authSubmitClass}
        >
          Sign In
        </Button>
      </div>
    </FormWrapper>
  );
}
