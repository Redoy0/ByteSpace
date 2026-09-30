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
import { registerRequest } from "@/lib/auth/loginRequest";
import { getPostAuthRedirect } from "@/lib/auth/postAuthRedirect";
import { registerSchema, type RegisterFormValues } from "@/lib/zod/authSchema";
import { parseUser, useUser } from "@/providers/UserProvider";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setFormError(null);

    // The register route signs the new account in (same cookies as login)
    const res = await registerRequest(values);
    if (!res.success) {
      setFormError(res.message);
      setIsSubmitting(false);
      return;
    }

    const user = parseUser(res.data);
    setUser(user);
    toast.success(res.message);
    router.replace(getPostAuthRedirect(user, searchParams.get("redirect")));
  };

  return (
    <FormWrapper<RegisterFormValues>
      onSubmit={onSubmit}
      resolver={zodResolver(registerSchema)}
      defaultValues={{ name: "", email: "", password: "" }}
      className="mt-[41px] space-y-6"
    >
      <BSInput
        name="name"
        label="Full Name"
        placeholder="Jamie Davis"
        autoComplete="name"
        labelClassName={authLabelClass}
        className={authInputClass}
      />
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
        autoComplete="new-password"
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
          loadingText="Creating account…"
          className={authSubmitClass}
        >
          Continue
        </Button>
      </div>
    </FormWrapper>
  );
}
