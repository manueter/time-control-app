import { useState, useCallback } from "react";
import { supabase } from "../utils/supabase";

interface UsePostResult<T = any> {
  isLoading: boolean;
  error: Error | null;
  postData: (payload: Record<string, unknown>) => Promise<T | null>;
}

export const usePost = <T = any>(url: string): UsePostResult<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postData = useCallback(async (payload: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: postError } = await supabase
        .from(url) // Use the table name here
        .insert([payload]);

      if (postError) {
        throw new Error(postError.message);
      }

      return data; // Adjust based on your needs
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { isLoading, error, postData };
};
