/**
 * Decodes a JWT payload without external libraries.
 * Safely handles both browser and Edge/Node runtime environments.
 */
export function decodeJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) =>
          ("%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).toUpperCase()
        )
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/** True when a JWT `exp` claim (seconds since epoch) is in the past or missing. */
export const isJwtExpired = (exp: unknown): boolean =>
  typeof exp !== "number" || exp < Math.floor(Date.now() / 1000);
