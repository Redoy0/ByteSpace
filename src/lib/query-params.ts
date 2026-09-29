/**
 * Normalizes query parameters by removing empty, null, and undefined values
 * @param params - Object containing query parameters
 * @returns Cleaned object with only non-empty values
 */
export const normalizeQueryParams = (
  params: Record<string, unknown>
): Record<string, unknown> => {
  return Object.entries(params).reduce(
    (acc, [key, value]) => {
      // Skip if value is null, undefined, or empty string
      if (value === null || value === undefined || value === "") {
        return acc;
      }
      acc[key] = value;
      return acc;
    },
    {} as Record<string, unknown>
  );
};
