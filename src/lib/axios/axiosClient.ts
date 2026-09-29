/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@/lib/tokenManager";
import { refreshAccessToken } from "@/services/auth/tokenRefreshService";
import { AUTH_ROUTES } from "@/constant/routes";

const axiosClient = axios.create({
  baseURL: process.env.BACKEND_BASE_URL_DOMAIN,
  timeout: 20000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Prevent multiple concurrent refresh calls
let isRefreshingToken = false;
let failedQueue: Array<{
  // eslint-disable-next-line no-unused-vars
  resolve: (token: string | null) => void;
  // eslint-disable-next-line no-unused-vars
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ── Redirect helper ──────────────────────────────────────────────────────────

// ByteSpace uses a single sign-in page for every role.
const getLoginRedirectUrl = (): string => AUTH_ROUTES.login;

// ── Request interceptor — attach access token ────────────────────────────────

axiosClient.interceptors.request.use(
  async (config) => {
    let token: string | undefined;

    if (typeof window !== "undefined") {
      token = getAccessToken();
    } else {
      const { getServerAccessToken } =
        await import("@/services/auth/getServerToken");
      token = await getServerAccessToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — handle 401 with token refresh ────────────────────

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      originalRequest
    ) {
      // Already retried once — give up and redirect to login
      if (originalRequest._retry) {
        const { clearAllTokens } = await import("@/lib/tokenManager");
        clearAllTokens();
        window.location.href = getLoginRedirectUrl();
        return Promise.reject(error);
      }

      // Another refresh is already in-flight — queue this request
      if (isRefreshingToken) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            if (originalRequest.headers && newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshingToken = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          processQueue(null, newAccessToken);
          return axiosClient(originalRequest);
        }

        // Refresh failed
        processQueue(new Error("Token refresh failed"), null);
        const { clearAllTokens } = await import("@/lib/tokenManager");
        clearAllTokens();
        window.location.href = getLoginRedirectUrl();
        return Promise.reject(error);
      } catch (refreshError) {
        processQueue(refreshError, null);
        const { clearAllTokens } = await import("@/lib/tokenManager");
        clearAllTokens();
        window.location.href = getLoginRedirectUrl();
        return Promise.reject(refreshError);
      } finally {
        isRefreshingToken = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
