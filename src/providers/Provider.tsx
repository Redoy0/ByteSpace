import ReactQueryProvider from "./QueryProvider";
import { SearchParamsProvider } from "./SearchParamsProvider";
import { UserProvider } from "./UserProvider";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { decodeJWT, isJwtExpired } from "@/utils/decodeJWT";
import { ACCESS_TOKEN_COOKIE } from "@/constant/routes";
import { Toaster } from "@/components/ui/sonner";

interface ProviderProps {
  children: Readonly<React.ReactNode>;
}

// Server Component — reads the cookie and decodes the JWT without a network
// round-trip so the client receives the initial user before first paint.
export default async function Provider({ children }: ProviderProps) {
  let initialUser: Record<string, unknown> | null = null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

    if (token) {
      const decoded = decodeJWT(token);
      // Discard expired tokens so the client doesn't start with stale auth
      if (decoded && !isJwtExpired(decoded.exp)) {
        initialUser = decoded;
      }
    }
  } catch {
    // Non-fatal — fall back to client-side auth check
  }

  return (
    <ReactQueryProvider initialUser={initialUser}>
      <UserProvider>
        <Suspense fallback={null}>
          <SearchParamsProvider>{children}</SearchParamsProvider>
        </Suspense>
      </UserProvider>
      <Toaster position="top-center" richColors />
    </ReactQueryProvider>
  );
}
