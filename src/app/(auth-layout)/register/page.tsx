import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/shared/auth/AuthShell";
import { authLinkClass } from "@/components/shared/auth/authFieldStyles";
import { AUTH_ROUTES } from "@/constant/routes";
import { RegisterForm } from "./components/RegisterForm";

export const metadata: Metadata = {
  title: "Create an Account",
  description:
    "Join ByteSpace for free to start learning new skills, or to publish courses of your own.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      intro={{
        title: "Sign up and come in",
        description:
          "The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost",
      }}
      eyebrow="Create an Account"
      heading="Welcome to ByteSpace"
      footer={
        <>
          Already have an account?{" "}
          <Link href={AUTH_ROUTES.login} className={authLinkClass}>
            Login
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
