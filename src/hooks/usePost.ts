import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { refreshToken } from "../utils/apiService";

interface UsePostResult {
  isLoading: boolean;
  error: Error | null;
  postData: (payload: Record<string, unknown>) => Promise<void>;
}

export const usePost = (url: string, requiresAuth: boolean = false): UsePostResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { user, setUser } = useAuth();

  const postData = useCallback(async (payload: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(requiresAuth && user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
      };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (requiresAuth && response.status === 401) {
        // Handle token expiration
        const newToken = await refreshToken(user?.token || "");
        if (newToken) {
          if(user?.user_uuid){

            setUser({ ...user, token: newToken });
            const retryResponse = await fetch(url, {
              method: "POST",
              headers: { ...headers, Authorization: `Bearer ${newToken}` },
              body: JSON.stringify(payload),
            });
  
            if (!retryResponse.ok) throw new Error(`Retry failed: ${retryResponse.statusText}`);
          }else{

            throw new Error(`Failed to update user: Missing user_uuid.`);
          }
          
        } else {
          throw new Error("Failed to refresh token. Please log in again.");
        }
      } else if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [url, requiresAuth, user, setUser]);

  return { isLoading, error, postData };
};
