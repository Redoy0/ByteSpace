import { toast } from "sonner";
import { envConfig } from "@/config/envConfig";

/**
 * While the app runs on mock data there's no backend to sign in against, so
 * the auth forms validate, show a short submit, and say it's a demo instead.
 * Set NEXT_PUBLIC_USE_MOCK_API=false to use the real auth endpoints.
 */
export const isAuthDemo = envConfig.useMockApi;

export const runDemoAuth = async (action: "Sign-in" | "Sign-up") => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  toast.info("Demo mode", {
    description: `${action} isn't connected to a server yet, so nothing was sent.`,
  });
};
