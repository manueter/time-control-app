import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { refreshToken } from "../utils/apiService";

interface UsePostResult<T = any> {
  isLoading: boolean;
  error: Error | null;
  postData: (payload: Record<string, unknown>) => Promise<T | null>;
}

export const usePost = <T = any>(url: string, requiresAuth: boolean = false): UsePostResult<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { user, setUser } = useAuth();

  const postData = useCallback(async (payload: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);
  
    const buildHeaders = (): Record<string, string> => {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (requiresAuth && user?.token) {
        headers["Authorization"] = `Bearer ${user.token}`;
      }
      return headers;
    };
  
    const handleTokenRefresh = async (): Promise<string | null> => {
      const newToken = await refreshToken(user?.token ?? "");
      if (!newToken) throw new Error("Failed to refresh token. Please log in again.");
      if (!user?.user_uuid) throw new Error("Failed to update user: Missing user_uuid.");
  
      setUser({ ...user, token: newToken });
      return newToken;
    };
  
    const makeRequest = async (headers: Record<string, string>, token?: string): Promise<Response> => {

      const updatedHeaders = token ? { ...headers, Authorization: `Bearer ${token}` } : headers;

      return await fetch(url, {
        method: "POST",
        headers: updatedHeaders,
        body: JSON.stringify(payload),
      });
    };
  
    try {
      const headers = buildHeaders();
      let response = await makeRequest(headers);
     
      if (requiresAuth && response.status === 401) {
        const newToken = await handleTokenRefresh();
        if(newToken){
          response = await makeRequest(headers, newToken);
        }
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }
      return await response.json(); 
    } 
    catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [url, requiresAuth, user, setUser]);
  

  return { isLoading, error, postData };
};
