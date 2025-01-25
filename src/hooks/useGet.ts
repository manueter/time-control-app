import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { refreshToken } from "../utils/apiService";

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

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> =
        requiresAuth && user?.token
          ? { Authorization: `Bearer ${user.token}` }
          : {};

      const response = await fetch(url, { method: "GET", headers });

      if (requiresAuth && response.status === 401) {
        // Handle token expiration
        const newToken = await refreshToken(user?.token ?? "");
        if (newToken) {
          //if user
          if (user?.user_uuid) {
            setUser({ ...user, token: newToken });
            const retryResponse = await fetch(url, {
              method: "GET",
              headers: { Authorization: `Bearer ${newToken}` },
            });

            if (!retryResponse.ok)
              throw new Error(`Retry failed: ${retryResponse.statusText}`);
            setData(await retryResponse.json());
          } else {
            throw new Error("Failed to refresh token. Please log in again.");
          }
        } else {
          throw new Error(`Failed to update user: Missing user_uuid.`);
        }
      } else if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      } else {
        setData(await response.json());
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [url, requiresAuth, user, setUser]);

  return { data, isLoading, error, fetchData };
};
