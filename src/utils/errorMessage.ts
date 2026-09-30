type ErrorLike = {
  message?: unknown;
  data?: { message?: unknown };
  response?: { data?: { message?: unknown } };
};

const FALLBACK = "Something went wrong";

export const getErrorMessage = (error: unknown): string => {
  if (!error) return FALLBACK;

  // Axios-style error
  const err = error as ErrorLike;
  const message =
    err?.response?.data?.message || err?.message || err?.data?.message;

  if (!message) return FALLBACK;
  if (typeof message === "string") return message;

  // object case (e.g. { message: "..."} or nested)
  if (typeof message === "object") {
    const nested = message as { message?: unknown; error?: unknown };
    const inner = nested.message || nested.error;
    return typeof inner === "string" ? inner : JSON.stringify(message);
  }

  return FALLBACK;
};
