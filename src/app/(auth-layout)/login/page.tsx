import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/shared/auth/AuthShell";
import { authLinkClass } from "@/components/shared/auth/authFieldStyles";
import { SocialAuthButtons } from "@/components/shared/auth/SocialAuthButtons";
import { AUTH_ROUTES } from "@/constant/routes";
import { LoginForm } from "./components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to ByteSpace to pick up your courses where you left off, or manage the courses you create.",
};

export default function LoginPage() {
  return (
    <AuthShell
      intro={{
        title: "Sign in with ease",
        description:
          "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.",
      }}
      eyebrow="Sign In"
      heading="Welcome Back"
      footer={
        <>
          New user?{" "}
          <Link href={AUTH_ROUTES.register} className={authLinkClass}>
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
      <SocialAuthButtons />
    </AuthShell>
  );
}
