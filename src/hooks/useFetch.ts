import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { refreshToken } from "../utils/apiService";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
}

export const useFetch = <T>(url: string, options?: RequestInit,  requiresAuth: boolean = false): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { user, setUser } = useAuth();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchOptions = {
        ...options,
        headers: {
          ...options?.headers,
          ...(requiresAuth && user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
      };

      const response = await fetch(url, fetchOptions);
      if (requiresAuth && response.status === 401) {
        // Handle token expiration for authenticated requests
        const newToken = await refreshToken(user?.token || "");
        if (newToken) {
          if (user?.user_uuid) {
            setUser({ ...user, token: newToken });
          } else {
            console.error("Failed to update user: Missing user_uuid.");
          }
          // Retry the fetch with the new token
          const retryResponse = await fetch(url, {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${newToken}`,
            },
          });

          if (!retryResponse.ok) {
            throw new Error(`Retry failed: ${retryResponse.statusText}`);
          }

          const retryData: T = await retryResponse.json();
          setData(retryData);
        } else {
          throw new Error("Failed to refresh token. Please log in again.");
        }
      } else if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      } else {
        const result: T = await response.json();
        setData(result);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [url, options, requiresAuth, user, setUser]);

  return { data, isLoading, error, fetchData };
};
