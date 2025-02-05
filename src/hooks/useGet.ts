import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { refreshToken } from "../services/apiService";

interface UseGetResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
}

export const useGet = <T>(
  url: string,
  requiresAuth: boolean = false
): UseGetResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { user, setUser } = useAuth();

  // Helper to build headers
  const buildHeaders = (token?: string): Record<string, string> => {
    const headers: Record<string, string> = {};
    if (requiresAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  // Helper to make fetch requests
  const makeRequest = async (headers: Record<string, string>): Promise<Response> => {
    return await fetch(url, { method: "GET", headers });
  };

  // Handle token refresh
  const handleTokenRefresh = async (): Promise<string | null> => {
    const newToken = await refreshToken(user?.token ?? "");
    if (!newToken) throw new Error("Failed to refresh token. Please log in again.");
    if (!user?.user_uuid) throw new Error("Failed to update user: Missing user_uuid.");

    setUser({ ...user, token: newToken });
    return newToken;
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = buildHeaders(user?.token);
      let response = await makeRequest(headers);

      if (requiresAuth && response.status === 401) {
        const newToken = await handleTokenRefresh();
        if (newToken) {
          response = await makeRequest(buildHeaders(newToken));
        }
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [url, requiresAuth, user, setUser]);

  return { data, isLoading, error, fetchData };
};
