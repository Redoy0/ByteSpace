import { PUBLIC_ROUTES, ROLE_HOME } from "@/constant/routes";
import type { User } from "@/types/user";

/**
 * Where to send the user after signing in or registering: the `?redirect=`
 * target set by proxy.ts (same-site paths only, so it can't be used as an
 * open redirect), otherwise their role's home — the same place proxy.ts sends
 * signed-in users who open /login.
 */
export const getPostAuthRedirect = (
  user: User | null,
  redirect: string | null
) => {
  if (redirect && /^\/(?![/\\])/.test(redirect)) return redirect;
  return user ? ROLE_HOME[user.role] : PUBLIC_ROUTES.home;
};
