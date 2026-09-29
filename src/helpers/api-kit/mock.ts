/**
 * Helpers for serving temporary mock data through APIKit while
 * envConfig.useMockApi is enabled. Responses mirror the backend envelope.
 */

const MOCK_LATENCY_MS = 250;

export const mockResponse = async <T>(
  data: T,
  message = "OK"
): Promise<{ success: true; message: string; data: T }> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
  return { success: true, message, data };
};
