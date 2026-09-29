import axiosClient from "@/lib/axios/axiosClient";

/**
 * Backend auth endpoints.
 * TODO: confirm these paths against the ByteSpace backend contract.
 */
const AUTH_ENDPOINTS = {
  login: "/auth/login",
  register: "/auth/register",
  refreshToken: "/auth/refresh-token",
  logout: "/auth/logout",
} as const;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

/**
 * Auth API methods used by Next.js API route handlers (server-side).
 * axiosClient baseURL → backend. withCredentials: true is set on the
 * shared instance so HttpOnly cookies are forwarded automatically.
 */
const authApi = {
  /**
   * Login for every role (student / creator / admin).
   * The backend returns { token, user } in the body AND sets the HttpOnly
   * refresh token cookie via Set-Cookie. The route handler pipes that
   * Set-Cookie header back to the browser.
   */
  login: (payload: LoginPayload) =>
    axiosClient.post(AUTH_ENDPOINTS.login, payload),

  /** Register a new account. Same response contract as login. */
  register: (payload: RegisterPayload) =>
    axiosClient.post(AUTH_ENDPOINTS.register, payload),

  /**
   * Refresh the access token.
   * cookieHeader must be passed from the Next.js route handler — Node.js
   * Axios does NOT attach cookies automatically (withCredentials only works
   * in browsers).
   */
  refreshToken: (cookieHeader: string) =>
    axiosClient.post(
      AUTH_ENDPOINTS.refreshToken,
      {}, // empty body — refresh token is in the cookie
      { headers: { Cookie: cookieHeader } }
    ),

  /**
   * Logout — tells the backend to clear the HttpOnly refresh token cookie.
   * cookieHeader is forwarded from the route handler.
   */
  logout: (cookieHeader: string) =>
    axiosClient.post(
      AUTH_ENDPOINTS.logout,
      {},
      { headers: { Cookie: cookieHeader } }
    ),
};

export default authApi;
