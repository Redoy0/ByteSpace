/**
 * make sure every NEXT_PUBLIC_ env is define in Dockerfile
 */

const getBackendBaseUrl = () => {
  if (process.env.BACKEND_BASE_URL_DOMAIN) {
    return process.env.BACKEND_BASE_URL_DOMAIN;
  }
  // if (process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DOMAIN) {
  //   return process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DOMAIN;
  // }
  // For Vercel SSR
  return "http://localhost:3000/api";
};

const isTruthyEnv = (value?: string) => {
  if (!value) return false;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
};

const getPositiveIntEnv = (value?: string, fallback = 0) => {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) return fallback;
  return parsed;
};

export const getAppBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  return "http://localhost:3000";
};

export const envConfig = {
  backendBaseUrl: getBackendBaseUrl(),
  appBaseUrl: getAppBaseUrl(),
  maintenanceMode: isTruthyEnv(
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE ?? process.env.MAINTENANCE_MODE
  ),
  maintenanceCountdownSeconds: getPositiveIntEnv(
    process.env.NEXT_PUBLIC_MAINTENANCE_COUNTDOWN_SECONDS ??
      process.env.MAINTENANCE_COUNTDOWN_SECONDS,
    900
  ),

  /**
   * Serve temporary mock data from APIKit instead of calling the backend.
   * Set NEXT_PUBLIC_USE_MOCK_API=false once the ByteSpace API is available.
   */
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_API !== "false",

  mode: process.env.NODE_ENV === "development",
  isDevlopment: process.env.NODE_ENV === "development",
};
